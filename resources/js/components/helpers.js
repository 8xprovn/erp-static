module.exports = (function(){
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    select2Data: function (data,id,format,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
              id: x.calendar_id,
              text: x.title + '(' + x.start_time + ')'
          };
          if (x.calendar_id == selected) {
            result.selected = true;
          }
          return result;
      });
      return result;
    },
    curlpost: function(url,params,callback) {
        this._curl(url,params,callback,'POST');
    },
    curlget: function(url,params,callback) {
        this._curl(url,params,callback,'GET');
    },
    curlgetapi: function(url,params,callback) {
        this._curl_api(url,params,callback,'GET');
    },
    curlput: function(url,params,callback) {
        this._curl(url,params,callback,'PUT');
    },
    curldelete: function(url,params,callback) {
        this._curl(url,params,callback,'DELETE');
    },
    curlgetapi_v2: function(url,params,callback,method) {
        $.ajax({
            url: url,
            type: method || 'GET',
            data: params,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Authorization':'Bearer ' + getCookie('imap_authen_access_token')
            },
            success: function (response) {
                if (response.error) {
                    show_notify_error(response);
                    return false;
                }
                if (callback && typeof(callback) === "function") {
                    callback(response);
                }
            },
            error: function (e) {
                show_notify_error(e.responseText);
            }
        });
    },
    _curl_api: function(url,params,callback,method) {
        var objParams = {};
        if (params) {
            $.each(params,function(qkey, qvalue){
                /////// NEU LA MANG THI WHERE IN

                switch(qkey) {
                    case 'from_date':
                        objParams[qkey] = {'gte': qvalue};
                        break;
                    case 'to_date':
                        objParams[qkey] = {'lte': qvalue};
                        break;
                    case 'option_customize':
                        Object.assign(objParams,qvalue);
                        break;
                    default:
                        if ($.isArray(qvalue)) {
                            objParams[qkey] = {'inq': qvalue};
                        }
                        else {
                            objParams[qkey] = {'eq': qvalue};
                        }

                    break;
                }

            });
        }

        $.ajax({
            url: url,
            type: method || 'GET',
            data: ($.isEmptyObject(objParams)) ? '' : {filter: JSON.stringify({"where": objParams, limit: 100})},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Authorization':'Bearer ' + getCookie('imap_authen_access_token')
            },
            success: function (response) {
                if (response.error) {
                    show_notify_error(response);
                    return false;
                }

                if (callback && typeof(callback) === "function") {
                    callback(response);
                }
            },
            error: function (e) {
                show_notify_error(e.responseText);
            }
        });
    },
    _curl: function(url,params,callback,method) {
        $.ajax({
            url: url,
            type: method || 'GET',
            data: params,
            headers: {
                //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                //'Authorization':'Bearer ' + getCookie('imap_authen_access_token')
            },
            success: function (response) {
                if (response.error) {
                    show_notify_error(response);
                    return false;
                }

                if (callback && typeof(callback) === "function") {
                    callback(response);
                }
            },
            error: function (e) {
                show_notify_error(e.responseText);
            }
        });
    },
    deleteItem: function deleteItem(url, params, callback) {
      var self = this;
      // Setup
      var notice = new PNotify({
          title: 'Xác nhận xóa dữ liệu',
          text: '<p>Bạn có chắc muốn xóa dữ liệu không?</p>',
          hide: false,
          type: 'warning',
          confirm: {
              confirm: true,
              buttons: [
                  {
                      text: 'Yes',
                      addClass: 'btn btn-sm btn-primary'
                  },
                  {
                      addClass: 'btn btn-sm btn-link'
                  }
              ]
          },
          buttons: {
              closer: false,
              sticker: false
          }
      })

      // On confirm
      notice.get().on('pnotify.confirm', function() {
          self.curldelete(url, params, function (response) {
            if (response.error || response.status == 'error') {
              show_notify_error(response);
              return false;
            }
            new PNotify({
              title: 'Success',
              text: 'Xóa dữ liệu thành công',
              type: 'success',
              styling: 'bootstrap3',
              delay: 2000,
              mouse_reset: false
            });

            if (callback && typeof callback === "function") {
              callback(response);
            }
          });
      })

      // On cancel
      notice.get().on('pnotify.cancel', function() {
          self.show();
      });
    },
      deleteBatch: function(url,params,callback) {
          var self = this;
          $.confirm({
              title: 'Confirm!',
              content: 'Bạn có chắc muốn xóa không',
              closeIcon: true,
              keyboardEnabled: true,
              backgroundDismiss: true,
              cancelButton: "Cancel",
              confirmButtonClass: 'btn-danger',
              confirm: function () {
                  self.curldelete(url,params,function(response){
                      if (response.error || response.status == 'error') {
                          show_notify_error(response);
                          return false;
                      }
                      new PNotify({
                          title: 'Success',
                          text: 'Xóa dữ liệu thành công',
                          type: 'success',
                          styling: 'bootstrap3',
                          delay: 2000,
                          mouse_reset: false
                      });
                      if (callback && typeof(callback) === "function") {
                          callback(response);
                      }
                  });

              }
          });
      },
    uploadFile: function(params,callback) {
        const inputFileAudioElement = document.querySelector(params.dom);
        if (inputFileAudioElement !== null) {
            var files = [];
            pond = FilePond.create(inputFileAudioElement,
                {
                    maxFiles: 10,
                    server: {
                        url: '',
                        process: {
                            url: window.API_SERVICE_URL + '/uploads/storage/put/tmp',
                            method: 'POST',
                            withCredentials: false,
                            headers: {},
                            timeout: 30000,
                            onload: (res) => {
                                res = JSON.parse(res)
                                if (res.error) {
                                    alert(res.error_description)
                                    pond.removeFile()
                                } else {
                                    $(params.dom).val(res.path);
                                    if (callback && typeof(callback) === "function") {
                                        callback(res);
                                    }
                                    return res.path
                                }
                            },
                            onerror: (response) => {
                                try{
                                    response = JSON.parse(response);
                                    if (response['status'] === 'error'){
                                        alert('Lỗi Upload: ' + response['message']);
                                    }
                                }catch (e) {
                                    alert('Lỗi Upload: ' + response);
                                }
                            },
                            ondata: (formData) => {
                                formData.append('channel', params.channel);
                                return formData;
                            }
                        },
                        // revert: 'https://staging.api.f6.com.vn/uploads/process/revert',
                        restore: null,
                        load: 'https://imapcdn.sgp1.digitaloceanspaces.com/staging/uploads/',
                        fetch: null,
                    },
                    files: files,
                });

            pond.on('removefile', (error, file) => {
                $(params.dom).val("");
            });
        }
    },
    select2AjaxSearch: function(dom,ajaxUrl,input,formatField) {
        $(dom).select2({
            minimumInputLength: 2,
            allowClear: true,
            ajax: {
                url: ajaxUrl,
                dataType: 'json',
                data: function (params) {
                    var query = {};
                    query[formatField.term] = {like: '%' + params.term + '%'};
                    $.each(input,function(idx,item){
                        item = item + "";
                        if (item.indexOf(",") > 0) {
                            var splited = item.split(",");
                            query[idx] = {'inq': splited};
                        }
                        else {
                            query[idx] = {'eq': item};
                        }
                    });
                    return {filter: JSON.stringify({where: query,limit: 100})};
                },
                headers: {
                    'Authorization':'Bearer ' + getCookie('imap_authen_access_token')
                },
                processResults: function (data) {
                    if (data.error) {
                        //console.log(data);
                        return false;
                    }
                    results = [];
                    $.each(data, function (item_key, item) {
                        results[item_key] = {id: item[formatField.id], text: item[formatField.text]};
                    });
                    console.log(results);
                    // Transforms the top-level key of the response object from 'items' to 'results'
                    return {
                        results: results
                    };
                }
            }
        });
    }
  }
})();
