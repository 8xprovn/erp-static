module.exports = (function(){
    // var count = 0;
    // var log = function(funcName) {
    //   console.debug(funcName, count);
    // }
    return {
        getTemplate: function(params,callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/notification/template',params,callback);
        },
        getTemplateDetail: function(params,callback) {
            var template_id = params.template_id;
            delete(params.template_id);
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/notification/template/' + template_id ,params,callback);
        },
    }
})();
