@extends('layout.app')
@section('content')
@include('common.content_header')    
<form class="ajax-submit-form" id="form_invoice_create" data-redirect-uri="{{$redirect_uri ?? ''}}" action="{{$action}}" method="{{$method}}"> 
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Tạo hóa đơn</h5>
            <div class="header-elements">
                <button class="btn btn-primary" onclick="page_invoice_create.calculator_invoice()" type="button">Kiểm tra giá</button>
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">
            @if (!empty($invoiceDetail))
            <input type="hidden" name="invoice_id" value="{{$invoiceDetail['_id']}}">
            @endif
            <input type="hidden" name="hmac_token" value="{{$hmacToken ?? ''}}">

            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Khách hàng</label>
                <div class="col-lg-10">
                    @if (!empty($invoiceDetail['contact_id']))
                    <div class="form-control crm-contact" data-id="{{$invoiceDetail['contact_id']}}" data-format="$(contact_id) - $(fullname) - $(phone)">{{$invoiceDetail['contact_id']}}</div>
                    @else
                    <select name="contact_id" data-module="contact" onchange="page_invoice_create.changeContact(this.value)" class="select2_suggest form-control"></select>
                    @endif
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Người thanh toán</label>
                <div class="col-lg-10">
                    @if (!empty($invoiceDetail['payment_contact_id']))
                    <div class="form-control crm-contact" data-id="{{$invoiceDetail['payment_contact_id']}}" data-format="$(contact_id) - $(fullname) - $(phone)">{{$invoiceDetail['payment_contact_id']}}</div>
                    @else
                    <select name="payment_contact_id" onchange="page_invoice_create.changePaymentContact(this.value)" data-module="contact" class="select2_suggest form-control"></select>
                    @endif
                </div>
            </div>
            <div class="form-group row" id="crm_opportunity_data">
                <label class="col-lg-2 col-form-label">Nhân viên được giao</label>
                <div class="col-sm-3 col-xs-12">
                    <input type="text" class="form-control" readonly name="sale_id" autocomplete="off" value="{{$invoiceDetail['sale_id'] ?? ''}}">
                </div>
                <label class="col-lg-2 col-form-label">Mã cơ hội</label>
                <div class="col-sm-3 col-xs-12">
                    <input type="text" class="form-control" readonly autocomplete="off" name="opportunity_id" value="{{$invoiceDetail['opportunity_data']['opportunity_id'] ?? ''}}">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Thương hiệu</label>
                <div class="col-lg-10 brand_select">
                    @if (empty($invoiceDetail))
                        <select placeholder="Chọn thương hiệu" onchange="page_invoice_create.changeBrand(this.value,' +_counter + ');" data-query-status="1" class="form-control select2_suggest" data-module="brand" name="brand_id">
                        <option value=""> === Chọn thương hiệu === </option>
                    </select>
                    @else
                    <div class="form-control em-brand" data-id="{{$invoiceDetail['brand_id']}}">{{$invoiceDetail['brand_id']}}</div>
                    <input type="hidden" name="brand_id" value="{{$invoiceDetail['brand_id']}}">
                    @endif
                </div>
            </div>
            @if(!empty($invoiceProducts))
            <h5 class="mt-4">Khóa học đã mua</h5>
            <div class="form-group">
                <table class="table datatable-fixed-both" width="100%">
                    <thead id="checkbox_all">
                    <tr>
                        <th>
                            Chi nhánh
                        </th>
                        <th>
                            Khóa học
                        </th>
                        <th>
                            Loại
                        </th>
                        <th>
                            Giá
                        </th>
                        <th>
                            Trạng thái
                        </th>
                    </tr>
                    </thead>
                    @foreach ($invoiceProducts as $product)
                    <tr>
                        <td class="branch_follow' +_counter + '">
                            <div class="em-branch" data-id="{{$product['branch_id']}}">{{$product['branch_id']}}</div>
                        </td>
                        <td>
                            <div>{{ $product['relate_name'] }}</div>
                        </td>
                        <td>
                            <div>{{ __('finance.prod.'.$product['relate_table']) }}</div>
                        </td>
                        <td class="format_price">
                            {{$product['total']}}
                        </td>
                        <td>
                            {{__('finance.invoice_status.'.$product['status'])}}
                        </td>
                    </tr>
                    @endforeach
                </table>
            </div>
            @endif
            <p>
                <button class="btn btn-primary btn-sm" onclick="page_invoice_create.pro1_addProduct()" type="button">Thêm khóa học</button>
                <button class="btn btn-primary btn-sm" onclick="page_invoice_create.pro2_addProduct()" type="button">Thêm khóa 1-n</button>
            </p>
            <div class="" id="page_invoice_product_list">
                    <div class="product-lists-1 product-lists" style="display: none;">
                        <h3>{{ __('finance.prod.edu_course') }}</h3>
                        <div class="row product-lists-item-1"></div>
                    </div>
                    <div class="product-lists-2 product-lists" style="display: none;">
                        <h3>{{ __('finance.prod.edu_course_unit') }}</h3>
                        <div class="row product-lists-item-2"></div>
                    </div>

            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ghi chú</label>
                <div class="col-lg-10">
                    <textarea class="form-control" name="note">{{$invoiceDetail['note'] ?? ''}}</textarea>
                </div>
            </div>
            <hr>
            <div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Mã giảm giá: <input type="text" autocomplete="off" name="coupon" value="" class="form-control">
                </div>
            </div>
            <div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Giảm theo chương trình: <input  autocomplete="off" type="text" name="discount_coupon_amt" value="" disabled class="form-control">
                </div>
            </div>
            <div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Giảm khác: <input type="text"  autocomplete="off" onkeyup="page_invoice_create.changeDiscountOther(this)" name="discount_other_amt" value="{{$invoiceDetail['discount_other_amt'] ?? 0}}" class="form-control format_price">
                </div>
            </div>
            <hr>
            <!--<div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Tiền nhận của học viên: <input class="form-control"  type="text" name="payment_amt" value="0">
                </div>
            </div>-->
            <div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Tiền gốc: <input readonly class="form-control format_price" autocomplete="off"  type="text" name="original_amt" value="{{$invoiceDetail['original_amt'] ?? 0}}">
                </div>
            </div>
            <div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Giảm giá: <input readonly class="form-control format_price" autocomplete="off" type="text" name="discount_amt" value="{{$invoiceDetail['discount_amt'] ?? 0}}">
                </div>
            </div>
            <div class="form-group form-inline">
                <label class="col-lg-2 col-form-label"></label>
                <div class="col-lg-10 text-right">
                    Tổng tiền: <input readonly class="form-control format_price" autocomplete="off"  type="text" name="total_amt" value="{{$invoiceDetail['total_amt'] ?? 0}}">
                </div>
            </div>
                      
            
        </div>
    </div>
