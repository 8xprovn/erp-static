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
        getAllocationDetail: function(params, callback) {
            var allocation_id = params.allocation_id;
            delete(params.allocation_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset-allocation/' + allocation_id, params, callback);
        },
        getAllocationDetailDetail: function(params, callback) {
            var detail_id = params.detail_id;
            delete(params.detail_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset-allocation-detail/' + detail_id, params, callback);
        },
        getAssetDetail: function(params, callback) {
            var asset_id = params.asset_id;
            delete(params.asset_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/assets/' + asset_id, params, callback);
        },
        getAttributeByAsset: function(params, callback) {
            helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/asset/asset_attribute_group', params, callback);
        },
        getAttributeDetail: function(params, callback) {
            var attr_id = params.attr_id;
            delete(params.attr_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/asset/asset_attribute_group/' + attr_id, params, callback);
        },
    }
})();