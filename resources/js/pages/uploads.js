/* ------------------------------------------------------------------------------
 *
 *  # Bootstrap multiple file uploader
 *
 *  Demo JS code for uploader_bootstrap.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var FileUpload = function() {


    //
    // Setup module components
    //

    // Bootstrap file upload
    var _componentFileUpload = function(dom) {
        // if (!$().FilePond) {
        //     console.warn('Warning - FilePond is not loaded.');
        //     return;
        // }

        FilePond.registerPlugin(FilePondPluginImagePreview);  // Thêm plugin preview ảnh
        FilePond.registerPlugin(FilePondPluginMediaPreview);  // Thêm plugin preview audio
        dom.find('input[type="file"]').each(function(){
            var self = $(this);
            var fieldName = self.attr('data-field');
            var _channel = self.attr('data-channel');
            if (!_channel) {
                return false;
            }
            var files = [];
            var _type = self.attr('data-type') || 'image';
            var isMultiUpload = (self.attr('multiple')) ? 1 : 0;
            var domUpload = self.parent();
            var hiddenField = domUpload.find('input[name="'+ fieldName+'"');
            var _function_callback = self.attr('data-callback');
            if (hiddenField) {
                if (isMultiUpload == 0) { /// upload 1 file
                    var val_files = hiddenField.val();
                    if (val_files) {
                        files.push(
                        {
                            source: val_files,
                            options: {type: 'local'}
                        });
                    }
                    
                }
                else {
                    var val_files = hiddenField.map(function(){return $(this).val();}).get();
                    if (val_files.length > 0) {
                        $.each(val_files,function(K,item){
                            files.push(
                            {
                                source: item,
                                options: {type: 'local'}
                            });
                        });
                    }
                    
                }
                
                
            }
            self.filepond({
                files: files,
                //allowMultiple: true,
                //name: 'files',
                maxParallelUploads: 10,
                checkValidity: true,
                forceRevert: true,
                server: {
                    url: '',
                    timeout: 7000,
                    process: {
                        url: window.SERVICE_UPLOAD_URL+ '/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + getCookie('imap_authen_access_token'),
                            'channel' : _channel,
                            'type' : _type
                        },
                        withCredentials: false,
                        onload: (res) => {
                            if(_function_callback && typeof window[_function_callback] === "function"){ 
                                // Gọi hàm callback
                                return window[_function_callback](res); 
                            }
                            res = JSON.parse(res)
                            if (res.error) {
                                alert(res.message)
                                pond.removeFile()
                            } else {
                                files = self.filepond('getFiles');
                                console.log(fieldName,domUpload, files); 
                                if (!isMultiUpload) {
                                    hiddenField.remove();
                                    // $.each(files, function(idx,item){
                                    //     console.log(item,item.serverId,item.file)
                                        
                                        //currentVal.push();
                                    //});
                                    // var currentVal = hiddenField.val();
                                    // currentVal = (!currentVal) ? [] : JSON.parse(currentVal);
                        
                                    // currentVal.push(res.path);
                                    // hiddenField.val(JSON.stringify(currentVal));
                                    // console.log(currentVal);
                                }
                                domUpload.append('<input type="hidden" name="' + fieldName + '" value="' + res.path +'">');
                                //$("body").html('<input type="hidden" name="' + fieldName + '" value="' + res.path +'">');
                                return res.path;
                            }
                        },
                        onerror: (response) => {
                            alert('Lỗi Upload: ' + response);
                        }//,
                        //ondata: (formData) => {
                            //formData.append('channel', _channel);
                            //return formData;
                        //},
                    },
                    revert: null,
                    restore: null,
                    load: window.SERVICE_MEDIA_URL + '/',
                    fetch: null
                },
                onremovefile: (error,file) => {
                    files = self.filepond('getFiles');
                    //if (isMultiUpload) {
                    // xoa input file cu
                    domUpload.find('input[name="'+ fieldName+'"').remove();
                    $.each(files, function(idx,item){
                        domUpload.append('<input type="hidden" name="' + fieldName + '" value="' + item.serverId +'">');
                        //currentVal.push();
                    });
                    // console.log(files);
                    // if (isMultiUpload) {
                    //     var files = self.filepond('getFiles');
                    //     var currentVal = [];
                    //     $.each(files, function(idx,item){
                    //         currentVal.push(item.serverId);
                    //     })
                    //     hiddenField.val(JSON.stringify(currentVal));
                    
                    // }
                    // else {
                    //     hiddenField.val("");    
                    // }
                }
            });
        });
    }

    //
    // Return objects assigned to module
    //

    return {
        init: function(parentDom) {
            _componentFileUpload(parentDom);
        }
    }
}();


// Initialize module
// ------------------------------
$(document).on('DOMContentLoaded MainContentReloaded',function(e){
    FileUpload.init($(e.target));
});