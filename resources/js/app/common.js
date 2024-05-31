String.prototype.moneyUnFormat = function(n, x) {
    return this.replace(/,/gi,'');
};
const unique = (value, index, self) => {
  return self.indexOf(value) === index
}
////////////////// COOKIES /////////////////
function setCookie(name,value,minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes*24*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
} 
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/////////////// HELPERS ///////////////////////
function delete_current_dom(dom) {
    $(dom).remove();
}
function delete_parent(dom) {
    $(dom).parent().remove();
}
function show_modal_message(message) {
    var html = '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\
      <div class="modal-dialog modal-dialog-centered" role="document">\
        <div class="modal-content">\
          <div class="modal-body">' + message + '</div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
          </div>\
        </div>\
      </div>\
    </div>';
    $(html).modal({backdrop: 'static'});
}
$(document).ready(function(){
    $(".call_center_click_2_call").on("click",function(){
        var data = $(this).data();
        var strQuery = $.param(data);
        //document.getElementById("callCenterIframe").contentWindow.postMessage('audio','',phone);
        var url = SITE_URL + '/call-center/softphone/create?' + strQuery;
        var html = '<div class="modal" id="callcenterpopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
            <div class="modal-dialog" style="width: 95%; height: 98%; max-width: inherit; max-height: inherit;" role="document">\
                <div class="modal-content" style="height: 100%">\
                    <div class="modal-body" style="height: 100%">\
                        <iframe src="' + url +'" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>\
                    </div>\
                </div>\
            </div>\
        </div>';
        $(html).modal('show');
    });
})
var progress_loading = (function () {
    return {
        show: function (dom) {
            if (!dom) {
                dom = "body";
            }
            var html = '<div class="card-overlay" id="progress_loading">\
                <div class="spinner-grow text-primary" role="status">\
                <span class="sr-only">Loading...</span>\
                </div>\
                <div class="spinner-grow text-secondary" role="status">\
                <span class="sr-only">Loading...</span>\
                </div>\
                <div class="spinner-grow text-success" role="status">\
                <span class="sr-only">Loading...</span>\
                </div>\
                <div class="spinner-grow text-danger" role="status">\
                <span class="sr-only">Loading...</span>\
                </div>\
                <div class="spinner-grow text-warning" role="status">\
                <span class="sr-only">Loading...</span>\
                </div></div>';
            $(dom).append(html);
        },
        hide: function () {
            $("#progress_loading").remove();
        },

    };
})();
//////// BACK RELOAD PAGE //////////
$(window).on('popstate', function (e) {
    var state = e.originalEvent.state;
   
    if (state !== null) {
        var url = window.location.href;
        location.reload(); 
    }
});
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
function goBack() {
    window.history.back();
}

function redirect(url) {
    window.location.href = url;
}
function redirectAjaxUrl(url) {     
    $.ajax({
        url: url,
        headers: {"view": "ajax"},
        beforeSend:function () {
            // progress_loading.show();
        },
        success: function (data) {
            history.pushState({}, '', url);
            $(".content-wrapper").remove();
            $(".sidebar-secondary").remove();
            $(".sidebar-right").remove();
            $(".page-content").append(data);
            progress_loading.hide();
            ///////// push event //////
            $(".page-content").trigger( "MainContentReloaded", [] );
        }
        
    });
}
function formatReplace(tpl, data) {
    return tpl.replace(/\$\(([^\)]+)?\)/g, function($1, $2) {
        if ($2.indexOf('.') > 0)
        {
          var result = data;
          var res = $2.split(".");
          for(var i = 0; i < res.length; i++) {
            if(typeof result[res[i]] === "undefined"){
              return '';
            }
            result = result[res[i]];
          }
          return result
        }
        if (!data[$2] || data[$2] == 'null') {
            return '';
        }
        if (data[$2] > 1000000000 && data[$2].toString().indexOf("+") < 0 && $2 != "_id") {
            return moment(data[$2]*1000).format("DD/MM/YYYY HH:mm");
        }
        return data[$2]; 
    });
}
function show_notify_error(option) {
    
    if (option !== undefined && option !== null && option.constructor != Object) {
        try {
            option = JSON.parse( option );
        } catch (e) {
            console.log(e)
            option = {};
        }
    }
    if(option && typeof(option.error) != 'undefined') {
        option.title = option.error;
        option.message = option.error_description;
    }
    var option = option || {};
    new PNotify({
        title: option.title || 'Error',
        text: option.message || 'Lỗi hệ thống, vui lòng liên hệ với system để được hỗ trợ',
        type: option.type || 'error',
        styling: 'bootstrap3',
        delay: option.time || 3000,
        mouse_reset: false,
    });
}
function inputCheckAll(item,classItem) {
    if (item.checked == true) {
        $(classItem).prop('checked',true); 
    }
    else {
        $(classItem).prop('checked',false);
    }
}
function stringToSlug(str) {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
      to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i=0, l=from.length ; i < l ; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

  return str;
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePhone(input_str) {
    var re = /^([0+]{1})([1-9]{1})[0-9]*$/;
    return re.test(input_str);
}