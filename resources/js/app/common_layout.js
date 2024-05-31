$(document).ready(function () {
    var objMenu = {
        'hr_me': '<div class="col-4">\
                    <a href="/hr/me" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-user-tie text-danger icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2"></div>\
                    </a>\
                </div>',
        'hr': '<div class="col-4">\
                    <a href="/hr" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-users4 text-info icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">HR</div>\
                    </a>\
                </div>',
        'lms': '<div class="col-4">\
                    <a href="/lms" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-book text-primary icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">LMS</div>\
                    </a>\
                </div>',
        'finance': '<div class="col-4">\
                    <a href="/finance" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-cart-add2 text-pink icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Finance</div>\
                    </a>\
                </div>',
        'crm': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/crm" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-bubbles8 text-success icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">CRM</div>\
                    </a>\
                </div>',
        'systems': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/systems" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-cog3 text-danger  icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Systems</div>\
                    </a>\
                </div>',
        'inventory': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/inventory" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-cart5 text-primary icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Quản lý kho</div>\
                    </a>\
                </div>',
        'pm': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/pm" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-task text-pink icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Project manager</div>\
                    </a>\
                </div>',
        'app': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/app" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-android text-info icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">App</div>\
                    </a>\
                </div>',
        'authorization': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/authorization" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-user-check text-success icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Phân quyền</div>\
                    </a>\
                </div>',
        'inner-training': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/inner-training" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-spinner4 text-danger icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Đào tạo nội bộ</div>\
                    </a>\
                </div>',
        'ielts-fighter': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/ielts-fighter" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-graduation text-primary icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">IELTS Fighter</div>\
                    </a>\
                </div>',
        'dinotech': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/dinotech" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-podium text-pink icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Dinotech</div>\
                    </a>\
                </div>',
        'knowledge': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/knowledge" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-question7 text-danger icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">knowledge</div>\
                    </a>\
                </div>',
        'dtms': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/dtms" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-clipboard3 text-success icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">DTMS</div>\
                    </a>\
                </div>',
        'call-center': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/call-center" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-phone-wave text-primary icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Call-center</div>\
                    </a>\
                </div>',
        'notification': '<div class="col-4">\
                    <a href="https://erp.ebomb.edu.vn/notification" class="d-block text-body text-center ripple-dark rounded p-3 load_not_ajax">\
                        <i class="icon-bell3 text-success icon-2x"></i>\
                        <div class="font-size-sm font-weight-semibold text-uppercase mt-2">Notification</div>\
                    </a>\
                </div>',
    }
    
    $.each(objMenu,function(k,v){
        if (k != SERVICE_PATH) {
            $(".dropdown-menu .no-gutters").append(v);
        }
    })
    /////////// FIX DROPDOWN MENU IN DATATABLE//////
    var dropdownMenu;
    $(window).on('shown.bs.dropdown', function(e) {
        // grab the menu 
        if ($(e.target).parents('.datatable-fixed-left').length == 0) {
            return;
        }       
        dropdownMenu = $(e.target).find('.dropdown-menu');
        // detach it and append it to the body
        $('body').append(dropdownMenu.detach());
        // grab the new offset position
        var eOffset = $(e.target).offset();
        // make sure to place it where it would normally go (this could be improved)
        dropdownMenu.css({
            'display': 'block',
            'top': eOffset.top + $(e.target).outerHeight(),
            'left': eOffset.left
        });
    });
    // and when you hide it, reattach the drop down, and hide it normally                                                   
    $(window).on('hide.bs.dropdown', function(e) {
        if ($(e.target).parents('.datatable-fixed-left').length == 0) {
            return;
        }    
        $(e.target).append(dropdownMenu.detach());
        dropdownMenu.hide();
    });
    ///////////////// NOTIFICATION ////////////////
    $('.notification').bind("click",function(){
        var url = "https://erp-gateway.ebomb.edu.vn/v2/hr/me/notifications";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + getCookie('imap_authen_access_token')
            },
            data: {
                'filter[type]': 'app',
                'limit': 10
            },
            success: function(response) {
                if (response){
                    response.forEach(function(item) {
                        var date = moment.unix(item.send_time).format("H:mm DD/MM/YYYY");
                        var mess = '\
                                    <li class="media">\
                                        <div class="media-body">\
                                            <div class="media-title">\
                                                <a class="call_ajax_modal" href="https://erp.ebomb.edu.vn/hr/me/notification/'+item._id+'">\
                                                    <span class="font-weight-semibold">'+item.title+'</span>\
                                                    <span class="text-muted float-right font-size-sm">'+date+'</span>\
                                                </a>\
                                            </div>\
                                            <span class="text-muted">'+item.description+'</span>\
                                        </div>\
                                    </li>';
                        
                        $(".media-list").append(mess);
                    });
                    
                }
            },
            error: function(error) {
                console.log(error);
            },
        });
    });
    ///////////////// NOTIFICATION V1/////////////
    $('.notifications-v2').bind("click",function(){
        var url = "https://erp-gateway.ebomb.edu.vn/v2/notification/me/type/app";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + getCookie('imap_authen_access_token')
            },
            data: {
                'limit': 10
            },
            success: function(response) {
                if (response){
                    response.forEach(function(item) {
                        var date = moment.unix(item.send_time).format("H:mm DD/MM/YYYY");
                        var mess = '\
                                    <li class="media">\
                                        <div class="media-body">\
                                            <div class="media-title">\
                                                <a class="call_ajax_modal" href="https://erp.ebomb.edu.vn/notification/type/app/'+item._id["$oid"]+'">\
                                                    <span class="font-weight-semibold">'+item.title+'</span>\
                                                    <span class="text-muted float-right font-size-sm">'+date+'</span>\
                                                </a>\
                                            </div>\
                                            <span class="text-muted">'+item.description+'</span>\
                                        </div>\
                                    </li>';
                        
                        $(".media-list").append(mess);
                    });
                    
                }
            },
            error: function(error) {
                console.log(error);
            },
        });
    })

})