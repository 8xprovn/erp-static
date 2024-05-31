module.exports = (function(){
  return {
    getProductDetail: function(params,callback){
        var productId = params.product_id;
        delete(params.product_id);
        helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/inventory/products/' + productId,params,callback);
    },
    getAllInventoryDetail: function(params,callback){
        helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/inventory/inventory-detail',params,callback);
    }
  }
})();
