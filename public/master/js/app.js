/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

//require('./bootstrap');
helpers = __webpack_require__(/*! ./components/helpers.js */ "./resources/js/components/helpers.js");
component_invoice = __webpack_require__(/*! ./components/invoice.js */ "./resources/js/components/invoice.js");
component_crm = __webpack_require__(/*! ./components/crm.js */ "./resources/js/components/crm.js");
component_edu = __webpack_require__(/*! ./components/edu.js */ "./resources/js/components/edu.js");
component_block = __webpack_require__(/*! ./components/block.js */ "./resources/js/components/block.js");
component_org = __webpack_require__(/*! ./components/org.js */ "./resources/js/components/org.js");
component_pm = __webpack_require__(/*! ./components/pm.js */ "./resources/js/components/pm.js");
component_employee = __webpack_require__(/*! ./components/employee.js */ "./resources/js/components/employee.js");
component_inventory = __webpack_require__(/*! ./components/inventory.js */ "./resources/js/components/inventory.js");
component_notification = __webpack_require__(/*! ./components/notification.js */ "./resources/js/components/notification.js");
component_callback = __webpack_require__(/*! ./components/callcenter.js */ "./resources/js/components/callcenter.js");
component_assets = __webpack_require__(/*! ./components/asset.js */ "./resources/js/components/asset.js");
component_task = __webpack_require__(/*! ./components/task.js */ "./resources/js/components/task.js");

/***/ }),

