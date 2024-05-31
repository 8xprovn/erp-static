module.exports = (function(){
    // var count = 0;
    // var log = function(funcName) {
    //   console.debug(funcName, count);
    // }
    return {
        createSaleFile:function(params,callback) {
            helpers.curlpost(API_SERVICE_URL + '/crm/sales/copy_file',params,callback);
        },
        getContacts: function(params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts',params,callback);
        },
        getNotificationTemplate: function(params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/notification-templates',params,callback);
        },
        suggestNotificationTemplate: function(dom,params) {
            helpers.select2AjaxSearch(dom,API_SERVICE_URL_V2 + '/crm/notification-templates',params,{term: 'name', id: 'template_id', text: 'name'});
        },
        getNotificationTemplateDetail: function(params,callback) {
            var template_id = params.template_id;
            delete(params.template_id);
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/notification-templates/' + template_id ,params,callback);
        },
        findContactDetail: function(params,callback) {
            if(typeof(params['email_phone']) != 'undefined') {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params['email_phone'])) 
                {
                    params.email =  params['email_phone'];
                }
                else {
                    params.phone = params['email_phone'];
                }
                delete params['email_phone'];
            }
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts',params,callback);
        },
        findAccountDetail: function(params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/accounts/find',params,callback);
        },
        getContactDetail(params,callback) {
            var contact_id = params.contact_id;
            delete(params.contact_id);
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts/' + contact_id,params,callback);
        },
        getOpportunitiesDetail(params,callback) {
            var opportunity_id = params.opportunity_id;
            delete(params.opportunity_id);
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/opportunities/' + opportunity_id,params,callback);
        },
        getOpportunities(params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/opportunities',params,callback);
        },
        getCalendar:function(params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/calendars',params,callback);
        },
        getContactToSale:function (params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/crm/contacts-to-sales',params,callback);
        },
        select2OpportunitiesFormat: function (data,selected) {
          var selected = selected;
          result = $.map(data, function (x) {
              result =  {
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
        select2CalendarFormat: function (data,selected) {
          var selected = selected;
          result = $.map(data, function (x) {
              result =  {
                  id: x._id,
                  text: x.title
              };
              if (x._id == selected) {
                result.selected = true;
              }
              return result;
          });
          return result;
        },
    }
})();
