module.exports = (function(){
    // var count = 0;
    // var log = function(funcName) {
    //   console.debug(funcName, count);
    // }
    return {
        getAllocationTemplateDetail: function(params, callback) {
            var template_id = params.template_id;
            delete(params.template_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset-allocation-template/' + template_id, params, callback);
        },
        getAssetDetail: function(params, callback) {
            var asset_id = params.asset_id;
            delete(params.asset_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/assets/' + asset_id, params, callback);
        },
    }
})();