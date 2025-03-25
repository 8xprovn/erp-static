/* ------------------------------------------------------------------------------
 *
 *  # Template JS core
 *
 *  Includes minimum required JS code for proper template functioning
 *
 * ---------------------------------------------------------------------------- */

// Setup module
// ------------------------------

const Layout = (function () {
    //$.fn.modal.Constructor.prototype.enforceFocus = function() {};
    // Enable all transitions
    var slideModalRight = function () {
        $("body").on("submit", ".ajax-submit-form", function (e) {
            self = $(this);
            var dataSerialize = self.serializeArray();
            var objReformatCurrency = {};
            self.find(".format_price").each(function () {
                var name = $(this).attr("name");
                if (!name) {
                    return true;
                }
                objReformatCurrency[name] = $(this).unmask();
            });
            if (Object.keys(objReformatCurrency).length > 0) {
                $.each(dataSerialize, function (idx, item) {
                    if (item.name in objReformatCurrency) {
                        dataSerialize[idx].value =
                            objReformatCurrency[item.name];
                    }
                });
            }
            //dataSerialize.push({name: 'submit', value: 1});
            self.find(".ajax-submit-button")
                .attr("disabled", "true")
                .addClass("disabled");

            $.ajax({
                type: self.attr("method"),
                url: self.attr("action"),
                crossDomain: true,
                method: self.attr("method"),
                data: dataSerialize, // serializes the form's elements.
                dataType: "json",
                beforeSend: function (xhr) {
                    //var self = this;
                    progress_loading.show(".ajax-submit-form");

                    $.each(dataSerialize, function (idx, item) {
                        console.debug(idx, item.name);
                        if (item.name == "authorization") {
                            xhr.setRequestHeader(
                                "Authorization",
                                "Bearer " + item.value
                            );
                            delete this.data[idx];
                        }
                    });
                },
                success: function (data) {
                    progress_loading.hide();
                    //console.debug(data);
                    if (data.error) {
                        data.status = "error";
                        data.message = data.error_description;
                    }
                    if (data.status == "error") {
                        if (typeof data.message == "object") {
                            var message = "";
                            $.each(data.message, function (k, v) {
                                message += v + "<br>";
                            });
                        } else {
                            var message = data.message;
                        }
                        new PNotify({
                            title: "Error",
                            text: message,
                            type: "error",
                            styling: "bootstrap3",
                            delay: 2000,
                            mouse_reset: false,
                        });

                        self.find(".ajax-submit-button")
                            .removeAttr("disabled")
                            .removeClass("disabled");
                        return false;
                    }

                    new PNotify({
                        title: "Success",
                        text:
                            typeof data.message != "undefined"
                                ? data.message
                                : "Dữ liệu được cập nhật thành công",
                        type: "success",
                        styling: "bootstrap3",
                        delay: 2000,
                        mouse_reset: false,
                    });
                    

                    if (self.attr("data-reload-page") === "true") {
                        window.location.reload();
                        return true;
                    }

                    var redirect_uri = "";
                    if (data.redirect_uri) {
                        redirect_uri = data.redirect_uri;
                    }
                    if (self.attr("data-redirect-uri")) {
                        redirect_uri = self.attr("data-redirect-uri");
                    }
                    if (self.attr("data-trigger")) {
                        var objData = {};
                        $.each(dataSerialize, function (k, item) {
                            objData[item.name] = item.value;
                        });
                        $(document).trigger(
                            self.attr("data-trigger"),
                            Object.assign(objData, data)
                        );
                    }

                    var popupId = self.attr("data-popup-id");

                    // Execute callback if data-callback attribute is provided

                    if (self.attr("data-callback")) {
                        let callbackPath = self.attr("data-callback");
                        let callbackFunction;

                        if (callbackPath.includes(".")) {
                            // If there's a dot, split and traverse to reach the nested function
                            let parts = callbackPath.split(".");
                            callbackFunction = window;
                            for (let i = 0; i < parts.length; i++) {
                                callbackFunction = callbackFunction[parts[i]];
                                if (typeof callbackFunction === "function") {
                                    break;
                                }
                            }
                        } else {
                            // No dot, access directly from window
                            callbackFunction = window[callbackPath];
                        }

                        // Execute if the resolved callback function is valid
                        if (typeof callbackFunction === "function") {
                            callbackFunction(data); 
                        } else {
                            console.warn(
                                "Callback function not found or is not a function:",
                                callbackPath
                            );
                        }
                    }

                    if (
                        self.attr("data-not-refesh") &&
                        self.attr("data-not-refesh") == "true"
                    ) {
                        $("#" + popupId)
                            .modal("hide")
                            .data("bs.modal", null);
                        return true;
                    }

                    if (
                        self.attr("data-redirect-load-modal") &&
                        self.attr("data-redirect-load-modal") == "true"
                    ) {
                        let _url = data.redirect_uri || "";
                        $.ajax({
                            url: _url,
                            data: {
                                view: "popup",
                            },
                            dataType: "html",
                            beforeSend: function (xhr) {
                                progress_loading.show(".content-inner");
                            },
                            success: function (data, status, xhr) {
                                progress_loading.hide();
                                $("#" + popupId)
                                    .find(".modal-body-content")
                                    .html(data);
                                $("#" + popupId).trigger(
                                    "MainContentReloaded",
                                    []
                                );
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                if (xhr.responseText) {
                                    var responseText = JSON.parse(
                                        xhr.responseText
                                    );
                                    var TextMessage =
                                        responseText.message ||
                                        responseText.error_description ||
                                        "Vui lòng liên hệ IT để được hỗ trợ";
                                } else {
                                    var TextMessage =
                                        "Vui lòng liên hệ IT để được xử lý";
                                }
                                show_notify_error({
                                    message:
                                        "Lỗi " +
                                        xhr.status +
                                        ": " +
                                        TextMessage,
                                });
                                progress_loading.hide();
                            },
                        }).done(function () {});
                        redirectAjaxUrl(window.location.href);
                        return true;
                    }

                    if (redirect_uri == "popup_close") {
                        $("#" + popupId)
                            .modal("hide")
                            .data("bs.modal", null);
                        redirectAjaxUrl(window.location.href);
                        return true;
                    } else {
                        redirectAjaxUrl(redirect_uri);
                        return true;
                    }
                },
                error: function (e) {
                    console.debug(e);
                    self.find(".ajax-submit-button")
                        .removeAttr("disabled")
                        .removeClass("disabled");
                    progress_loading.hide();
                    show_notify_error(e.responseText);
                },
            }).done(function () {
                $(this)
                    .closest("form")
                    .find("input[type=text], textarea")
                    .val("");
            });
            e.preventDefault(); // avoid to execute the actual submit of the form.
        });
        $("body").on("click", ".quick-action-confirm", function () {
            // Setup
            var url = $(this).attr("action");
            var method = $(this).attr("method") || "POST";
            var content =
                $(this).attr("content") ||
                "Bạn có chắc muốn thực hiện thao tác không ?";
            if (!url) {
                show_notify_error("Lỗi mã code. Liên hệ với IT để được hỗ trợ");
                return false;
            }
            var notice = new PNotify({
                title: "Xác nhận thông tin",
                text: "<p>" + content + "</p>",
                hide: false,
                type: "warning",
                confirm: {
                    confirm: true,
                    buttons: [
                        {
                            text: "Đồng ý",
                            addClass: "btn btn-sm btn-primary",
                        },
                        {
                            addClass: "btn btn-sm btn-link",
                        },
                    ],
                },
                buttons: {
                    closer: false,
                    sticker: false,
                },
            });

            // On confirm
            notice.get().on("pnotify.confirm", function () {
                $.ajax({
                    type: method,
                    url: url,
                    //data: dataSerialize, // serializes the form's elements.
                    dataType: "json",
                    success: function (response) {
                        if (response.error || response.status == "error") {
                            show_notify_error(response);
                            return false;
                        }
                        new PNotify({
                            title: "Success",
                            text:
                                typeof response.message != "undefined"
                                    ? response.message
                                    : "Đã cập nhật thông tin thành công",
                            type: "success",
                            styling: "bootstrap3",
                            delay: 2000,
                            mouse_reset: false,
                        });
                        redirectAjaxUrl(window.location.href);
                    },
                    error: function (e) {
                        show_notify_error(e.responseText);
                    },
                });
            });
        });

        $("body").on("click", ".quick-action-confirm-loading", function () {
            // Setup
            var url = $(this).attr("action");
            var method = $(this).attr("method") || "POST";
            var content =
                $(this).attr("content") ||
                "Bạn có chắc muốn thực hiện thao tác không ?";
            if (!url) {
                show_notify_error("Lỗi mã code. Liên hệ với IT để được hỗ trợ");
                return false;
            }
            var notice = new PNotify({
                title: "Xác nhận thông tin",
                text: "<p>" + content + "</p>",
                hide: false,
                type: "warning",
                confirm: {
                    confirm: true,
                    buttons: [
                        {
                            text: "Đồng ý",
                            addClass: "btn btn-sm btn-primary",
                        },
                        {
                            addClass: "btn btn-sm btn-link",
                        },
                    ],
                },
                buttons: {
                    closer: false,
                    sticker: false,
                },
            });

            // On confirm
            notice.get().on("pnotify.confirm", function () {
                $.ajax({
                    type: method,
                    url: url,
                    //data: dataSerialize, // serializes the form's elements.
                    dataType: "json",
                    beforeSend: function () {
                        progress_loading.show();
                    },
                    success: function (response) {
                        progress_loading.hide();
                        if (response.error || response.status == "error") {
                            show_notify_error(response);
                            return false;
                        }
                        new PNotify({
                            title: "Success",
                            text:
                                typeof response.message != "undefined"
                                    ? response.message
                                    : "Đã cập nhật thông tin thành công",
                            type: "success",
                            styling: "bootstrap3",
                            delay: 2000,
                            mouse_reset: false,
                        });
                        redirectAjaxUrl(window.location.href);
                    },
                    error: function (e) {
                        progress_loading.hide();
                        show_notify_error(e.responseText);
                    },
                });
            });
        });

        $("body").on("click", ".quick-action-not-confirm", function () {
            // Setup
            var url = $(this).attr("action");
            var method = $(this).attr("method") || "POST";
            var callbackFunction = $(this).attr("callback") || "";
            // On confirm
            $.ajax({
                type: method,
                url: url,
                //data: dataSerialize, // serializes the form's elements.
                dataType: "json",
                success: function (response) {
                    if (response.error || response.status == "error") {
                        show_notify_error(response);
                        return false;
                    }
                    new PNotify({
                        title: "Success",
                        text: "Đã cập nhật thông tin thành công",
                        type: "success",
                        styling: "bootstrap3",
                        delay: 2000,
                        mouse_reset: false,
                    });
                    if (callbackFunction) {
                        return window[functionName](response);
                    } else {
                        redirectAjaxUrl(window.location.href);
                    }
                },
                error: function (e) {
                    show_notify_error(e.responseText);
                },
            });
        });
        $("body").on("click", "a", function (e) {
            var url = $(this).attr("href");
            if (
                $(this).hasClass("load_not_ajax") ||
                $(this).hasClass("call_ajax_modal") ||
                !url ||
                url == "#" ||
                typeof $(this).data("toggle") !== "undefined"
            ) {
                return true;
            }
            $.ajax({
                url: url,
                headers: { view: "ajax" },
                beforeSend: function () {
                    progress_loading.show();
                },
                success: function (data) {
                    history.pushState({}, "", url);
                    $(".content-wrapper").remove();
                    $(".sidebar-secondary").remove();
                    $(".sidebar-right").remove();
                    $(".page-content").append(data);
                    ///////// HIDE ON MOBILE /////
                    $(".sidebar-mobile-expanded").removeClass(
                        "sidebar-mobile-expanded"
                    );
                    ///////// push event //////
                    progress_loading.hide();
                    $(".page-content").trigger("MainContentReloaded", []);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.responseText) {
                        var responseText = JSON.parse(xhr.responseText);
                        var TextMessage =
                            responseText.message ||
                            responseText.error_description ||
                            "Vui lòng liên hệ IT để được hỗ trợ";
                    } else {
                        var TextMessage = "Vui lòng liên hệ IT để được xử lý";
                    }
                    show_notify_error({
                        message: "Lỗi " + xhr.status + " : " + TextMessage,
                    });
                    progress_loading.hide();
                },
            });
            e.preventDefault();
        });
        $("body").on("submit", ".ajax-filter-form", function (e) {
            self = $(this);
            var dataSerialize = self.serializeArray();
            //dataSerialize.push({name: 'view', value: 'popup'});
            self.find(".ajax-submit-button")
                .attr("disabled", "true")
                .addClass("disabled");
            $.ajax({
                type: self.attr("method"),
                url: self.attr("action"),
                method: self.attr("method"),
                headers: { view: "popup" },
                data: dataSerialize, // serializes the form's elements.
                dataType: "html",
                beforeSend: function (xhr) {
                    var self = this;
                    progress_loading.show(".content-inner");
                    $.each(dataSerialize, function (idx, item) {
                        if (item.name == "authorization") {
                            xhr.setRequestHeader(
                                "Authorization",
                                "Bearer " + item.value
                            );
                            delete self.data[idx];
                        }
                    });
                },
                success: function (data, status, xhr) {
                    progress_loading.hide();
                    $(".content-inner").html(data);
                    history.pushState({}, "", this.url);
                    ////// HIDE ON MOBILE //////
                    $(".sidebar-mobile-expanded").removeClass(
                        "sidebar-mobile-expanded"
                    );
                    $(".content-inner").trigger("MainContentReloaded", []);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.responseText) {
                        var responseText = JSON.parse(xhr.responseText);
                        var TextMessage =
                            responseText.message ||
                            responseText.error_description ||
                            "Vui lòng liên hệ IT để được hỗ trợ";
                    } else {
                        var TextMessage = "Vui lòng liên hệ IT để được xử lý";
                    }
                    show_notify_error({
                        message: "Lỗi " + xhr.status + ": " + TextMessage,
                    });
                    history.pushState({}, "", this.url);
                    progress_loading.hide();
                },
            }).done(function () {});
            e.preventDefault(); // avoid to execute the actual submit of the form.
        });

        $("body").on("click", ".report_ajax_modal", function (e) {
            var self = $(this);
            var url = self.attr("action") || window.location.href;
            var page_action = self.attr("data-page-action") || "export";
            self.hide();
            // Setup
            var notice = new PNotify({
                title: "Xác nhận xuất dữ liệu",
                text: "<p>Bạn có chắc muốn tải dữ liệu về không ?</p>",
                hide: false,
                type: "warning",
                confirm: {
                    confirm: true,
                    buttons: [
                        {
                            text: "Yes",
                            addClass: "btn btn-sm btn-primary",
                        },
                        {
                            addClass: "btn btn-sm btn-link",
                        },
                    ],
                },
                buttons: {
                    closer: false,
                    sticker: false,
                },
            });

            // On confirm
            notice.get().on("pnotify.confirm", function () {
                $.ajax({
                    url: url,
                    headers: { "page-action": page_action },
                    dataType: "json",
                    beforeSend: function (xhr) {
                        var self = this;
                        progress_loading.show();
                    },
                    success: function (data, status, xhr) {
                        progress_loading.hide();
                        self.show();
                        if (data.error || data.status == "error") {
                            show_notify_error({
                                message: data.message,
                            });
                            return false;
                        }

                        new PNotify({
                            title: "Success",
                            text: "Hệ thống đã đưa vào danh sách export, sẽ có notification từ app khi xong",
                            type: "success",
                            styling: "bootstrap3",
                            delay: 2000,
                            mouse_reset: false,
                        });
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        self.show();
                        if (xhr.responseText) {
                            var responseText = JSON.parse(xhr.responseText);
                            var TextMessage =
                                responseText.message ||
                                responseText.error_description ||
                                "Vui lòng liên hệ IT để được hỗ trợ";
                        } else {
                            var TextMessage =
                                "Vui lòng liên hệ IT để được xử lý";
                        }
                        show_notify_error({
                            message: "Lỗi " + xhr.status + ": " + TextMessage,
                        });
                        progress_loading.hide();
                    },
                }).done(function () {});
            });

            // On cancel
            notice.get().on("pnotify.cancel", function () {
                self.show();
            });
        });
        $("body").on("click", ".call_ajax_modal", function (e) {
            e.preventDefault();
            var url = $(this).attr("data-url");
            if (!url) {
                var url = $(this).attr("href");
            }
            ajaxModal(url);
        });
    };
    var ajaxModal = function (url) {
        var ajax_call_id = Math.random().toString(36).substring(2);
        html =
            '<div id="' +
            ajax_call_id +
            '" class="modal right fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">\
                    <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="d-flex justify-content-center" style="position: absolute; top: 45%; left: 45%;">\
                            <div class="spinner-grow text-primary" role="status">\
                                <span class="sr-only">Loading...</span>\
                            </div>\
                            <div class="spinner-grow text-secondary" role="status">\
                                <span class="sr-only">Loading...</span>\
                            </div>\
                            <div class="spinner-grow text-success" role="status">\
                                <span class="sr-only">Loading...</span>\
                            </div>\
                            <div class="spinner-grow text-danger" role="status">\
                                <span class="sr-only">Loading...</span>\
                            </div>\
                            <div class="spinner-grow text-warning" role="status">\
                                <span class="sr-only">Loading...</span>\
                            </div>\
                        </div>\
                        <div class="modal-body-content d-none">\
                        </div>\
                    </div>\
                    </div>\
                </div>';
        $("body").append(html);
        //console.log(url);
        var body = $("#" + ajax_call_id);
        body.modal();
        $.ajax({
            url: url,
            data: {
                view: "popup",
            },
            beforeSend: function () {},
            success: function (data) {
                body.find(".justify-content-center").remove();
                body.find(".modal-body-content").html(data);
                body.find(".page-header").remove();
                body.find(".content").removeClass("content");
                body.find(".card").removeClass("card");
                body.find(".card").removeClass("card");
                body.find("form").attr("data-redirect-uri", "popup_close");
                body.find("form").attr("data-popup-id", ajax_call_id);
                body.find(".modal-body-content").removeClass("d-none");
                //////////////////////
                body.on("hidden.bs.modal", function (e) {
                    $(this).remove();
                });
                body.trigger("MainContentReloaded", []);
                body.find("script").each(function () {
                    let newScript = document.createElement("script");
                
                    if (this.src) {
                        // Nếu script có src => Tạo lại thẻ script mới để tải file từ src
                        newScript.src = this.src;
                        newScript.async = false; // Đảm bảo script tải theo thứ tự
                    } else {
                        // Nếu script inline => Chạy trực tiếp
                        newScript.text = this.text;
                    }
                
                    document.body.appendChild(newScript);
                });
                return true;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                body.modal("hide");
                if (xhr.responseText) {
                    var responseText = JSON.parse(xhr.responseText);
                    var TextMessage =
                        responseText.message ||
                        responseText.error_description ||
                        "Vui lòng liên hệ IT để được hỗ trợ";
                } else {
                    var TextMessage = "Vui lòng liên hệ IT để được xử lý";
                }
                show_notify_error({
                    message: "Lỗi " + xhr.status + ": " + TextMessage,
                });
            },
        });
    };
    var moneyFormat = function (parentDom) {
        parentDom.find(".format_price").priceFormat({
            prefix: "",
            thousandsSeparator: ",",
            centsLimit: 0,
            allowNegative: true,
            clearOnEmpty: false,
        });
    };

    //
    // Return objects assigned to module
    //

    return {
        initReload: function (parentDom) {
            moneyFormat(parentDom);
        },
        onload: function () {
            slideModalRight();
        },
        ajaxModal: function (url) {
            ajaxModal(url);
        },
    };
})();

// Initialize module
// ------------------------------

// When content is loaded
$(document).on("DOMContentLoaded MainContentReloaded", function (e) {
    Layout.initReload($(e.target));
});
// When page is fully loaded
window.addEventListener("load", function () {
    Layout.onload();
});

$(document).on("pricechange", ".format_price", function (e) {
    //console.log(e.target);
    $(e.target).priceFormat({
        prefix: "",
        thousandsSeparator: ",",
        clearOnEmpty: false,
        centsLimit: 0,
        allowNegative: true,
    });
});
