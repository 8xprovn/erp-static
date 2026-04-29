const searchClassService = (function () {
    // --- PRIVATE: render select sau khi có dữ liệu ---
    function forceOpenModalClass() {
        $(document)
            .off('click.forceModal', '.call_ajax_search') // clear event cũ
            .on('click.forceModal', '.call_ajax_search', function (e) {
                var modalId = $(this).attr('data-target'); // luôn lấy attr
                if (modalId) {
                    var $modal = $(modalId);

                    // chỉ mở nếu chưa mở
                    if (!$modal.hasClass('show')) {
                        // Xoá aria-hidden nếu có
                        $modal.removeAttr('aria-hidden');

                        // Ép mở modal
                        $modal.modal('show');
                    }
                }
            });
    }
    function renderSelectClass($select, optionsHtml) {
        $select.empty().append(optionsHtml);

        // Khởi tạo lại select2 (tránh double-init)
        if ($select.data('select2')) {
            $select.select2('destroy');
        }
        $select.select2({
            placeholder: "Nhấn vào biểu tượng 🔍 ở phía bên phải để tìm kiếm",
            closeOnSelect: false   // ⛔ luôn giữ dropdown mở sau khi chọn
        });
    }
    var addFormClass = function(parentDom) {
        parentDom.find(".search_class").each(function () {
            var self = $(this);
            var isDisable = self.prop('disabled');
            var classDnone = '';
            var styleDisable = ''
            if (isDisable) {
                classDnone = 'd-none';
                styleDisable = 'disabled'
            }
            // tạo id random cho select và modal
            var ajax_search_id = Math.random().toString(36).substring(2);
            self.addClass('select-class-' + ajax_search_id);
            

            // lấy input values trong div
            var valuesOption = self.find('option:selected').map(function() {
                return $(this).val();
            }).get();
            
            if (valuesOption.length > 0) {
                $.ajax({
                    url: window.API_SERVICE_URL_V2 + "/lms/classes",
                    headers: {
                        "Authorization": "Bearer " + getCookie("imap_authen_access_token")
                    },
                    dataType: "json",
                    type: 'GET',
                    data: { 'filter[_id]': valuesOption },
                    success: function (res) {
                        var htmlOption = '<option value="">Nhấn vào biểu tượng 🔍 ở phía bên phải để tìm kiếm</option>';
                        if (res.length > 0) {
                            htmlOption = '';
                            res.forEach(function(item) {
                                htmlOption += `<option value="${item._id}" selected>
                                    ${item.name ?? ''}
                                </option>`;
                            });
                        }
                        renderSelectClass($('.select-class-' + ajax_search_id), htmlOption);
                    },
                    error: function (xhr) {
                        console.error(xhr.responseText);
                    }
                });
            } else {
                var selectOptionHtml = '<option value="">Nhấn vào biểu tượng 🔍 ở phía bên phải để tìm kiếm</option>';
                self.append(selectOptionHtml);
            }
            var htmlContent = self.prop("outerHTML");
            // hàm render select + modal
            
            var html = '<div class="d-flex">\
                '+htmlContent+'\
                <button type="button" class="btn btn-teal call_ajax_search '+classDnone+'" '+styleDisable+' data-toggle="modal" data-target="#'+ajax_search_id+'">\
                <i class="icon-search4"></i></button></div>';
            self.replaceWith(html);

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
                                        <li style="padding: 0px" class="nav-item"><a href="#tab1-${ajax_search_id}" class="nav-link active" data-toggle="tab">Theo mã lớp <span style="color: red">*</span></a></li>
                                        <li style="padding: 0px" class="nav-item"><a href="#tab2-${ajax_search_id}" class="nav-link" data-toggle="tab">Theo cơ sở và thời gian <span style="color: red">*</span></a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div id="tab1-${ajax_search_id}" class="tab-pane fade show active">
                                            <div class="row">
                                                <div class="col-sm-12 col-xs-12">
                                                    <div class="x_panel">
                                                        <div class="form-group">
                                                            <div style="padding: 0px">
                                                                <input type="text" name="filter[_id]" placeholder="Nhập mã lớp" class="form-control tab1-input" value="">
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
                                                            <input type="text" name="filter[start_date][gte]" placeholder="Ngày khai giảng từ" class="form-control datepicker tab2-input" value="">
                                                        </div>
                                                        <div class="form-group col-lg-6">
                                                            <input type="text" name="filter[start_date][lte]" placeholder="Ngày khai giảng đến" class="form-control datepicker tab2-input" value="">
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
                            <button type="button" class="btn btn-success btnModalSearchClass" data-modal-id="${ajax_search_id}"><i class="icon-search4"></i> Search</button>
                        </div>
                    
                    </div>
                </div>
            </div>`;
            $('body').append(htmlModal);
            $('#tab1-'+ajax_search_id).trigger( "InitSearch", [] );
        });
    };
    function bindModalSearchClass() {
        $(document).off('click.searchClass', '.btnModalSearchClass').on('click.searchClass', '.btnModalSearchClass', function () {
            var modalId = $(this).data('modal-id');     // lấy id modal hiện tại
            var $modal = $('#' + modalId);   
            var $select = $('.select-class-' + modalId);           // modal cụ thể
            
            var $activeTab = $modal.find('.tab-pane.active');
            var isMultiple = $select.prop('multiple');
            var data = { limit: 50 };
            var isValid = true; 

            $activeTab.find('input, select').each(function () { 
                var name = $(this).attr('name'); 
                var value = $(this).val(); 
                if (Array.isArray(value)) { 
                    value = value; 
                } else {
                    value = (value || '').toString().trim(); 
                } 
                if ( name && ( value === '' || value === null || (Array.isArray(value) && value.length === 0) ) ) {
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
                return;
            }
            $.each($select[0].attributes, function(_, attr) {
                if (attr.name.startsWith('data-query-')) {
                    var key = attr.name.replace('data-query-', ''); // bỏ prefix
                    data['filter[' + key + ']'] = attr.value; // gán vào object data
                }
            });

            // Nếu hợp lệ thì gọi Ajax
            $.ajax({
                url:  window.API_SERVICE_URL_V2 + "/lms/classes",
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
                    res.forEach(function(item) {
                        if ($select.find('option[value="' + item._id + '"]').length === 0) {
                            var selected = '';
                            if (countRes == 1) {
                                selected = 'selected';
                            } 
                            html += `<option value="${item._id}" ${selected}>
                                ${item.name ?? ''}
                            </option>`;
                        }
                    });
                    $select.append(html);
                    if (countRes > 1) {
                        $select.select2('open');
                    }
                    $select.trigger('change');
                    $modal.modal('hide');
                },
                error: function (xhr) {
                    show_notify_error({
                        error_description: xhr.responseText,
                        error: 'Lỗi hệ thống'
                    });
                    return;
                }
            });
        });
    };
    return {
        init: function (parentDom) {
            addFormClass(parentDom);
        },
        bind: function () {
            bindModalSearchClass();
            forceOpenModalClass();
        },
    };

})();

// Khi load trang lần đầu
$(document).on("DOMContentLoaded", function (e) {
    searchClassService.bind();              // bind event 1 lần
    searchClassService.init($(e.target));   // init cho toàn bộ DOM
});

// Khi reload content động (AJAX load)
$(document).on("MainContentReloaded", function (e) {
    searchClassService.init($(e.target));   // chỉ init phần DOM mới
});