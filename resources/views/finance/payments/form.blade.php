@extends('layout.app')
@section('content')
@include('common.content_header')    
<form class="ajax-submit-form" id="invoice_payment_form" data-redirect-uri="{{$redirect_uri ?? ''}}" action="{{$action}}" method="{{$method}}"> 
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Tạo thanh toán</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-xl-12">
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Tiền đơn hàng</label>
                        <div class="col-lg-10">
                            <input type="text" placeholder="" class="form-control format_price" value="{{$invoiceDetail['total_amt']}}" readonly>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Cần thanh toán</label>
                        <div class="col-lg-10">
                            <input type="text" placeholder="" class="form-control format_price"
                                   value="{{$row['amount'] ?? $invoiceDetail['debt_amt']}}" readonly>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Người thanh toán</label>
                        <div class="col-lg-10">
                            <select name="payment_contact_id" data-module="contact" class="select2_suggest crm-contact form-control" onchange="page_invoice_payment_create.paymentContactChange(this.value)">
                                <option value="{{$row['payment_contact_id'] ?? $invoiceDetail['payment_contact_id']}}" selected>{{$row['payment_contact_id'] ?? $invoiceDetail['payment_contact_id']}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row" style="display: none" id="reason">
                        <label class="col-lg-2 col-form-label">Lí do thay đổi người thanh toán</label>
                        <div class="col-lg-10">
                            <select name="reason" class="form-control select2_single">
                                <option value="">Select an option</option>
                                @foreach(config('data.payment_reason_type') as $reason)
                                    <option value="{{$reason}}">{{$reason}}</option>
                                @endforeach
                            </select>

                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Ngày thanh toán</label>
                        <div class="col-lg-10">
                            <input type="text" name="payment_date" class="form-control datepicker" value="{{$row['payment_date']??date('d/m/Y')}}" autocomplete="off" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Phone</label>
                        <div class="col-lg-10">
                            <input name="phone" type="text" placeholder="" class="form-control" value="{{$contactDetail['phone']??''}}" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Cơ sở thu tiền</label>
                        <div class="col-lg-10">
                            <select name="branch_id"  data-module="branch" class="select2_suggest em-branch form-control">
                                @if(!empty($row['branch_id']) && $row['branch_id'])
                                    <option value="{{ $row['branch_id']??''}}" selected>{{ $row['branch_id']}}</option>
                                @else
                                    <option value="{{\Auth::user()->branch_id??'' }}" selected>{{\Auth::user()->branch_id??'' }}</option>
                                @endif
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Hình thức</label>
                        <div class="col-lg-10">
                            <select name="method" class="form-control select2_single" onchange="page_invoice_payment_create.methodChange()" autocomplete="off">
                                <option value="">Chọn hình thức thanh toán</option>
                                <option {{(!empty($row) && $row['method'] == 'wallet') ? 'selected' : ''}} value="wallet">Ví Imap</option>
                                <option {{(!empty($row) && $row['method'] == 'installment') ? 'selected' : ''}} value="installment">Trả góp</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Thanh toán</label>
                        <div class="col-lg-4">
                            <input readonly name="amount" type="text" placeholder="" class="form-control format_price" value="{{$rowamount ?? 0}}">
                            <div class="deposit_show"></div>
                        </div>
                        <div class="col-lg-6 col-xs-12 wallet_balance" style="display: {{(!empty($row) && $rowmethod == 'wallet') ? 'block' : 'none'}};">
                            <div class="row">
                                <label class="control-label col-sm-4 col-xs-12">Số dư</label>
                                <div class="col-sm-7 col-xs-11">
                                    <input disabled type="text" class="form-control format_price" name="wallet_balance" value="">
                                </div>
                                <div class="col-sm-1 col-xs-1">
                                    <span style="cursor: pointer; line-height: 35px; font-size: 20px; " onclick="page_invoice_payment_create.showBalance();" class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Note</label>
                        <div class="col-lg-10">
                            <textarea name="note" type="text" class="form-control">{{$row['note'] ?? ''}}</textarea>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <table class="table table-striped table-bordered">
                        <thead id="checkbox_all">
                        <tr>
                            <th class="column-title width-40">STT</th>
                            <th>Sản phẩm</th>
                            <th>Số tiền</th>
                            <th>Đã TT</th>
                            <th>Nợ</th>
                            <th>Phân bổ</th>
                        </tr>
                        </thead>
                
                        <tbody id="checkbox_list">
                        <?php 
                        $paymentBalance = $data['balance'] ?? [];
                        $i = 1;foreach($details as $detail) { 
                        ?>
                        <tr class="invoice_product_detail">
                            <td>
                                <?php echo $i; ?>
                            </td>
                            <td>
                                {{$detail['relate_name']??''}}
                            </td>
                            <td class="format_price">
                                {{$detail['total']??''}}
                            </td>
                            <td class="format_price">
                                {{ $detail['total_paid'] ?? 0}}
                            </td>
                            <td class="format_price debt_order_detail">
                                {{$detail['total_debt'] ?? 0}}
                            </td>
                            <td>
                                @if (!empty($detail['total_debt']) &&  $detail['total_debt'] > 0)
                                <input onchange="page_invoice_payment_create.changeMoney()" value="{{$paymentBalance[$detail['_id']] ?? 0}}" type="text" class="form-control format_price money_product_detail" name="invoice_details[{{$detail['_id']}}][amount]">
                                <input value="{{$detail['_id']}}" type="hidden" name="invoice_details[{{$detail['_id']}}][detail_id]">
                                @endif
                            </td>
                        </tr>
                        <?php
                        $i++;
                        } ?>
                        </tbody>
    
                    </table>
                    <div class="mt-2 mb-2">
                        <button onclick="page_invoice_payment_create.payAll()" type="button" class="btn btn-light">Thanh toán hết</button>
                        <button onclick="page_invoice_payment_create.resetPayAll()" type="button" class="btn btn-light">Xóa hết</button>
                    </div>
                    <h5 class="page-header">Phân bổ doanh số</h5>
                    <table class="sale table order-list" id="sales_data">
                        <tr>
                            <td width="40%">Sale</td>
                            <td>Số tiền</td>
                            <td width="40px"></td>
                        </tr>
                    @php 
                    $i = 1; 
                    $isLocked  = ($invoiceDetail['sale_id'] == \Auth::id()) ? 0 : 1; 
                    @endphp
                    
                    @if (empty($row)) 
                        @php
                        $row['sales'][] = ['sale_id' => $invoiceDetail['sale_id'],'amount' => 0];
                        @endphp
                    @endif
                    @foreach($row['sales'] as $sales)
                        <tr id="sale_{{$i}}">
                            <td>
                                <select name="sales[{{$i}}][sale_id]" class="select2_suggest form-control em-profile" data-module="employee">
                                    <option value="{{$sales['sale_id']}}">{{$sales['sale_id']}}</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" {{$isLocked ? 'readonly' : ''}} name="sales[{{$i}}][amount]" value="{{$sales['amount']}}" placeholder="" autocomplete="off" class="form-control sale_amount format_price">
                            </td>
                            <td></td>
                        </tr>
                        @php $i++; @endphp
                    @endforeach
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
@stop
@push('scripts')
<script type="text/javascript">
    /////// KIEM TRA THONG TIN USER ////////
    var page_invoice_payment_create = (function(){
        'use strict';
        var _total_debt = {{$invoiceDetail['debt_amt']??0}};
        var _money_input = {{$invoiceDetail['debt_amt']??0}};
        var _invoice_id = {{$invoiceDetail['invoice_id']??0}}
        var _parent_dom = '#invoice_payment_form';
        //var _bank_accounts = @ json($bankAccounts);
        var _sale_count = {{count($row['sales'] ?? [])}};
        var _total_amt = 0;
       
        return {
            changeMoney: function() {
                var total = 0;
                $(".money_product_detail").each(function(item){
                    var amt = parseInt($(this).unmask());
                    if (!amt) {
                        amt = 0;
                    }
                    else {
                        if (amt < 0) {
                            amt = -1 * amt;
                        }
                        $(this).val(amt).trigger('pricechange');
                    }
                    total += amt;
                });
                if (total > _total_debt) {
                    total = _total_debt;
                }
                _total_amt = total;
                $(_parent_dom).find("input[name=amount]").val(total).trigger('pricechange');
                
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
                    component_invoice.getWallet({filter: {relate_type: 'contact', type: 'user', relate_id: paymentContactId}},function(walletDetail){
                        if (walletDetail.length == 0) {
                            var balance = 0;
                        }
                        else {
                            var balance =  walletDetail[0].balance
                        }
                        $(_parent_dom).find("input[name=wallet_balance]").val(balance).trigger('pricechange');
                        self.checkBalance();
                    });
                }else {
                    $(".deposit_show").empty();
                    $(_parent_dom).find(".wallet_balance").hide();
                }
            },
            checkBalance: function() {
                var wallet_balance = parseInt($(_parent_dom).find("input[name=wallet_balance]").unmask());
                var totalHaveToPay = parseInt($(_parent_dom).find("input[name=amount]").unmask()) - wallet_balance;
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
                var payment_contact_id = {{ $invoiceDetail['payment_contact_id']}};
                var contact_id = {{ $invoiceDetail['contact_id']}};
                //console.log(payment_contact_id, contact_id,id);
                if (payment_contact_id != id && contact_id != id) {
                    $('#reason').show();
                    $('#reason').find('input[name="reason"]').focus();
                } else {
                    $('#reason').hide();
                    $('#reason').find('input[name="reason"]').val('');
                }

                self.showBalance();
            },
            payAll: function() {
                var totalDebt = _total_debt;
                $(".invoice_product_detail").each(function(){
                    var debt = $(this).find(".debt_order_detail").unmask();
                    var inputField = $(this).find('input.format_price');
                    if (totalDebt > debt) {
                        inputField.val(debt).trigger('pricechange');
                        totalDebt = totalDebt - debt;
                    }
                    else {
                        inputField.val(totalDebt).trigger('pricechange');
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
                $(_parent_dom).find("#sales_data").append(html).trigger( "MainContentReloaded", [] );
            },
            changeSales: function() {
                ////// detect het cac input khac /////
                var totalSaleAmount = 0;
                var saleMainAmount = 0;
                $(_parent_dom).find(".sale_amount").each(function(idx,item){
                    console.log(idx,item);
                    if (idx == 0) {
                        return true;
                    }
                    totalSaleAmount += parseInt($(this).unmask());
                });
                
                if (totalSaleAmount > _total_amt) {
                    saleMainAmount = 0;
                }
                else {
                    saleMainAmount = _total_amt - totalSaleAmount;
                }
                $("#sale_1").find("input").val(saleMainAmount).trigger('pricechange');
            }
        }
    })();
</script>
@endpush
