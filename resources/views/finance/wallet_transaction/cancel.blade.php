@extends('layout.app')
@section('content')
@include('common.content_header')
<form class="form-horizontal form-label-left ajax-submit-form" id="wallet_transaction_confirm_form" action="{{$action}}" method="{{$method}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Hủy giao dịch</h5>
            <div class="header-elements">
                <button class="btn btn-primary ajax-submit-button" type="submit">Huỷ giao dịch</button>
            </div>
        </div>
        <div class="card-body">

            @php
                $wds = $walletDetails[$row['wallet_id']] ?? '';
                $wdr = $walletDetails[$row['receive_wallet_id']] ?? '';
            @endphp
            <div class="row">

                <div class="col-lg-6">
                    
                    <table class="table table-striped">
                        <tr>
                            <td>Ví người chuyển</td>
                            <td>
                                @if ($wds['type'] == 'user')
                                    <span class="crm-contact" data-id="{{$wds['relate_id']}}">{{$wds['relate_id']}}</span>
                                @else
                                    <a href="{{route('wallets.show',['type' => 'system','wallet' => $row['wallet_id']])}}" class="btn btn-default btn-sm">{{$wds['name']}}</a>
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td>Ví người nhận</td>
                            <td>
                                @if ($wdr['type'] == 'user')
                                    <span class="crm-contact" data-id="{{$wdr['relate_id']}}">{{$wdr['relate_id']}}</span>
                                @else
                                    <a href="{{route('wallets.show',['type' => 'system','wallet' => $row['receive_wallet_id']])}}" class="btn btn-default btn-sm">{{$wdr['name']}}</a>
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td>Số tiền</td>
                            <td class="format_price">
                                {{$row['amount']??''}}
                            </td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>
                                {{$row['status']??''}}
                            </td>
                        </tr>
                        <tr>
                            <td>Phương thức</td>
                            <td>
                                {{ $row['method']??'' }}
                            </td>
                        </tr>
                    </table>
                    
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label class="col-sm-12 col-xs-12">Lí do hủy</label>
                        <div class="col-sm-12 col-xs-12 validation_form">
                            <textarea name="reason" type="text" placeholder="" class="form-control" value="" cols="5"></textarea>
                        </div>
                    </div>
                    @if(!empty($row['attachment']))
                    
                         
                         @foreach($row['attachment'] as $attachment)
                            <div class="col-sm-6" >
                                <a href="{{env('SERVICE_MEDIA_URL').$attachment}}" target="_blank">
                                    <img src="{{env('SERVICE_MEDIA_URL').$attachment}}" style="width: 100%;">
                                </a>
                            </div>
                         @endforeach
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
    //$(document).ready(function(){
        var wallet_transaction_confirm = (function(){
            'use strict';
            return {
                process: function(status) {
                    $("#wallet_transaction_confirm_form").find("input[name=status]").val(status);
                }
            }
        })();
    //})
    
</script>
@endpush
