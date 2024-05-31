@extends('layout.app')
@section('content')
    <form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}" id="invoice_payment_form">
        <div class="form-group">
            <a href="{{route('invoices.index')}}" class="btn btn-primary">Danh sách hóa đơn</a>
            <button class="btn btn-primary ajax-submit-button" type="submit">Thực hiện hoàn tiền</button>
        </div>
        <div class="row tab-pane" id="test_detail">
            <div class="col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Thông tin payment hoàn tiền</h2>
                        <input name="contact_id" type="hidden" placeholder="" class="form-control"
                               value="{{$row->contact_id ?? ''}}">
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content row">
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Tổng tiền hóa đơn</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <input type="text" placeholder="" class="form-control format_price" value="{{$row->total_amt}}" readonly>
                                <input type="hidden" name="invoice_id" placeholder=""  value="{{$invoice_id??''}}" readonly>
                                <input type="hidden" name="type" placeholder=""  value="{{$type??''}}" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Số tiền hoàn</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <input onkeyup="page_invoice_payment_create.changeMoney(this.value)" name="amount" type="text" step="1000" max="{{-$row->debt_amt??''}}" placeholder="" class="form-control format_price" value="{{-$row->debt_amt??''}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Số tiền hoàn tối đa</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <input class="form-control detail_amt format_price" readonly="" value="{{ -$row->debt_amt??'' }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Note</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <textarea name="note" type="text" class="form-control">{{$row->note ?? ''}}</textarea>
                            </div>
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
            var _total_debt = {{$row->debt_amt??0}};
            var _money_input = {{$row->debt_amt??0}};
            var _invoice_id = {{$row->invoice_id??0}}
            var _parent_dom = '#invoice_payment_form';

            return {
                getContact: function(val) {
                    component_crm.getContactDetail({contact_id: val},function(data){
                        $("#invoice_payment_form").find("input[name=fullname]").val(data.first_name + ' ' + data.last_name);
                        $("#invoice_payment_form").find("input[name=address]").val(data.address);
                        $("#invoice_payment_form").find("input[name=phone]").val(data.phone);
                    });
                },
                changeMoney: function(val) {
                    _money_input = parseInt(_total_debt);
                    var remain = _money_input - parseInt(val.moneyUnFormat());
                    $(".debt_amt_remain").val(remain);
                    this.moneyBalance();
                },
                moneyBalance: function() {
                    //console.log($(this).val());
                    $(".balance_remain").each(function(index){
                        if (index == 0) {
                            $(this).val(_money_input);
                        }
                        else {
                            $(this).val(0);
                        }

                        console.log($(this).val());
                    });
                },
                calculator: function(){
                    var selft = this;
                    var dataSerialize = $(_parent_dom).serializeArray();
                    dataSerialize.invoice_id = _invoice_id;
                    helpers.curlpost('{{route('invoices.payment.calculator',[$row->invoice_id])}}',dataSerialize,function(response) {
                        $(_parent_dom).find(".detail_amt").val(response.remain_amt);
                        if (response.detail_amt == 0) {
                            $(_parent_dom).find("input[name=amount]").val(_total_debt);
                        }
                        else {
                            $(_parent_dom).find("input[name=amount]").val(response.remain_amt);
                        }
                    });

                }
            }
        })();
        $(document).ready(function(){
            @if(Request::get('detail_id'))
            page_invoice_payment_create.calculator();
            @endif;
            page_invoice_payment_create.getContact({{$row->contact_id}});
        })
    </script>
@stop
