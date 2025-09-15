const searchContactService = (function () {
    // --- PRIVATE: render select sau khi có dữ liệu ---
    function renderSelect($select, optionsHtml) {
        $select.empty().append(optionsHtml);

        // Khởi tạo lại select2 (tránh double-init)
        if ($select.data('select2')) {
            $select.select2('destroy');
        }
        $select.select2({
            placeholder: "Select an option",
            closeOnSelect: false   // ⛔ luôn giữ dropdown mở sau khi chọn
        });
    }
    var addForm = function(parentDom) {
        parentDom.find(".search_contact").each(function () {
            var self = $(this);
            // tạo id random cho select và modal
            var ajax_search_id = Math.random().toString(36).substring(2);
            self.addClass('select-' + ajax_search_id);
            

            // lấy input values trong div
            var valuesOption = self.find('option:selected').map(function() {
                return $(this).val();
            }).get();
            
            if (valuesOption.length > 0) {
                $.ajax({
                    url: window.API_SERVICE_URL_V2 + "/crm/contacts",
                    headers: {
                        "Authorization": "Bearer " + getCookie("imap_authen_access_token")
                    },
                    dataType: "json",
                    type: 'GET',
                    data: { 'filter[_id]': valuesOption },
                    success: function (res) {
                        var htmlOption = '<option value="">Select an option</option>';
                        if (res.length > 0) {
                            htmlOption = '';
                            res.forEach(function(item) {
                                htmlOption += `<option value="${item._id}" selected>
                                    ${item._id} - ${item.fullname ?? ''} - ${item.phone ?? ''} - ${item.email ?? ''}
                                </option>`;
                            });
                        }
                        renderSelect($('.select-' + ajax_search_id), htmlOption);
                    },
                    error: function (xhr) {
                        console.error(xhr.responseText);
                    }
                });
            } else {
                var selectOptionHtml = '<option value="">Select an option</option>';
                self.append(selectOptionHtml);
            }
            // hàm render select + modal
            var html = '<button type="button" class="btn btn-teal call_ajax_search" data-toggle="modal" data-target="#'+ajax_search_id+'">Search <i class="icon-search4"></i></button>';
            self.parent().append(html);

            var htmlModal = `<div id="${ajax_search_id}" class="modal fade" tabindex="-1" style="display: none;" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    
                        <div class="modal-header">
                            <h5 class="modal-title">Lọc dữ liệu</h5>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card-body">
                                    <ul class="nav nav-tabs row">
                                        <li style="padding: 0px" class="nav-item"><a href="#tab1-${ajax_search_id}" class="nav-link active" data-toggle="tab">Theo email/số điện thoại <span style="color: red">*</span></a></li>
                                        <li style="padding: 0px" class="nav-item"><a href="#tab2-${ajax_search_id}" class="nav-link" data-toggle="tab">Theo tên và ngày sinh <span style="color: red">*</span></a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div id="tab1-${ajax_search_id}" class="tab-pane fade show active">
                                            <div class="row">
                                                <div class="col-sm-12 col-xs-12">
                                                    <div class="x_panel">
                                                        <div class="form-group">
                                                            <div style="padding: 0px">
                                                                <input type="text" name="filter[emailphone]" placeholder="Nhập email hoặc số điện thoại" class="form-control tab1-input" value="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab2-${ajax_search_id}" class="tab-pane fade show">
                                            <div class="row">
                                                <div class="col-sm-12 col-xs-12">
                                                    <div class="x_panel row">
                                                        <div class="form-group col-lg-6">
                                                            <input type="text" name="filter[fullname][like]" placeholder="Nhập tên" class="form-control tab2-input" value="">
                                                            <small style="color:red">Ví dụ : minh</small>
                                                        </div>
                                                        <div class="form-group col-lg-6">
                                                            <input type="text" name="filter[birthdate]" placeholder="Ngày sinh" class="form-control datepicker tab2-input" value="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success btnModalSearch" data-modal-id="${ajax_search_id}"><i class="icon-search4"></i> Search</button>
                        </div>
                    
                    </div>
                </div>
            </div>`;
            $('body').append(htmlModal);
            $('#'+ajax_search_id).trigger( "MainContentReloaded", [] );
            $(document).off('hidden.bs.modal', '#' + ajax_search_id).on('hidden.bs.modal', '#' + ajax_search_id, function () {
                document.activeElement.blur();   // clear focus
                $('body').focus();               // trả focus về body
            });
        });
    };
    function bindModalSearch() {
        $(document).off('click.searchContact', '.btnModalSearch').on('click.searchContact', '.btnModalSearch', function () {
            var modalId = $(this).data('modal-id');     // lấy id modal hiện tại
            var $modal = $('#' + modalId);   
            var $select = $('.select-' + modalId);           // modal cụ thể
            
            var $activeTab = $modal.find('.tab-pane.active');
            var isMultiple = $select.prop('multiple');
            var data = { limit: 50 };
            var isValid = true;

            $activeTab.find('input').each(function () {
                var name = $(this).attr('name');
                var value = $(this).val().trim();
                if (!value) {
                    isValid = false;
                }
                if (name) {
                    data[name] = value;
                }
                
            });

            if (!isValid) {
                show_notify_error({
                    error_description: 'Bạn cần nhập đủ thông tin trước',
                    error: 'Cần nhập đủ thông tin'
                });
                $modal.modal('show');
                return;
            }
            if (isMultiple) {
                var selectedText = $select.find('option:selected').map(function() {
                    return { value: this.value, text: $(this).text() };
                }).get(); // mảng object {value, text}

                // Xóa toàn bộ option
                $select.empty();

                // Thêm lại các option đã chọn
                selectedText.forEach(function(opt) {
                    $select.append(`<option value="${opt.value}" selected>${opt.text}</option>`);
                });
            } else {
                $select.empty();
            }

            // Nếu hợp lệ thì gọi Ajax
            $.ajax({
                url:  window.API_SERVICE_URL_V2 + "/crm/contacts",
                headers: {
                    "Authorization": "Bearer " + getCookie("imap_authen_access_token")
                },
                dataType: "json",
                type: 'GET',
                data: data,
                success: function (res) {
                    var html = '';
                    var countRes = res.length;
                    if (countRes <= 0) {
                        show_notify_error({
                            error_description: 'Không tìm thấy thông tin',
                            error: 'Không tìm thấy thông tin'
                        });
                    }
                    res.forEach(function(item) {
                        if ($select.find('option[value="' + item._id + '"]').length === 0) {
                            var selected = '';
                            if (countRes == 1) {
                                selected = 'selected';
                            } 
                            html += `<option value="${item._id}" ${selected}>
                                ${item._id} - ${item.fullname ?? ''} - ${item.phone ?? ''} - ${item.email ?? ''}
                            </option>`;
                        }
                    });
                    $select.append(html);
                    if (countRes > 1) {
                        $select.select2('open');
                    }
                    $modal.modal('hide');
                },
                error: function (xhr) {
                    console.error(xhr.responseText);
                }
            });
        });
    };
    return {
        init: function (parentDom) {
            addForm(parentDom);
        },
        bind: function () {
            bindModalSearch();
        }
    };

})();

// Khi load trang lần đầu
$(document).on("DOMContentLoaded", function () {
    searchContactService.bind();              // bind event 1 lần
    searchContactService.init($(document));   // init cho toàn bộ DOM
});

// Khi reload content động (AJAX load)
$(document).on("MainContentReloaded", function (e) {
    searchContactService.init($(e.target));   // chỉ init phần DOM mới
});