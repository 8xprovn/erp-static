module.exports = (function(){
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    renderDocumentsLists: function(params,callback) {
      helpers.curlget('/document',params,callback);
    },
    renderActivitiesLists: function(params,callback) {
      helpers.curlget('/crm/activities',params,callback);
    },
    renderStudentActivitiesLists: function(params,callback) {
      helpers.curlget('/lms/edu/student/all/filter',params,callback);
    },
    renderOpportunitiesLists: function(params,callback) {
      helpers.curlget('/crm/opportunities/role/admin',params,callback);
    },
      renderContactMeeting: function(params,callback) {
      helpers.curlget('/crm/meeting/contact',params,callback);
    },
    renderNotesLists: function(params,callback) {
    	helpers.curlget('/support/notes',params,callback);
    },
    renderTasksLists: function (params,callback) {
    	helpers.curlget('/pm/task/all/filter',params,callback);
    },
    renderEmployeeLists: function (params,callback) {
      helpers.curlget('/employee',params,callback);
    },
    renderInvoiceLists: function (params,callback) {
      helpers.curlget('/finance/invoices/role/admin',params,callback);
    },
    renderInvoicePaymentLists: function(params,callback){
      helpers.curlget('/finance/invoices/' + params.invoice_id + '/payment',params,callback);
    },
    renderContactInCalendar: function(params,callback){
      helpers.curlget('/crm/calendar/contact',params,callback);
    },
    renderCalendar: function(params,callback){
      helpers.curlget('/crm/calendar',params,callback);
    },
      renderNotify: function(params,callback){
      helpers.curlget('/crm/type/sms/notification',params,callback);
    },
    renderMeeting: function(params,callback) {
      helpers.curlget('/crm/meeting',params,callback);
    },
    renderTicketFollower: function(params,callback) {
      // helpers.curlget('/ticket/' + params.ticket_id + '/employees',params,callback);
      helpers.curlget('/pm/ticket/' + params.ticket_id + '/employees',params, callback);
    },
    renderSurvey: function(params,callback) {
      helpers.curlget('/pm/survey',params, callback);
    }
  }
})();
