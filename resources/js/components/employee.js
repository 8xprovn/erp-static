module.exports = (function(){
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getProfiles: function (params,callback){
      helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/hr/employees',params,callback);
      // helpers.curlget(API_SERVICE_URL + '/hr/employees',params,callback);
    },
    getNotificationTemplate: function(params,callback) {
        helpers.curlgetapi(API_SERVICE_URL + '/hr/notification-templates',params,callback);
    },
    getMe: function() {
      helpers.curlgetapi(API_SERVICE_URL + '/hr/employees/me',params,callback);
    },
    select2NotificationTemplateFormat: function (data,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
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
    select2ProfileFormat: function (data,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
              id: x.employee_id,
              text: x.first_name + ' ' + x.last_name + ' ('+ x.email +')'
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
  }
})();