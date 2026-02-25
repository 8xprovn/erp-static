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
                        },
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

function appendCacheBuster(url) {
    if (!url) return url;

    const v = "v=" + Date.now(); // hoặc random: Math.floor(Math.random()*1000)

    // đã có query ?
    if (url.includes("?")) {
        // tránh bị thêm trùng v=
        if (/([?&])v=\d+/.test(url)) return url;
        return url + "&" + v;
    }

    return url + "?" + v;
}
function loadTinyMce(domId) {
    var self = $("." + domId);

    function getEndpoints() {
        const version = Number(self.attr("data-version")) || 1;
        const baseUp =
            version === 2
                ? window.SERVICE_UPLOAD_URL_V2
                : window.SERVICE_UPLOAD_URL;
        return {
            uploadUrl: version === 2 ? baseUp + "/api/files/store" : baseUp,
            viewUrlPrefix: version === 2 ? baseUp + "/storage/" : baseUp + "/",
        };
    }

    tinymce.init({
        selector: "textarea." + domId,
        readonly: window.tinymce_readonly ? 1 : 0,
        plugins:
            "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons filery textcolor colorpicker",
        toolbar:
            "undo redo | formatselect | styleselect | bold italic | alignleft aligncenter alignright alignjustify | checklist numlist | link image media | forecolor backcolor",
        filery_api_url: "/test.json",
        convert_urls: false, // Ngăn chặn tự động đổi URL
        relative_urls: false, // Bắt buộc dùng URL tuyệt đối
        remove_script_host: false,
        color_cols: 5,
        automatic_uploads: true,
        file_picker_types: "file image media",

        // Đảm bảo TinyMCE ghi ngược HTML về <textarea> (tránh required + hidden focus)
        setup: (ed) => {
            ed.on("init", () => {
                ed.getBody()
                    .querySelectorAll("img")
                    .forEach((img) => {
                        img.src = appendCacheBuster(img.src);
                    });
            });

            ed.on("change keyup undo redo", () => ed.save());
        },

        paste_preprocess: function (plugin, args) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(args.content || "", "text/html");

            // ❌ xóa toàn bộ <style>...</style>
            doc.querySelectorAll("style, script, meta, link").forEach((el) =>
                el.remove(),
            );

            // xử lý attribute
            doc.body.querySelectorAll("*").forEach((el) => {
                const keep = {};

                if (el.hasAttribute("href")) {
                    keep.href = el.getAttribute("href");
                }

                if (el.hasAttribute("src")) {
                    keep.src = el.getAttribute("src");
                }

                // xóa toàn bộ attribute
                Array.from(el.attributes).forEach((attr) =>
                    el.removeAttribute(attr.name),
                );

                // set lại href / src
                Object.entries(keep).forEach(([k, v]) => {
                    if (v) el.setAttribute(k, v);
                });
            });

            args.content = doc.body.innerHTML;
        },

        images_upload_handler: function (blobInfo, success, failure) {
            const { uploadUrl, viewUrlPrefix } = getEndpoints();

            try {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open("POST", uploadUrl);
                xhr.setRequestHeader(
                    "Authorization",
                    "Bearer " + getCookie("imap_authen_access_token"),
                );
                xhr.setRequestHeader(
                    "channel",
                    self.attr("data-channel") || "",
                );
                xhr.setRequestHeader("folder", self.attr("data-folder") || "");
                xhr.setRequestHeader("type", "image");

                xhr.onload = function () {
                    if (xhr.status !== 200)
                        return failure("HTTP Error: " + xhr.status);

                    let res = {};
                    try {
                        res = JSON.parse(xhr.responseText || "{}");
                    } catch (e) {}
                    var path = res?.path || res?.data?.path;
                    if (!path) return failure("Upload error: missing path");
                    path = path.replace(/^\/+/, '');
                    success(viewUrlPrefix + path);
                };

                const formData = new FormData();
                formData.append("files", blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            } catch (err) {
                failure(err?.message || "Upload failed");
            }
        },

        file_picker_callback: function (callback, value, meta) {
            const { uploadUrl, viewUrlPrefix } = getEndpoints();

            // tạo input file
            const input = document.createElement("input");
            input.type = "file";
            // lọc theo loại
            if (meta.filetype === "image") input.accept = "image/*";
            if (meta.filetype === "media") input.accept = "video/*,audio/*";

            input.onchange = function () {
                const file = this.files?.[0];
                if (!file) return;

                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open("POST", uploadUrl);
                xhr.setRequestHeader(
                    "Authorization",
                    "Bearer " + getCookie("imap_authen_access_token"),
                );
                xhr.setRequestHeader(
                    "channel",
                    self.attr("data-channel") || "",
                );
                xhr.setRequestHeader("folder", self.attr("data-folder") || "");
                // type theo meta
                xhr.setRequestHeader(
                    "type",
                    meta.filetype === "image"
                        ? "image"
                        : meta.filetype === "media"
                          ? "media"
                          : "file",
                );

                xhr.onload = function () {
                    if (xhr.status != 200) {
                        console.log("HTTP Error: " + xhr.status);
                        return;
                    }
                    let res = {};
                    try {
                        res = JSON.parse(xhr.responseText || "{}");
                    } catch (e) {}
                    var path = res?.path || res?.data?.path;
                    if (!path) {
                        console.log("Upload error: missing path");
                        return;
                    }

                    // ✅ đúng API: trả thẳng URL cho TinyMCE
                    path = path.replace(/^\/+/, '');
                    const url = viewUrlPrefix + path;
                    callback(url);
                };

                // đẩy file lên
                const reader = new FileReader();
                reader.onload = function () {
                    const id = "blobid" + Date.now();
                    const blobCache =
                        tinymce.activeEditor.editorUpload.blobCache;
                    const base64 = reader.result.split(",")[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    const formData = new FormData();
                    formData.append(
                        "files",
                        blobInfo.blob(),
                        blobInfo.filename(),
                    );
                    xhr.send(formData);
                };
                reader.readAsDataURL(file);
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
