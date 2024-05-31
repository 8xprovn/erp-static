module.exports = (function(){
  // var count = 0;
  // var log = function(funcName) {
  //   console.debug(funcName, count);
  // }
  return {
    // calculator: function(params,callback) {
    //     helpers.curlpost('/finance/api/invoices/caculator',params,callback);
    // },
    // paymentUpdateStatus: function(params,callback) {
    //     helpers.curlput('/finance/invoices/' + params.invoice_id + '/payment/' + params.payment_id,params,callback);
    // },
    // paymentCalculator: function (params,callback){
    //     helpers.curlpost('/finance/invoices/' + params.invoice_id + '/payment/calculator',params,callback);
    // },
    // getInvoices: function(params,callback) {
    //     helpers.curlget('/finance/invoice',params,callback);
    // },
    getInvoicesDetail: function(params,callback) {
        var invoice_id = params.invoice_id;
        delete(params.invoice_id);
        helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/finance/invoice/' + invoice_id,params,callback);
    },
    getWallet:function(params,callback) {
        helpers.curlgetapi_v2(API_SERVICE_URL_V2 + '/finance/wallets',params,callback);
    }
  }
})();