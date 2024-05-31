@extends('layout.app')
@section('content')
    <form class="form-horizontal form-label-left ajax-submit-form" data-trigger="finance_payment_created" action="{{$action}}" method="{{$method}}" id="invoice_payment_form">
        <div class="form-group">
            <a href="{{route('invoices.index')}}" class="btn btn-primary">Danh sách hóa đơn</a>
            <button class="btn btn-primary ajax-submit-button" type="submit">Thực hiện hoàn tiền</button>
            <input type="hidden" value="{{$invoiceDetail->invoice_id}}" name="invoice_id">
        </div>
        <div class="row tab-pane" id="test_detail">
            <div class="col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Thông tin hoàn tiền</h2>
                        <input name="contact_id" type="hidden" placeholder="" class="form-control"
                               >
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="form-group">
                                    <label class="control-label col-sm-2 col-xs-12">Tiền đơn hàng</label>
                                    <div class="col-sm-10 col-xs-12 validation_form">
                                        <input type="text" placeholder="" class="form-control format_price" value="{{$invoiceDetail->total_amt}}" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2 col-xs-12">Cần thanh toán</label>
                                    <div class="col-sm-10 col-xs-12 validation_form">
                                        <input type="text" placeholder="" class="form-control format_price"
                                               value="{{$invoiceDetail->debt_amt}}" readonly>
                                    </div>
                                </div>
                                <div class="form-group" style="display: none" id="reason">
                                    <label class="control-label col-sm-2 col-xs-12">Lí do thay đổi người thanh toán</label>
                                    <div class="col-sm-10 col-xs-12 validation_form">
                                        <select name="reason" class="form-control select2_single">
                                            <option value="">Select an option</option>
                                            @foreach(config('data.payment_reason_type') as $reason)
                                                <option value="{{$reason}}">{{$reason}}</option>
                                            @endforeach
                                        </select>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2 col-xs-12">Ngày thanh toán</label>
                                    <div class="col-sm-10 col-xs-12 validation_form">
                                        <input type="text" name="payment_date" class="form-control datepicker" value="{{date('Y-m-d')}}" >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2 col-xs-12">Cơ sở chi tiền</label>
                                    <div class="col-sm-10 col-xs-12 validation_form">
                                        <select name="branch_id"  data-module="branch" class="select2_suggest em-branch form-control">
                                            <option value="{{\Auth::user()->branch_id??'' }}" selected>{{\Auth::user()->branch_id??'' }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2 col-xs-12">Thanh toán</label>
                                    <div class="col-sm-4 col-xs-12 validation_form">
                                        <input name="amount" type="text" placeholder="" class="form-control format_price" value="{{-1 * $invoiceDetail->debt_amt}}">
                                        <div class="deposit_show"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2 col-xs-12">Note</label>
                                    <div class="col-sm-10 col-xs-12 validation_form">
                                        <textarea name="note" type="text" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h2 class="page-header">Phân bổ doanh số</h2>
                            <table class="sale table order-list" id="sales_data">
                                <tr>
                                    <td width="30%">Sale</td>
                                    <td>Số tiền</td>
                                    <td width="40px"></td>
                                </tr>
                                @php
                                    $i = 1;
                                    $isLocked  = ($invoiceDetail->sale_id == \Auth::id()) ? 0 : 1;
                                @endphp
                                @if (!empty($data['sales']))
                                    @foreach($data['sales'] as $sale_id => $amount)
                                        <tr id="sale_{{$i}}">
                                            <td>
                                                <select name="sales[{{$i}}][sale_id]" class="select2_suggest form-control em-profile" data-module="employee" data-query-status="active">
                                                    <option value="{{$sale_id}}">{{$sale_id}}</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="text" {{$isLocked ? 'readonly' : ''}} name="sales[{{$i}}][amount]" value="{{$amount}}" placeholder="" autocomplete="off" class="form-control sale_amount format_price">
                                            </td>
                                            <td></td>
                                        </tr>
                                        @php $i++; @endphp
                                    @endforeach
                                @endif
                            </table>
                            @if (!$isLocked)
                                <button type="button" onclick="javascript:page_invoice_payment_create.addSale();" class="btn btn-sm btn-block btn-success">Thêm</button>
                            @endif
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </form>
    <script type="text/javascript">
        /////// KIEM TRA THONG TIN USER ////////
        var page_invoice_payment_create = (function(){
            'use strict';
            var _total_debt = {{$invoiceDetail->debt_amt??0}};
            var _money_input = {{$invoiceDetail->debt_amt??0}};
            var _invoice_id = {{$invoiceDetail->invoice_id??0}}
            var _parent_dom = '#invoice_payment_form';
            //var _bank_accounts = @ json($bankAccounts);
            var _sale_count = {{count($data['sales'] ?? [])}};
            var _total_amt = 0;

            return {
                changeMoney: function() {
                    var total = 0;
                    $(".money_product_detail").each(function(item){
                        var amt = $(this).val();
                        if (!amt) {
                            amt = 0;
                        }
                        else {
                            amt = parseInt(amt.moneyUnFormat());
                            if (amt < 0) {
                                amt = -1 * amt;
                            }
                        }
                        $(this).val(amt);
                        total += amt;
                    });
                    if (total > _total_debt) {
                        total = _total_debt;
                    }
                    _total_amt = total;
                    $(_parent_dom).find("input[name=amount]").val(total);

                    //var remain = _money_input - parseInt(val.moneyUnFormat());
                    //$(".debt_amt_remain").val(remain);
                    this.checkBalance();
                    this.changeSales();
                },
                // hien thi so du vi khi chon phuong thuoc wallet
                showBalance:function() {
                    var self = this;
                    var method = $(_parent_dom).find("select[name=method]").val();
                    if (method == 'wallet') {
                        var paymentContactId = $(_parent_dom).find("select[name=payment_contact_id]").val();
                        if (!paymentContactId) {
                            show_notify_error({message: 'Bạn cần phải chọn người thanh toán'})
                        }
                        $(_parent_dom).find(".wallet_balance").show();
                        $(_parent_dom).find("input[name=wallet_balance]").val('loading....').show();
                        component_invoice.getWallet({relate_type: 'contact', type: 'user', relate_id: paymentContactId},function(walletDetail){
                            if (walletDetail.length == 0) {
                                var balance = 0;
                            }
                            else {
                                var balance =  walletDetail[0].balance - walletDetail[0].balance_locked
                            }
                            $(_parent_dom).find("input[name=wallet_balance]").val(balance);
                            self.checkBalance();
                        });
                    }else {
                        $(".deposit_show").empty();
                        $(_parent_dom).find(".wallet_balance").hide();
                    }
                },
                checkBalance: function() {
                    var wallet_balance = parseInt($(_parent_dom).find("input[name=wallet_balance]").val().moneyUnFormat());
                    var totalHaveToPay = parseInt($(_parent_dom).find("input[name=amount]").val().moneyUnFormat()) - wallet_balance;
                    var method = $(_parent_dom).find("select[name=method]").val();
                    var paymentContactId = $(_parent_dom).find("select[name=payment_contact_id]").val();
                    if (totalHaveToPay > 0 && method == 'wallet') {
                        $(".deposit_show").html('<a style="margin-top: 10px;" class="btn-primary btn btn-xs call_ajax_modal" href="{{route('wallet_transaction.deposit')}}?relate_id=' + paymentContactId + '&amount=' + totalHaveToPay + '" class="">nạp thêm tiền vào ví</a>');
                    }
                    else {
                        $(".deposit_show").empty();
                    }
                },
                methodChange: function() {
                    var self = this;
                    self.showBalance();
                },
                paymentContactChange: function(id) {
                    var self = this;
                    var payment_contact_id = {{ $invoiceDetail->payment_contact_id}};
                    var contact_id = {{ $invoiceDetail->contact_id}};
                    console.log(payment_contact_id, contact_id,id);
                    if (payment_contact_id != id && contact_id != id) {
                        $('#reason').show();
                        $('#reason').find('input[name="reason"]').focus();
                    } else {
                        $('#reason').hide();
                        $('#reason').find('input[name="reason"]').val('');
                    }

                    self.showBalance();
                },
                calculator: function(){
                    var self = this;
                    var dataSerialize = $(_parent_dom).serializeArray();
                    dataSerialize.invoice_id = _invoice_id;
                    helpers.curlpost('{{route('invoices.payment.calculator',[$invoiceDetail->invoice_id])}}',dataSerialize,function(response) {
                        $(_parent_dom).find(".detail_amt").val(response.remain_amt);
                        if (response.detail_amt == 0) {
                            $(_parent_dom).find("input[name=amount]").val(_total_debt);
                        }
                        else {

                            $(_parent_dom).find("input[name=amount]").val(response.remain_amt);
                        }
                    });

                },
                payAll: function() {
                    var totalDebt = _total_debt;
                    $(".invoice_product_detail").each(function(){
                        var debt = parseInt($(this).find(".debt_order_detail").text().moneyUnFormat());
                        if (totalDebt > debt) {
                            $(this).find('input').val(debt);
                            totalDebt = totalDebt - debt;
                        }
                        else {
                            $(this).find('input').val(totalDebt);
                            totalDebt = 0;
                        }

                    });
                    this.changeMoney();
                },
                resetPayAll: function() {
                    $(".invoice_product_detail").find('input').val(0);
                    this.changeMoney();
                },
                addSale: function() {
                    _sale_count ++;
                    var html = '<tr id="sale_'+_sale_count+'">\
                                    <td><select required name="sales[' + _sale_count + '][sale_id]" class="form-control em-profile select2_suggest" data-module="employee"></select>\
                                    </td>\
                                    <td>\
                                        <input onchange="page_invoice_payment_create.changeSales()" required type="text" name="sales[' + _sale_count + '][amount]" value="0" placeholder="" autocomplete="off" class="form-control sale_amount format_price">\
                                    </td>\
                                    <td>\
                                        <a class="deleteRow" onclick="delete_current_dom(\'#sale_' + _sale_count + '\');page_invoice_payment_create.changeSales();"><input type="button" class="ibtnDel btn btn-md btn-danger " value="Xóa"></a>\
                                    </td>\
                                </tr>';
                    $(_parent_dom).find("#sales_data").append(html);
                    $("#sale_"+_sale_count).Initialize();
                },
                changeSales: function() {
                    ////// detect het cac input khac /////
                    var total_remain = 0;
                    $("#sales_data").find(".sale_amount").each(function(idx) {
                        if ($(this).attr("name") != "sales[1][amount]") {
                            total_remain += parseInt($(this).val().moneyUnFormat());
                        }
                    });
                    $("#sale_1").find("input").val(_total_amt - total_remain);
                }
            }
        })();
    </script>
@stop
