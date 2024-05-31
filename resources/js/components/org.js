module.exports = (function(){
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    getBranchDetail: function(params,callback) {
      var branch_id = params.branch_id;
      delete params.branch_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/branch/' + branch_id ,params,callback);
    },
    getBranchs: function(params,callback) {
        helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/branch' ,params,callback);
    },
    getBranchsByBrands: function(params,callback) {
        var brand_id = params.brand_id;
        delete params.brand_id;
        helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/brand/' + brand_id + '/branch' ,params,callback);
    },
    getBrandsByBranch: function(params,callback){
      var branch_id = params.branch_id;
      delete params.branch_id;
      helpers.curlgetapi(API_SERVICE_URL_V2 + '/org/branch/' + branch_id + '/brand' ,params,callback);
    },
    select2BranchsFormat: function (data,selected) {
      var selected = selected;
      result = $.map(data, function (x) {
          result =  {
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
  }
})();