/***/ "./resources/js/components/asset.js":
/*!******************************************!*\
  !*** ./resources/js/components/asset.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getAllocationTemplateDetail: function getAllocationTemplateDetail(params, callback) {
      var template_id = params.template_id;
      delete params.template_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset-allocation-template/' + template_id, params, callback);
    },
    getAllocationDetail: function getAllocationDetail(params, callback) {
      var allocation_id = params.allocation_id;
      delete params.allocation_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset-allocation/' + allocation_id, params, callback);
    },
    getAllocationDetailDetail: function getAllocationDetailDetail(params, callback) {
      var detail_id = params.detail_id;
      delete params.detail_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset-allocation-detail/' + detail_id, params, callback);
    },
    getAssetDetail: function getAssetDetail(params, callback) {
      var asset_id = params.asset_id;
      delete params.asset_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/assets/' + asset_id, params, callback);
    },
    getAttributeByAsset: function getAttributeByAsset(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/asset/asset_attribute_group', params, callback);
    },
    getAttributeDetail: function getAttributeDetail(params, callback) {
      var attr_id = params.attr_id;
      delete params.attr_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset_attribute_group/' + attr_id, params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/block.js":
/*!******************************************!*\
  !*** ./resources/js/components/block.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    renderDocumentsLists: function renderDocumentsLists(params, callback) {
      helpers.curlget('/document', params, callback);
    },
    renderActivitiesLists: function renderActivitiesLists(params, callback) {
      helpers.curlget('/crm/activities', params, callback);
    },
    renderStudentActivitiesLists: function renderStudentActivitiesLists(params, callback) {
      helpers.curlget('/lms/edu/student/all/filter', params, callback);
    },
    renderOpportunitiesLists: function renderOpportunitiesLists(params, callback) {
      helpers.curlget('/crm/opportunities/role/admin', params, callback);
    },
    renderContactMeeting: function renderContactMeeting(params, callback) {
      helpers.curlget('/crm/meeting/contact', params, callback);
    },
    renderNotesLists: function renderNotesLists(params, callback) {
      helpers.curlget('/support/notes', params, callback);
    },
    renderTasksLists: function renderTasksLists(params, callback) {
      helpers.curlget('/pm/task/all/filter', params, callback);
    },
    renderEmployeeLists: function renderEmployeeLists(params, callback) {
      helpers.curlget('/employee', params, callback);
    },
    renderInvoiceLists: function renderInvoiceLists(params, callback) {
      helpers.curlget('/finance/invoices/role/admin', params, callback);
    },
    renderInvoicePaymentLists: function renderInvoicePaymentLists(params, callback) {
      helpers.curlget('/finance/invoices/' + params.invoice_id + '/payment', params, callback);
    },
    renderContactInCalendar: function renderContactInCalendar(params, callback) {
      helpers.curlget('/crm/calendar/contact', params, callback);
    },
    renderCalendar: function renderCalendar(params, callback) {
      helpers.curlget('/crm/calendar', params, callback);
    },
    renderNotify: function renderNotify(params, callback) {
      helpers.curlget('/crm/type/sms/notification', params, callback);
    },
    renderMeeting: function renderMeeting(params, callback) {
      helpers.curlget('/crm/meeting', params, callback);
    },
    renderTicketFollower: function renderTicketFollower(params, callback) {
      // helpers.curlget('/ticket/' + params.ticket_id + '/employees',params,callback);
      helpers.curlget('/pm/ticket/' + params.ticket_id + '/employees', params, callback);
    },
    renderSurvey: function renderSurvey(params, callback) {
      helpers.curlget('/pm/survey', params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/callcenter.js":
/*!***********************************************!*\
  !*** ./resources/js/components/callcenter.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getTicketTopicDetail: function getTicketTopicDetail(params, callback) {
      var topic_id = params.topic_id;
      delete params.topic_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/call-center/ticket-topics/' + topic_id, params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/crm.js":
/*!****************************************!*\
  !*** ./resources/js/components/crm.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    createSaleFile: function createSaleFile(params, callback) {
      helpers.curlpost(API_SERVICE_URL + '/crm/sales/copy_file', params, callback);
    },
    getContacts: function getContacts(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts', params, callback);
    },
    getNotificationTemplate: function getNotificationTemplate(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/notification-templates', params, callback);
    },
    suggestNotificationTemplate: function suggestNotificationTemplate(dom, params) {
      helpers.select2AjaxSearch(dom, API_SERVICE_URL_V2 + '/crm/notification-templates', params, {
        term: 'name',
        id: 'template_id',
        text: 'name'
      });
    },
    getNotificationTemplateDetail: function getNotificationTemplateDetail(params, callback) {
      var template_id = params.template_id;
      delete params.template_id;
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/notification-templates/' + template_id, params, callback);
    },
    findContactDetail: function findContactDetail(params, callback) {
      if (typeof params['email_phone'] != 'undefined') {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params['email_phone'])) {
          params.email = params['email_phone'];
        } else {
          params.phone = params['email_phone'];
        }
        delete params['email_phone'];
      }
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts', params, callback);
    },
    findAccountDetail: function findAccountDetail(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/accounts/find', params, callback);
    },
    getContactDetail: function getContactDetail(params, callback) {
      var contact_id = params.contact_id;
      delete params.contact_id;
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts/' + contact_id, params, callback);
    },
    getOpportunitiesDetail: function getOpportunitiesDetail(params, callback) {
      var opportunity_id = params.opportunity_id;
      delete params.opportunity_id;
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/opportunities/' + opportunity_id, params, callback);
    },
    getOpportunities: function getOpportunities(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/opportunities', params, callback);
    },
    getCalendar: function getCalendar(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/calendars', params, callback);
    },
    getContactToSale: function getContactToSale(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts-to-sales', params, callback);
    },
    select2OpportunitiesFormat: function select2OpportunitiesFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.opportunity_id,
          text: '[' + x.opportunity_id + '] ' + x.first_name + ' ' + x.last_name + ' [Sale: ' + x.assigned_employee_id + ']'
        };
        if (x.class_id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
    },
    select2NotificationTemplateFormat: function select2NotificationTemplateFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.template_id,
          text: x.name
        };
        if (x.template_id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
      // if (callback && typeof(callback) === "function") {
      //     callback(response);
      // }
    },

    select2CalendarFormat: function select2CalendarFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x._id,
          text: x.title
        };
        if (x._id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/edu.js":
/*!****************************************!*\
  !*** ./resources/js/components/edu.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getCoursesByContact: function getCoursesByContact(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/contacts/' + params.contact_id + '/classes', params, callback);
    },
    getDuplicateTeacherSchedule: function getDuplicateTeacherSchedule(params, callback) {
      helpers.curlgetapi('employee/check_available_teachers', params, callback);
    },
    getCalendar: function getCalendar(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/calendar', params, callback);
    },
    getCoursesLevel: function getCoursesLevel() {
      helpers.curlgetapi(API_SERVICE_URL + '/course-levels', params, callback);
    },
    getMeeting: function getMeeting(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/meeting', params, callback);
    },
    getContactByCalendar: function getContactByCalendar(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/calendar/' + params.calendar_id + '/contacts', params, callback);
    },
    select2ClassesFormat: function select2ClassesFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.class_id,
          text: x.name + '(' + x.start_date + ')'
        };
        if (x.class_id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
    },
    select2CoursesFormat: function select2CoursesFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.course_id,
          text: x.name
        };
        if (x.course_id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
    },
    getClassSchedules: function getClassSchedules(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/edu/class-schedules', params, callback);
    },
    select2ScheduleFormat: function select2ScheduleFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.schedule_number,
          text: x.lesson_name + '(Buổi' + x.schedule_number + ') (Ngày ' + x.date + ')'
        };
        if (x.schedule_number == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
    },
    getStudentsByClass: function getStudentsByClass(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/edu/classes/' + params.class_id + '/students', params, callback);
    },
    getStudents: function getStudents(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/lms/students', params, callback);
    },
    getCourses: function getCourses(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/lms/courses/', params, callback);
    },
    getClasses: function getClasses(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/lms/classes', params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/employee.js":
/*!*********************************************!*\
  !*** ./resources/js/components/employee.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getProfiles: function getProfiles(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/hr/employees', params, callback);
      // helpers.curlget(API_SERVICE_URL + '/hr/employees',params,callback);
    },

    getNotificationTemplate: function getNotificationTemplate(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL + '/hr/notification-templates', params, callback);
    },
    getMe: function getMe() {
      helpers.curlgetapi(API_SERVICE_URL + '/hr/employees/me', params, callback);
    },
    select2NotificationTemplateFormat: function select2NotificationTemplateFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.template_id,
          text: x.name
        };
        if (x.template_id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
      // if (callback && typeof(callback) === "function") {
      //     callback(response);
      // }
    },

    select2ProfileFormat: function select2ProfileFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x.employee_id,
          text: x.first_name + ' ' + x.last_name + ' (' + x.email + ')'
        };
        if (x.employee_id == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
      // if (callback && typeof(callback) === "function") {
      //     callback(response);
      // }
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/helpers.js":
/*!********************************************!*\
  !*** ./resources/js/components/helpers.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    select2Data: function select2Data(data, id, format, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
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
    curlpost: function curlpost(url, params, callback) {
      this._curl(url, params, callback, 'POST');
    },
    curlget: function curlget(url, params, callback) {
      this._curl(url, params, callback, 'GET');
    },
    curlgetapi: function curlgetapi(url, params, callback) {
      this._curl_api(url, params, callback, 'GET');
    },
    curlput: function curlput(url, params, callback) {
      this._curl(url, params, callback, 'PUT');
    },
    curldelete: function curldelete(url, params, callback) {
      this._curl(url, params, callback, 'DELETE');
    },
    curlgetapi_v2: function curlgetapi_v2(url, params, callback, method) {
      $.ajax({
        url: url,
        type: method || 'GET',
        data: params,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
          'Authorization': 'Bearer ' + getCookie('imap_authen_access_token')
        },
        success: function success(response) {
          if (response.error) {
            show_notify_error(response);
            return false;
          }
          if (callback && typeof callback === "function") {
            callback(response);
          }
        },
        error: function error(e) {
          show_notify_error(e.responseText);
        }
      });
    },
    _curl_api: function _curl_api(url, params, callback, method) {
      var objParams = {};
      if (params) {
        $.each(params, function (qkey, qvalue) {
          /////// NEU LA MANG THI WHERE IN

          switch (qkey) {
            case 'from_date':
              objParams[qkey] = {
                'gte': qvalue
              };
              break;
            case 'to_date':
              objParams[qkey] = {
                'lte': qvalue
              };
              break;
            case 'option_customize':
              Object.assign(objParams, qvalue);
              break;
            default:
              if ($.isArray(qvalue)) {
                objParams[qkey] = {
                  'inq': qvalue
                };
              } else {
                objParams[qkey] = {
                  'eq': qvalue
                };
              }
              break;
          }
        });
      }
      $.ajax({
        url: url,
        type: method || 'GET',
        data: $.isEmptyObject(objParams) ? '' : {
          filter: JSON.stringify({
            "where": objParams,
            limit: 100
          })
        },
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
          'Authorization': 'Bearer ' + getCookie('imap_authen_access_token')
        },
        success: function success(response) {
          if (response.error) {
            show_notify_error(response);
            return false;
          }
          if (callback && typeof callback === "function") {
            callback(response);
          }
        },
        error: function error(e) {
          show_notify_error(e.responseText);
        }
      });
    },
    _curl: function _curl(url, params, callback, method) {
      $.ajax({
        url: url,
        type: method || 'GET',
        data: params,
        headers: {
          //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
          //'Authorization':'Bearer ' + getCookie('imap_authen_access_token')
        },
        success: function success(response) {
          if (response.error) {
            show_notify_error(response);
            return false;
          }
          if (callback && typeof callback === "function") {
            callback(response);
          }
        },
        error: function error(e) {
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
          buttons: [{
            text: 'Yes',
            addClass: 'btn btn-sm btn-primary'
          }, {
            addClass: 'btn btn-sm btn-link'
          }]
        },
        buttons: {
          closer: false,
          sticker: false
        }
      });

      // On confirm
      notice.get().on('pnotify.confirm', function () {
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
      });

      // On cancel
      notice.get().on('pnotify.cancel', function () {
        self.show();
      });
    },
    deleteBatch: function deleteBatch(url, params, callback) {
      var self = this;
      $.confirm({
        title: 'Confirm!',
        content: 'Bạn có chắc muốn xóa không',
        closeIcon: true,
        keyboardEnabled: true,
        backgroundDismiss: true,
        cancelButton: "Cancel",
        confirmButtonClass: 'btn-danger',
        confirm: function confirm() {
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
        }
      });
    },
    uploadFile: function uploadFile(params, callback) {
      var inputFileAudioElement = document.querySelector(params.dom);
      if (inputFileAudioElement !== null) {
        var files = [];
        pond = FilePond.create(inputFileAudioElement, {
          maxFiles: 10,
          server: {
            url: '',
            process: {
              url: window.API_SERVICE_URL + '/uploads/storage/put/tmp',
              method: 'POST',
              withCredentials: false,
              headers: {},
              timeout: 30000,
              onload: function onload(res) {
                res = JSON.parse(res);
                if (res.error) {
                  alert(res.error_description);
                  pond.removeFile();
                } else {
                  $(params.dom).val(res.path);
                  if (callback && typeof callback === "function") {
                    callback(res);
                  }
                  return res.path;
                }
              },
              onerror: function onerror(response) {
                try {
                  response = JSON.parse(response);
                  if (response['status'] === 'error') {
                    alert('Lỗi Upload: ' + response['message']);
                  }
                } catch (e) {
                  alert('Lỗi Upload: ' + response);
                }
              },
              ondata: function ondata(formData) {
                formData.append('channel', params.channel);
                return formData;
              }
            },
            // revert: 'https://staging.api.f6.com.vn/uploads/process/revert',
            restore: null,
            load: 'https://imapcdn.sgp1.digitaloceanspaces.com/staging/uploads/',
            fetch: null
          },
          files: files
        });
        pond.on('removefile', function (error, file) {
          $(params.dom).val("");
        });
      }
    },
    select2AjaxSearch: function select2AjaxSearch(dom, ajaxUrl, input, formatField) {
      $(dom).select2({
        minimumInputLength: 2,
        allowClear: true,
        ajax: {
          url: ajaxUrl,
          dataType: 'json',
          data: function data(params) {
            var query = {};
            query[formatField.term] = {
              like: '%' + params.term + '%'
            };
            $.each(input, function (idx, item) {
              item = item + "";
              if (item.indexOf(",") > 0) {
                var splited = item.split(",");
                query[idx] = {
                  'inq': splited
                };
              } else {
                query[idx] = {
                  'eq': item
                };
              }
            });
            return {
              filter: JSON.stringify({
                where: query,
                limit: 100
              })
            };
          },
          headers: {
            'Authorization': 'Bearer ' + getCookie('imap_authen_access_token')
          },
          processResults: function processResults(data) {
            if (data.error) {
              //console.log(data);
              return false;
            }
            results = [];
            $.each(data, function (item_key, item) {
              results[item_key] = {
                id: item[formatField.id],
                text: item[formatField.text]
              };
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
  };
}();

/***/ }),