</div>
</form>
@stop

@push('scripts')
<script type="text/javascript">
    /////// KIEM TRA THONG TIN USER ////////
    var page_invoice_create = (function(){
        'use strict';
        var _discount_coupon = 0;
        var _employee_id = {{\Auth::id()}};
        var _discount_other = 0;
        var _total_org = {{$invoiceDetailoriginal_amt ?? 0}};
        var _parent_dom = "#form_invoice_create";
        var _counter = 0;
        var _brand_id = '{{$invoiceDetail["brand_id"] ?? ''}}';
        var _branch_id = {{$branch_id}};
        var _contact_id = '{{$invoiceDetail['contact_id']?? ''}}';
        var _payment_contact_id = '{{$invoiceDetail['payment_contact_id']?? ''}}';
        var _total_paid = '{{($invoiceDetail['total_amt'] ?? 0)}}';
        return {
            changeContact: function(contact_id) {
                _contact_id = contact_id;
                this.getContactToSale();
            },
            changePaymentContact: function(contact_id) {
                _payment_contact_id = contact_id;
                this.getContactToSale();
            },
            resetPrice: function() {
                $(".calculator_price").val(0);
                $(_parent_dom).find('input[name="original_amt"]').val(0);
                $(_parent_dom).find('input[name="total_amt"]').val(0);
                $(_parent_dom).find('input[name="discount_coupon_amt"]').val(0);
                $(_parent_dom).find('input[name="discount_amt"]').val(0);
            },
            changeBrand: function(brand_id, _counter) {
                _brand_id = brand_id;
                $("#form_invoice_create").find(".product-item-list").remove();
                $("#form_invoice_create").find(".product-lists").hide();
                 
                this.resetPrice();
                // chuyen ma co hoi
                this.getContactToSale();
            },
            getContactToSale: function () {
                $(_parent_dom).find("input[name=sale_id]").val('');
                $(_parent_dom).find("input[name=opportunity_id]").val('');
                if (!_brand_id || !_contact_id) {
                    return false;
                }
                var contactSaleId =  (!_payment_contact_id) ? _contact_id : _payment_contact_id;

                component_crm.getOpportunities({contact_id: contactSaleId, brand_id: _brand_id, is_closed: 0},function(response){
                    $("#crm_opportunity_create_button").remove();
                    if (response.error || Object.keys(response).length <= 0) {

                        show_notify_error({message: 'Không có Opportunity phù hợp'});
                        var url = '{{route('crm.opportunities.create',['contact_id' => 'data-contact-id','brand_id' => 'data-brand-id'])}}';
                        url = url.replace("data-contact-id", contactSaleId);
                        url = url.replace("data-brand-id", _brand_id);
                        $("#crm_opportunity_data").append('<div id="crm_opportunity_create_button" class="col-sm-2"><a class="call_ajax_modal btn btn-warning" href="' + url + '">Tạo Opp mới</a><span style="cursor: pointer; font-size: 20px; " onclick="page_invoice_create.getContactToSale();" class="icon-rotate-ccw3 ml2" aria-hidden="true"></span></div>');
                        return false;
                    }
                    var counter = 0; var sale_id = ''; var opportunity_id = '';
                    $.each(response,function(key, item){
                        if (!item.assigned_employee_id) {
                            return true;
                        }
                        counter ++;
                        sale_id = item.assigned_employee_id;
                        opportunity_id = item.opportunity_id;
                    }) 
                    if (counter > 1) {
                        show_notify_error({message: 'Có quá nhiều Opportunity cho khách hàng hiện tại vui lòng kiểm tra lại thông tin'});
                        return false;
                    }
                    if (counter == 0) {
                        show_notify_error({message: 'Không có Opportunity phù hợp'});
                        return false;
                    }
                    $(_parent_dom).find("input[name=sale_id]").val(sale_id);
                    $(_parent_dom).find("input[name=opportunity_id]").val(opportunity_id);
                });
            },
            //////////////////////// LOP THUONG //////////////////////
            pro1_changeLevel: function (level, idx) {
                var domParent = $("#invoice_production_choose_" + idx);
                this.pro1_loadCourse(level, idx);
            },
            pro1_loadCourse: function(level,idx) {
                var domParent = $("#invoice_production_choose_" + idx);
                this.resetPrice();
                var domSelect = domParent.find('select[name="product[' + idx + '][relate_id]"]');
                domSelect.empty();
                domSelect.loadSuggestData({module: 'course', query: {brand_id: _brand_id, course_level_id: level, status: 'active'}});
                this.pro1_changeCourse(idx);
            },
            // pro1_loadClass: function(idx){
            //     var domParent = $("#invoice_production_choose_" + idx);
            //     var branch_id  = domParent.find('select[name="product[' + idx + '][branch_id]"]').val();
            //     var course_id  = domParent.find('select[name="product[' + idx + '][relate_id]"]').val();
            //     domParent.find('select[name="product[' + idx + '][data][class_id]"]').empty();
            //     if (!branch_id || !course_id) {
            //         return false;
            //     }
            //     var d = new Date($.now());
            //     var lt_end_date = d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
            //     var domSelect = domParent.find('select[name="product[' + idx + '][data][class_id]"]');
            //     component_edu.getClasses({course_id: course_id, branch_id: branch_id, lt_end_date: lt_end_date,  option_customize: {status: {inq: ['opened', 'waiting']}} },function(data){
            //         domSelect.prepend('<option selected=""></option>');
            //         domSelect.select2({
            //             data: component_edu.select2ClassesFormat(data),
            //             placeholder: "Chọn lớp",
            //             allowClear: true
            //         })
            //     });
            // },
            pro1_changeCourse: function(idx) {
                //this.pro1_loadClass(idx);
                this.calculator_invoice(idx);
            },
            pro1_changeBranch: function(idx) {
                //this.pro1_loadClass(idx);
                this.calculator_invoice(idx);
            },
            pro1_addProduct: function() {
                if (!_brand_id) {
                    show_notify_error({'error_description':'Bạn cần chọn thương hiệu trước','error': 'Chưa chọn thương hiệu' });
                    return false;
                }
                _counter ++;
                var _dom_branch = '';
                if (_branch_id > 0) {
                    _dom_branch =  '<option value="'+_branch_id+'">'+_branch_id+'</option>';
                } else {
                    _dom_branch =  '<option value="">Chọn cơ sở</option>';
                }
                var pid = 'invoice_production_choose_' +_counter;
                var html = '<div class="col-lg-3 product-item-list" id="'+ pid + '" data-counter="' +_counter + '">\
                                <div class="border card">\
                                    <div class="card-header  header-elements-sm-inline">\
                                        <h6 class="card-title">Khóa học</h6>\
                                        <div class="header-elements">\
                                            <div class="list-icons">\
                                                <a class="list-icons-item" data-action="remove" href="javascript::void(0)" onclick="delete_current_dom(\'#' + pid + '\');page_invoice_create.calculator_invoice()"></a>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="card-body">\
                                        <div class="form-group">\
                                            <label >Level:</label>\
                                            <select onchange="page_invoice_create.pro1_changeLevel(this.value,' +_counter + ');" data-module="course-level" data-query-brand_id="' + _brand_id  + '" class="select2_suggest form-control-outline form-control" name="product[' +_counter + '][course_level_id]"><option value="">Chọn level khóa học</option></select>\
                                        </div>\
                                        <div class="form-group">\
                                            <label>Chi nhánh:</label>\
                                            <select class="form-control select2_suggest em-branch" data-module="branch" data-query-brand_id="' + _brand_id + '" name="product[' +_counter + '][branch_id]" onchange="page_invoice_create.pro1_changeBranch(' +_counter + ');">'+_dom_branch+'</select>\
                                        </div>\
                                        <div class="form-group">\
                                            <label>Khóa học:</label>\
                                            <input type="hidden" name="product[' +_counter + '][relate_table]" value="edu_course">\
                                            <select onchange="page_invoice_create.pro1_changeCourse(' +_counter + ');" class="form-control" name="product[' +_counter + '][relate_id]"><option value="">Chọn khóa học</option></select>\
                                        </div>\
                                    </div>\
                                    <div class="card-footer">\
                                        <div class="row">\
                                            <label class="col-lg-6">Tổng tiền:</label>\
                                            <div class="col-lg-6 text-center">\
                                                <input readonly class="format_price calculator_price form-control"  type="text" name="product[' +_counter + '][sub_total]" value="">\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';
                $(".product-lists-item-1").append(html);
                $(".product-lists-1").show();
                $('#' + pid).trigger( "MainContentReloaded", [] );
            },
            /////////////////// LOP CUSTOMIZE ////////////////////
            pro2_changeLevel: function (level, idx) {
                var domParent = $("#invoice_production_choose_" + idx);
                this.pro2_loadCourse(level, idx);
            },
            pro2_loadCourse: function(level,idx) {
                var domParent = $("#invoice_production_choose_" + idx);
                this.resetPrice();
                var domSelect = domParent.find('select[name="product[' + idx + '][relate_id]"]');
                domSelect.empty();
                domSelect.loadSuggestData({module: 'course', query: {brand_id: _brand_id, course_level_id: level, status: 'active'}});
                this.pro2_changeCourse('',idx);
            },
            pro2_loadClass: function(idx){
                // var domParent = $("#invoice_production_choose_" + idx);
                // var branch_id  = domParent.find('select[name="product[' + idx + '][branch_id]"]').val();
                // var course_id  = domParent.find('select[name="product[' + idx + '][course_id]"]').val();
                // domParent.find('select[name="product[' + idx + '][data][class_id]"]').empty();
                // if (!branch_id || !course_id) {
                //     return false;
                // }
                // var d = new Date($.now());
                // //var lt_end_date = d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
                // var domSelect = domParent.find('select[name="product[' + idx + '][data][class_id]"]');
                // domSelect.loadSuggestData({module: 'classes', query: {course_id: course_id, branch_id: branch_id, type: 'custom', status: ['opened', 'waiting']}});
            },
            pro2_changeCourse: function(course_id,idx) {

                this.pro2_loadCoursePrice(course_id,idx);
                this.resetPrice();
            },
            pro2_changeBranch: function(idx) {
                //this.pro2_loadClass(idx);
                //this.calculator_invoice(idx);
            },
            pro2_changeQuantity: function(idx) {
                var domParent = $("#invoice_production_choose_" + idx);
                if (!domParent.find('select[name="product[' + idx + '][price_id]"]').val()) {
                    return false;
                }
                this.calculator_invoice(idx);
            },
            pro2_loadCoursePrice: function(course_id,idx) {
                 console.log('test')
                var domParent = $("#invoice_production_choose_" + idx);
                var domSelect = domParent.find('select[name="product[' + idx + '][price_id]"]');

                domSelect.empty();
                if (course_id) {
                    domSelect.loadSuggestData({module: 'course-prices', query: {course_id: course_id,status: 'active',type: 'one'}});
                }
                this.resetPrice();
            },
            pro2_changeCoursePrice: function(idx) {
                //this.pro2_loadClass(idx);
                this.calculator_invoice(idx);
            },
            pro2_addProduct: function() {
                if (!_brand_id) {
                    show_notify_error({'error_description':'Bạn cần chọn thương hiệu trước','error': 'Chưa chọn thương hiệu' });
                    return false;
                }
                _counter ++;
                var _dom_branch = '';
                if (_branch_id > 0) {
                    _dom_branch =  '<option value="'+_branch_id+'">'+_branch_id+'</option>';
                } else {
                    _dom_branch =  '<option value="">Chọn cơ sở</option>';
                }
                var selectHtml = '<select class="form-control" onchange="page_invoice_create.pro2_changeQuantity(' +_counter + ')" class="form-control" name="product[' +_counter + '][quantity]">'
                for(var i = 1; i < 120; i++) {
                    selectHtml += '<option value="'+ i +'">' + i + '</option>';
                }
                selectHtml += '</select>';
                var pid = 'invoice_production_choose_' +_counter;
                var html = '<div class="col-lg-3 product-item-list" id="' + pid +'" data-counter="' +_counter + '">\
                                <div class="border card">\
                                    <div class="card-header  header-elements-sm-inline">\
                                        <h6 class="card-title">Khóa học</h6>\
                                        <div class="header-elements">\
                                            <div class="list-icons">\
                                                <a class="list-icons-item" data-action="remove" href="javascript::void(0)" onclick="delete_current_dom(\'#' + pid + '\');page_invoice_create.calculator_invoice()"></a>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="card-body">\
                                        <div class="form-group">\
                                            <label >Level:</label>\
                                            <select onchange="page_invoice_create.pro2_changeLevel(this.value,' +_counter + ');" data-module="course-level" data-query-brand_id="' + _brand_id  + '" class="select2_suggest form-control" name="product[' +_counter + '][course_level_id]"><option value="">Chọn level khóa học</option></select>\
                                        </div>\
                                        <div class="form-group branch_follow' +_counter + '">\
                                            <label>Chi nhánh:</label>\
                                            <select class="form-control select2_suggest em-branch" data-module="branch" data-query-brand_id="' + _brand_id + '" name="product[' +_counter + '][branch_id]" onchange="page_invoice_create.pro2_changeBranch(' +_counter + ');">'+_dom_branch+'</select>\
                                        </div>\
                                        <div class="form-group course_follow' +_counter + '">\
                                            <label>Khóa học:</label>\
                                            <input type="hidden" name="product[' +_counter + '][relate_table]" value="edu_course_unit"><select onchange="page_invoice_create.pro2_changeCourse(this.value,' +_counter + ');" class="form-control" name="product[' +_counter + '][relate_id]"><option value="">Chọn khóa học</option></select>\
                                        </div>\
                                        <div class="form-group">\
                                            <label>Chọn loại:</label>\
                                            <select class="form-control" name="product[' +_counter + '][price_id]" onchange="page_invoice_create.pro2_changeCoursePrice(' +_counter + ')"><option value="">Chọn loại</option></select>\
                                        </div>\
                                        <div class="form-group">\
                                            <label>Số buổi:</label> ' + selectHtml + '\
                                        </div>\
                                    </div>\
                                    <div class="card-footer">\
                                        <div class="row">\
                                            <label class="col-lg-6">Giá tiền buổi:</label>\
                                            <div class="col-lg-6 text-center">\
                                                <input readonly class="format_price calculator_price form-control"  type="text" name="product[' +_counter + '][sub_total]" value="">\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';
                $(".product-lists-item-2").append(html);
                $(".product-lists-2").show();
                $('#' + pid).trigger( "MainContentReloaded", [] );
            },
            ///////////////////// TINH TIEN ////////////
            changeDiscountOther(amt) {
                var discountAmt = $(_parent_dom).find('input[name="discount_other_amt"]').unmask();
                _discount_other = parseInt(discountAmt);
                this.calculator_local();
            },
            calculator_invoice: function(idx = 0){
                var selft = this;
                var dataSerialize = $(_parent_dom).serializeArray();

                helpers.curlpost('{{route('invoices.calculator')}}',dataSerialize,function(response) {
                    selft.resetPrice();
                    if (response.status == 'error') {

                        return show_notify_error(response);
                    }
                    $("#page_invoice_product_list").find(".product-item-list").each(function() {
                        var counter = parseInt($(this).attr("data-counter"));
                        var domItem = $("#invoice_production_choose_" + counter);
                        var relate_id = parseInt(domItem.find('select[name="product[' + counter + '][relate_id]"]').val());
                        var relate_table = domItem.find('input[name="product[' + counter + '][relate_table]"]').val();
                        if (relate_id <= 0 || typeof response['product'][relate_table][relate_id] == 'undefined') {
                            console.log('error calculator_invoice');
                            return;
                        }
                        var productName = domItem.find('select[name="product[' + counter + '][relate_id]"] option:selected').text();
                        domItem.find('input[name="product[' + counter + '][sub_total]"]').val(response['product'][relate_table][relate_id].price).trigger('pricechange');
                    })
                    _discount_coupon = response.discount_coupon_amt;
                    _total_org = response.original_amt;
                    _total_paid = response.total_amt;
                    $(_parent_dom).find('input[name="original_amt"]').val(response.original_amt).trigger('pricechange');
                    $(_parent_dom).find('input[name="total_amt"]').val(response.total_amt).trigger('pricechange');
                    $(_parent_dom).find('input[name="discount_coupon_amt"]').val(_discount_coupon).trigger('pricechange');
                    $(_parent_dom).find('input[name="discount_amt"]').val(response.discount_amt).trigger('pricechange');
                    //selft.calculator_local();
                });
            },
            // tinh lai cac gia
            calculator_local: function () {
                var total_discount= _discount_other + _discount_coupon;
                var total_amt = parseInt(_total_paid - total_discount);
                $(_parent_dom).find('input[name="discount_amt"]').val(total_discount).trigger('pricechange');
                $(_parent_dom).find('input[name="total_amt"]').val(total_amt).trigger('pricechange');
            }
        }
    })();
</script>
@endpush