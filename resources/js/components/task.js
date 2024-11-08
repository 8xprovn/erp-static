module.exports = (function(){
    return {
        getProjectDetail: function(params, callback) {
            var project_id = params.project_id;
            delete(params.project_id);
            helpers.curlgetapi(API_SERVICE_URL_V2 + '/task/projects/' + project_id, params, callback);
        }
    }
})();