/***/ "./resources/js/components/inventory.js":
/*!**********************************************!*\
  !*** ./resources/js/components/inventory.js ***!
  \**********************************************/
/***/ ((module) => {

module.exports = function () {
  return {
    getProductDetail: function getProductDetail(params, callback) {
      var productId = params.product_id;
      delete params.product_id;
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/inventory/products/' + productId, params, callback);
    },
    getAllInventoryDetail: function getAllInventoryDetail(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/inventory/inventory-detail', params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/invoice.js":
/*!********************************************!*\
  !*** ./resources/js/components/invoice.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    // calculator: function(params,callback) {
    //     helpers.curlpost('/finance/api/invoices/caculator',params,callback);
    // },
    // paymentUpdateStatus: function(params,callback) {
    //     helpers.curlput('/finance/invoices/' + params.invoice_id + '/payment/' + params.payment_id,params,callback);
    // },
    // paymentCalculator: function (params,callback){
    //     helpers.curlpost('/finance/invoices/' + params.invoice_id + '/payment/calculator',params,callback);
    // },
    // getInvoices: function(params,callback) {
    //     helpers.curlget('/finance/invoice',params,callback);
    // },
    getInvoicesDetail: function getInvoicesDetail(params, callback) {
      var invoice_id = params.invoice_id;
      delete params.invoice_id;
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/finance/invoice/' + invoice_id, params, callback);
    },
    getWallet: function getWallet(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/finance/wallets', params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/notification.js":
/*!*************************************************!*\
  !*** ./resources/js/components/notification.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getTemplate: function getTemplate(params, callback) {
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/notification/template', params, callback);
    },
    getTemplateDetail: function getTemplateDetail(params, callback) {
      var template_id = params.template_id;
      delete params.template_id;
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/notification/template/' + template_id, params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/org.js":
/*!****************************************!*\
  !*** ./resources/js/components/org.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getBranchDetail: function getBranchDetail(params, callback) {
      var branch_id = params.branch_id;
      delete params.branch_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/branch/' + branch_id, params, callback);
    },
    getBranchs: function getBranchs(params, callback) {
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/branch', params, callback);
    },
    getBranchsByBrands: function getBranchsByBrands(params, callback) {
      var brand_id = params.brand_id;
      delete params.brand_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/brand/' + brand_id + '/branch', params, callback);
    },
    getBrandsByBranch: function getBrandsByBranch(params, callback) {
      var branch_id = params.branch_id;
      delete params.branch_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/branch/' + branch_id + '/brand', params, callback);
    },
    select2BranchsFormat: function select2BranchsFormat(data, selected) {
      var selected = selected;
      result = $.map(data, function (x) {
        result = {
          id: x._id,
          text: x.name
        };
        if (x == selected) {
          result.selected = true;
        }
        return result;
      });
      return result;
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/pm.js":
/*!***************************************!*\
  !*** ./resources/js/components/pm.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = function () {
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getTicketTopicDetail: function getTicketTopicDetail(params, callback) {
      var topic_id = params.topic_id;
      delete params.topic_id;
      helpers.curlgetapi(API_SERVICE_URL + '/pm/ticket-topics/' + topic_id, params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/js/components/task.js":
/*!*****************************************!*\
  !*** ./resources/js/components/task.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = function () {
  return {
    getProjectDetail: function getProjectDetail(params, callback) {
      var project_id = params.project_id;
      delete params.project_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/task/projects/' + project_id, params, callback);
    },
    getUnitDetail: function getUnitDetail(params, callback) {
      var unit_id = params.unit_id;
      delete params.unit_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/task/units/' + unit_id, params, callback);
    }
  };
}();

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/master/js/app": 0,
/******/ 			"public/master/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/master/css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/master/css/app"], () => (__webpack_require__("./resources/sass/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;