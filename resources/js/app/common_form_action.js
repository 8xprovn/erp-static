$(document).ready(function () {
    if ($(".ajax-submit-form").length) {
        $(".ajax-submit-form").on("keyup keypress", function (e) {
            if (e.keyCode == 13) {
                var src = e.srcElement || e.target;
                if (src.tagName.toLowerCase() != "textarea") {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            }
        });
    }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////// ADD & UPDATE ITEM ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////// DELETE ITEM LISTS ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // quick delete

    // $("#content_for_layout").on("click", ".delete-batch", function () {
    //     var arrId=[];
    //     var url = $(this).attr("data-url") || '';
    //     $("#checkbox_list").find('input[type="checkbox"]:checked').each(function () {
    //         arrId.push($(this).val());
    //     });
    //     helpers.deleteBatch(url,{"id":arrId},function(){
    //         location.reload();
    //     });
    // });
    // quick censorship
});
////// FIX LOI FIREFOX KO GO TEXT DC INPUT ///
$.fn.modal.Constructor.prototype.enforceFocus = function () {};
function popup_modal(url, data_redirect_uri) {
    var randomDom = Math.random().toString(36).substring(2);
    //var type = $(this).attr('data-type');
    //$("#ajax_call_id").modal('hide');
    var ajax_call_id = randomDom; //"ajax_call_id";
    html =
        '<div id="' +
        ajax_call_id +
        '" class="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">\
              <div class="modal-dialog modal-xl" style="width: 80%;">\
                <div class="modal-content">\
                    <div class="modal-body"></div>\
                </div>\
              </div>\
            </div>';
    $("body").append(html);
    //console.log(url);
    $.ajax({
        url: url,
        data: {
            view: "popup",
        },
        success: function (data) {
            $("#" + ajax_call_id)
                .find(".modal-body")
                .html(data);
            $("#" + ajax_call_id)
                .find(".x_title")
                .remove();
            $("#" + ajax_call_id)
                .find("form")
                .attr("data-redirect-uri", "popup_close");
            $("#" + ajax_call_id)
                .find("form")
                .attr("data-popup-id", ajax_call_id);
            //////////////////////
            $("#" + ajax_call_id).modal();
            $("#" + ajax_call_id).on("hidden.bs.modal", function (e) {
                $(this).remove();
            });
            $("#" + ajax_call_id).on("shown.bs.modal", function (e) {
                AutoloadDataService.init($("#" + ajax_call_id));
                if ($("#" + ajax_call_id).find(".format_price")) {
                    AutoNumeric.multiple(
                        '[id="' + ajax_call_id + '"] .format_price',
                        {
                            decimalPlaces: 0,
                            unformatOnSubmit: true,
                            watchExternalChanges: true,
                            wheelStep: 1000,
                            decimalPlacesRawValue: 0,
                        }
                    );
                }
            });
            return true;
        },
        error: function (e) {
            show_notify_error(e.responseText);
        },
    });
}
function loadTinyMce(domId) {
    var self = $("." + domId);
    tinymce.init({
        selector: "textarea." + domId,
        readonly: window.tinymce_readonly ? 1 : 0,
        //themes: "modern",
        //skin: "lightgray",
        plugins:
            "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons filery textcolor colorpicker",
        toolbar:
            "undo redo | formatselect | styleselect | bold italic | alignleft aligncenter alignright alignjustify | checklist numlist | link image  | forecolor backcolor",
        filery_api_url: "/test.json",
        convert_urls: false, // Ngăn chặn tự động đổi URL
        relative_urls: false, // Bắt buộc dùng URL tuyệt đối
        remove_script_host: false,
        color_cols: 5,
        //filery_api_token: '123',
        //filery_dialog_height: '400px',
        //filery_show_images: true,
        // images_upload_url: 'https://staging.api.f6.com.vn/uploads/process',
        automatic_uploads: true,
        file_picker_types: "file image media",
        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData, img_path;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open("POST", window.SERVICE_UPLOAD_URL);
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + getCookie("imap_authen_access_token")
            );
            xhr.setRequestHeader("channel", self.attr("data-channel"));
            xhr.setRequestHeader("folder", self.attr("data-folder"));
            xhr.setRequestHeader("type", "image");

            xhr.onload = function () {
                if (xhr.status != 200) {
                    failure("HTTP Error: " + xhr.status);
                    return;
                }
                let res = JSON.parse(xhr.responseText);
                img_path = res.path;
                success(window.SERVICE_MEDIA_URL + img_path);
            };
            formData = new FormData();
            formData.append("files", blobInfo.blob(), blobInfo.filename());
            xhr.send(formData);
        },
        file_picker_callback: function (callback, value, meta) {
            var xhr, formData, img_path;
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("class", "domId");
            //input.setAttribute('accept', 'image/*');

            input.onchange = function () {
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open("POST", window.SERVICE_UPLOAD_URL);
                xhr.setRequestHeader(
                    "Authorization",
                    "Bearer " + getCookie("imap_authen_access_token")
                );
                xhr.setRequestHeader("channel", self.attr("data-channel"));
                xhr.setRequestHeader("type", "file");

                xhr.onload = function () {
                    if (xhr.status != 200) {
                        console.log("HTTP Error: " + xhr.status);
                        return;
                    }
                    let res = JSON.parse(xhr.responseText);
                    let pathUrl =
                        SERVICE_UPLOAD_URL_V2 +
                        "/api/files/view?path=" +
                        res.path;
                    callback(pathUrl);
                };

                ////// get blob //////
                var file = this.files[0];

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var id = "blobid" + new Date().getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(",")[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    formData = new FormData();
                    formData.append(
                        "files",
                        blobInfo.blob(),
                        blobInfo.filename()
                    );
                    xhr.send(formData);
                };
            };

            input.click();
        },
    });
}
if ($(".tinymce").length > 0) {
    tinymce.baseURL =
        "https://master-ebomb-cdn.ebomb.edu.vn/theme/backend/js/tinymce";
    $(".tinymce").each(function () {
        var randomString = Math.random().toString(36).slice(-10);
        $(this).addClass(randomString);
        loadTinyMce(randomString);
    });
}
