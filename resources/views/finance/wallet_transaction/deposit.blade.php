@extends('layout.app')
@section('content')
@include('common.content_header')    
<form id="finance_wallet_deposit" class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}" data-trigger="wallet_deposited" data-redirect-uri="{{$redirect_uri}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">{{$action == route('wallet_transaction.deposit') ? 'Nạp tiền' : 'Rút tiền'}}</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Phương thức</label>
                <div class="col-lg-10">
                    <select class="form-control" name="method" onchange="page_wallet_transaction_deposite.changePaymentMethod()">
                        <?php foreach (config('data.wallet_transaction_method') as $value): ?>
                        <option value="{{$value}}" <?php echo !empty($input['method']) && $input['method'] == $value ? 'selected' : ''?>>{{ __('finance.payment_method.'.$value) }}</option>
                        <?php endforeach ?>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Chọn ví</label>
                <div class="col-lg-10">
                    <select name="wallet_id" id="select_wallet" class="form-control">
                        @if (!empty($input['wallet_id']))
                        <option value="{{$input['wallet_id']}}" selected>{{$input['wallet_id']}}</option>
                        @endif
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ngày giao dịch</label>
                <div class="col-lg-10">
                    <input type="text" name="date" class="form-control datepicker" value="{{date("d/m/Y")}}">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Chọn người nhận</label>
                <div class="col-lg-10">
                    <select name="relate_id" data-module="contact"  class="select2_suggest crm-contact form-control">
                        @if(!empty($input['relate_id']))
                            <option value="{{ $input['relate_id'] }}" selected>{{ $input['relate_id'] }}</option>
                        @endif
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Số tiền</label>
                <div class="col-lg-10">
                    <input name="amount" type="text" autocomplete="off" placeholder="" class="form-control format_price"
                           value="{{$input['amount'] ?? 0}}">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Nội dung</label>
                <div class="col-lg-10">
                    <textarea name="content" cols="30" rows="5" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">File đính kèm</label>
                <div class="col-lg-10" id="preview">
                    <input type="file" name="files" class="file-input-ajax" data-field="attachment[]" data-channel="{{env('STATIC_CHANNEL')}}" id="image_filepond" multiple data-value="">
                </div>
            </div>
        </div>
    </div>
</div>

</form>

    <script type="text/javascript">
        var page_wallet_transaction_deposite = (function() {
            'use strict';
            var wallet_id = '{{$input['wallet_id'] ?? ''}}';
            return{
                init:function (){
                    this.changePaymentMethod();
                },
                changePaymentMethod: function() {
                    var val = $("#finance_wallet_deposit").find("select[name='method']").val();
                    //var dataResult = [];
                    //$('#select_wallet').empty();
                    if(val == 'cash'){
                        $("#select_wallet").loadSuggestData({module: 'finance_wallets', query: {relate_type: 'branch',status: 'active',type: 'system'}});
                    }else{
                        $("#select_wallet").loadSuggestData({module: 'finance_wallets', query: {relate_type: val,status: 'active',type: 'system'}});
                    }
                    
                }
            }
        })();
        $( document ).ready(function() {
            page_wallet_transaction_deposite.init();
        });
    </script>

@stop
