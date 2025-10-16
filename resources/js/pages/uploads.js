/* ------------------------------------------------------------------------------
 *
 *  # Bootstrap multiple file uploader
 *
 *  Demo JS code for uploader_bootstrap.html page
 *
 * ---------------------------------------------------------------------------- */

// Setup module
// ------------------------------

var FileUpload = (function () {
    //
    // Setup module components
    //

    // Bootstrap file upload
    var _componentFileUpload = function (dom) {
        // if (!$().FilePond) {
        //     console.warn('Warning - FilePond is not loaded.');
        //     return;
        // }

        FilePond.registerPlugin(FilePondPluginImagePreview); // Thêm plugin preview ảnh
        FilePond.registerPlugin(FilePondPluginMediaPreview); // Thêm plugin preview audio
        dom.find('input[type="file"]').each(function () {
            var self = $(this);
            var fieldName = self.attr("data-field");
            var _channel = self.attr("data-channel");
            var _folder = self.attr("data-folder") || "";
            var _version = self.attr("data-version") || 1;
            var pond = null;
            var _service_upload_url = (_version == 2) ? window.SERVICE_UPLOAD_URL_V2 : window.SERVICE_UPLOAD_URL;

            if (!_channel) {
                return false;
            }
            var files = [];
            var _type = self.attr("data-type") || "image";
            var isMultiUpload = self.attr("multiple") ? 1 : 0;
            var domUpload = self.parent();
            var hiddenField = domUpload.find('input[name="' + fieldName + '"');
            var _function_callback = self.attr("data-callback");
            if (hiddenField) {
                if (isMultiUpload == 0) {
                    /// upload 1 file
                    var val_files = hiddenField.val();
                    if (val_files) {
                        files.push({
                            source: val_files,
                            options: { type: "local" },
                        });
                    }
                } else {
                    var val_files = hiddenField
                        .map(function () {
                            return $(this).val();
                        })
                        .get();
                    if (val_files.length > 0) {
                        $.each(val_files, function (K, item) {
                            files.push({
                                source: item,
                                options: { type: "local" },
                            });
                        });
                    }
                }
            }
            var valueData = self.attr("data-value");
            if (valueData) {
                // console.log(valueData);
                if (isMultiUpload == 0) { /// upload 1 file
                    files.push(
                    {
                        source: valueData,
                        options: {type: 'remote'}
                    });
                }
                else {
                    valueData = JSON.parse(valueData);
                    $.each(valueData,function(K,item){
                        files.push(
                        {
                            source: item,
                            options: {type: 'remote'}
                        });
                    });
                }
                console.log(files);
            }
            self.filepond({
                files: files,
                //allowMultiple: true,
                //name: 'files',
                maxParallelUploads: 10,
                checkValidity: true,
                forceRevert: true,
                server: {
                    url: "",
                    timeout: 7000,
                    process: {
                        url: _service_upload_url,
                        method: "POST",
                        headers: {
                            Authorization:
                                "Bearer " +
                                getCookie("imap_authen_access_token"),
                            channel: _channel,
                            type: _type,
                            folder: _folder
                        },
                        withCredentials: false,
                        onload: (res) => {
                            let responsive = res;
                            res = JSON.parse(res);
                            if (res.error) {
                                alert(res.message)
                                pond.removeFile()
                            } else {
                                files = self.filepond('getFiles');
                                if (!isMultiUpload) {
                                    hiddenField.remove();
                                }
                                if (fieldName) {
                                    domUpload.append('<input type="hidden" name="' + fieldName + '" value="' + res.path +'">');
                                }
                                
                                //$("body").html('<input type="hidden" name="' + fieldName + '" value="' + res.path +'">');
                                if (
                                    _function_callback &&
                                    typeof window[_function_callback] ===
                                        "function"
                                ) {
                                    // Gọi hàm callback
                                    return window[_function_callback](responsive);
                                }
                                return res.path;
                            }
                        },
                        onerror: (response) => {
                            try {
                                const data = typeof response === 'string' ? JSON.parse(response) : response;
                                const msg = data?.message || data?.error_description;
                                if (msg) {
                                    alert("Lỗi Upload: " + data.message);
                                } else {
                                    alert("Lỗi Upload: " + response);
                                }
                            } catch (e) {
                                alert("Lỗi Upload: " + response);
                            }
                        }, //,
                        //ondata: (formData) => {
                        //formData.append('channel', _channel);
                        //return formData;
                        //},
                    },
                    revert: null,
                    restore: null,
                    load: window.SERVICE_MEDIA_URL + "/",
                    fetch: _service_upload_url,
                },
                onaddfile: (err, item) => {
                    const acceptedFileTypes = self.attr("data-accept")
                        ? self.attr("data-accept").split(",")
                        : []
                    const fileType = item.file.type;
                    if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(fileType)) {
                        alert("Tệp không hợp lệ: " + item.file.name);
                        self.filepond('removeFile', item.id);
                        return false;
                    }
                },
                onremovefile: (error, file) => {
                    files = self.filepond("getFiles");
                    //if (isMultiUpload) {
                    // xoa input file cu
                    if (fieldName) {
                        domUpload.find('input[name="' + fieldName + '"').remove();
                        $.each(files, function (idx, item) {
                            domUpload.append(
                                '<input type="hidden" name="' +
                                    fieldName +
                                    '" value="' +
                                    item.serverId +
                                    '">'
                            );
                            //currentVal.push();
                        });
                    }
                    
                },
            });
        });
    };

    //
    // Return objects assigned to module
    //

    return {
        init: function (parentDom) {
            _componentFileUpload(parentDom);
        },
    };
})();

// Initialize module
// ------------------------------
$(document).on("DOMContentLoaded MainContentReloaded", function (e) {
    FileUpload.init($(e.target));
});
