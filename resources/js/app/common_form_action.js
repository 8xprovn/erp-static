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

// Select2 can calculate a 0px search width while its modal is still hidden.
// Recalculate it after Bootstrap has finished showing the modal.
$(document).on("shown.bs.modal", ".modal", function () {
    var modal = this;

    window.requestAnimationFrame(function () {
        $(modal).find("select.select2-hidden-accessible").each(function () {
            var select2 = $(this).data("select2");

            if (
                select2 &&
                select2.selection &&
                typeof select2.selection.resizeSearch === "function"
            ) {
                select2.selection.resizeSearch();
            }
        });
    });
});

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
                if ($("#" + ajax_call_id).find(".format_price").length) {
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
                if ($("#" + ajax_call_id).find(".format_price_positive").length) {
                    AutoNumeric.multiple(
                        '[id="' + ajax_call_id + '"] .format_price_positive',
                        {
                            decimalPlaces: 0,
                            unformatOnSubmit: true,
                            watchExternalChanges: true,
                            wheelStep: 1000,
                            decimalPlacesRawValue: 0,
                            minimumValue: "0",
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

const ALLOWED_FILE_EXTENSIONS = [
    // Image
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",

    // Audio
    "mp3",

    // Video
    "mp4",
    "webm",
    "mov",
    "avi",
    "mkv",
    "mpeg",
    "mpg",
    "m4v",
    "3gp",

    // Document
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "csv",
];

const ALLOWED_FILE_MIMES = [
    // Image
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",

    // Audio
    "audio/mpeg",

    // Video
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/mpeg",
    "video/3gpp",

    // Document
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
];

const BLOCKED_URL_PATTERNS = [
    "chrome-extension://",
    "moz-extension://",
    "file://",
    "javascript:",
    "data:",
];

function getFileExtension(value) {
    if (!value) return "";

    const cleanValue = value
        .split("?")[0]
        .split("#")[0];

    const fileName = cleanValue.split("/").pop() || "";

    return fileName.includes(".") ?
        fileName.split(".").pop().toLowerCase() :
        "";
}

function normalizeUrl(url) {
    if (typeof url !== "string") {
        return "";
    }

    return url.trim().toLowerCase();
}

function isBase64ImageUrl(url) {
    return /^data:image\//i.test(normalizeUrl(url));
}

function isAllowedFileUrl(url) {
    if (!url) return false;
    // Chặn URL nội bộ và URL nguy hiểm
    // Chỉ cần xuất hiện một chuỗi bị chặn là trả về false
    const normalizedUrl = normalizeUrl(url);

    if (BLOCKED_URL_PATTERNS.some((pattern) => normalizedUrl.includes(pattern))) {
        return false;
    }
    const extension = getFileExtension(normalizedUrl);
    return ALLOWED_FILE_EXTENSIONS.includes(extension);
}

function isAllowedUploadFile(file) {
    if (!(file instanceof File)) {
        return false;
    }

    const extension = getFileExtension(file.name);
    const mime = (file.type || "").toLowerCase();

    return ALLOWED_FILE_EXTENSIONS.includes(extension) && ALLOWED_FILE_MIMES.includes(mime);
}

function sanitizeTinyMceContent(content) {
    if (!content || typeof content !== "string") {
        return "";
    }
    /*
     * Chuyển HTML bị escape thành HTML bình thường:
     * \"   → "
     * \r\n → xuống dòng
     */
    const decodedContent = content.replace(/\\"/g, '"').replace(/\\r\\n|\\n|\\r/g, "\n");

    const parser = new DOMParser();

    const doc = parser.parseFromString(decodedContent, "text/html");

    /*
     * Xóa các thẻ nguy hiểm (giữ object/embed/video phục vụ media).
     */
    doc.querySelectorAll("script, style, meta, link").forEach((element) => {
        element.remove();
    });

    /*
     * Xóa phần tử có URL nguy hiểm.
     */
    doc.querySelectorAll("[src], [href], [poster], [data]").forEach(
        (element) => {
            const values = [
                element.getAttribute("src"),
                element.getAttribute("href"),
                element.getAttribute("poster"),
                element.getAttribute("data"),
            ].filter(Boolean);

            const isBlocked = values.some((value) => {
                const normalizedUrl = normalizeUrl(value);
                return BLOCKED_URL_PATTERNS.some((pattern) =>
                    normalizedUrl.includes(pattern),
                );
            });

            if (isBlocked) element.remove();
        },
    );

    /*
     * Xóa ảnh có src/srcset base64.
     */
    doc.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        const srcset = img.getAttribute("srcset") || "";
        const hasBase64Srcset = srcset.split(",").some((part) => {
            const url = (part.trim().split(/\s+/)[0] || "");
            return isBase64ImageUrl(url);
        });

        if (isBase64ImageUrl(src) || hasBase64Srcset) {
            img.remove();
        }
    });

    /*
     * Xóa wrapper do extension chèn vào.
     */
    doc.querySelectorAll(
        [
            ".s4ext-lookup",
            ".s4ext-window",
            ".s4ext-window-header",
            ".s4ext-window-close",
            "#s4ext-window",
            '[class*="s4ext-"]',
            '[id*="s4ext-"]',
        ].join(","),
    ).forEach((element) => {
        element.remove();
    });

    /*
     * Xóa thẻ div/span rỗng còn lại.
     */
    doc.querySelectorAll("div, span, p").forEach((element) => {
        const text = (element.textContent || "").replace(/\u00a0/g, "").trim();
        const hasMedia = element.querySelector(
            "img, video, audio, source, a, iframe, embed, table, ul, ol, blockquote, pre, hr",
        );
        if (!text && !hasMedia) element.remove()
    });

    return doc.body.innerHTML.trim();
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
            viewUrlPrefix: version === 2 ? baseUp + "/storage/" : "https://st.ebomb.edu.vn/",
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
        paste_data_images: false,
        file_picker_types: "file image media",
        media_live_embeds: true,
        extended_valid_elements:
            "iframe[src|width|height|frameborder|allowfullscreen|allow|style|class|title|loading|referrerpolicy|name|id|sandbox]," +
            "embed[src|type|width|height|style|class|allowfullscreen|allow]," +
            "video[src|width|height|poster|controls|autoplay|loop|muted|preload|style|class|playsinline]," +
            "source[src|type|media]," +
            "object[data|type|width|height|style|class|id|name],param[name|value|valuetype|type]",


        setup: function (editor) {
            /*
             * Chạy khi TinyMCE set nội dung:
             * - Source code → OK
             * - editor.setContent()
             * - load dữ liệu ban đầu
             */
            editor.on("BeforeSetContent", function (event) {
                if (typeof event.content === "string") {
                    event.content = sanitizeTinyMceContent(event.content);
                }
            });

            editor.on("GetContent", function (event) {
                if (event.format === "html" && typeof event.content === "string") {
                    event.content = sanitizeTinyMceContent(event.content);
                }
            });

            /*
             * Làm sạch nội dung đã có khi editor khởi tạo.
             */
            editor.on("init", function () {
                const currentContent = editor.getContent();
                const cleanContent =
                    sanitizeTinyMceContent(currentContent);

                if (cleanContent !== currentContent) {
                    editor.setContent(cleanContent);
                    editor.save();
                }

                editor
                    .getBody()
                    .querySelectorAll("img")
                    .forEach((img) => {
                        const src = img.getAttribute("src") || "";
                        if (isBase64ImageUrl(src)) {
                            img.remove();
                            return;
                        }
                        img.src = appendCacheBuster(img.src);
                    });
            });

            editor.on("change keyup undo redo", function () {
                editor.save();
            });
        },

        paste_preprocess: function (plugin, args) {
            const originalContent = args.content || "";
            const cleanContent = sanitizeTinyMceContent(originalContent);
            args.content = cleanContent;
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
                if (!isAllowedUploadFile(file)) {
                    alert("Chỉ cho phép upload ảnh, video hoặc tài liệu hợp lệ.");
                    this.value = "";
                    return;
                }

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
