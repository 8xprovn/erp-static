@extends('layout.app')
@section('content')
@include('common.content_header')    
<form id="finance_wallet_deposit" class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Điều chuyển tiền</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ví chuyển</label>
                <div class="col-lg-10">
                    <select name="receive_wallet_id" class="form-control select2_single" id="">
                        @foreach($wallets as $wallet)
                            <option data- value="{{ $wallet['_id'] ?? ''  }}">
                                {{ $wallet['name'] ?? '' }} - {{ (!empty($wallet['balance'])) ? number_format($wallet['balance'] ?? 0) : 0}}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Phương thức</label>
                <div class="col-lg-10">
                    <select class="select2_single form-control" name="method" onchange="page_wallet_transaction_move.changePaymentMethod(this.value)">
                        <?php foreach (config('data.wallet_transaction_method') as $value): ?>
                        <option value="{{$value}}" <?php echo !empty($row->method) && $row->method == $value ? 'selected' : ''?>>{{ __('finance.payment_method.'.$value) }}</option>
                        <?php endforeach ?>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Lý do</label>
                <div class="col-lg-10">
                    <select name="partner_txt_id" data-module="finance_transaction_type" class="form-control select2_suggest"></select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Số tiền</label>
                <div class="col-lg-10">
                    <input name="amount" type="text" autocomplete="off" placeholder="" class="form-control format_price"
                           value="{{$row['amount'] ?? ''}}">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ngày chi tiền</label>
                <div class="col-lg-10">
                    <input type="text" name="date" class="form-control datepicker" value="{{date("d/m/Y")}}">
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
@stop
@push('scripts')
<script type="text/javascript">
    var page_wallet_transaction_move = (function() {
        'use strict';
        var wallet_id = '';
        return{
            init:function (){
                this.changePaymentMethod();
            },
            changePaymentMethod: function() {
                var val = $("#finance_wallet_deposit").find("select[name='method']").val();
                var dataResult = [];
                $('#select_wallet').empty();
                if(val == 'cash'){
                    $("#select_wallet").loadSuggestData({module: 'finance_wallets', query: {relate_type: 'branch',status: 'active',type: 'system'}});
                }else{
                    $("#select_wallet").loadSuggestData({module: 'finance_wallets', query: {relate_type: val,status: 'active',type: 'system'}});
                }
                
            }
        }
    })();
    $( document ).ready(function() {
        page_wallet_transaction_move.init();
    });
</script>
@endpush