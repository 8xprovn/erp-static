module.exports = (function(){
    // var count = 0;
    // var log = function(funcName) {
    //   console.debug(funcName, count);
    // }
    return {
        getTicketTopicDetail: function(params,callback) {
            var topic_id = params.topic_id;
            delete(params.topic_id);
            helpers.curlgetapi(API_SERVICE_URL + '/pm/ticket-topics/' + topic_id ,params,callback);
        },
    }
})();