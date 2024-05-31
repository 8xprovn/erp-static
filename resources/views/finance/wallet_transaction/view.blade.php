@extends('layout.app')
@section('content')
@include('common.content_header')   
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Giao dịch: {{$row['_id']}}</h3>
            <div class="header-elements">
                <div class="dropdown">
                    <a href="#" class="list-icons-item" data-toggle="dropdown">
                        <i class="icon-menu9"></i>
                    </a>

                    <div class="dropdown-menu dropdown-right">
                        {!! menuTransaction($row) !!}
                    </div>
                </div>
            </div>
            
        </div>

        <div class="card-body row" id="page_invoice_detail">
            <div class="col-md-6">
                <table class="table">
                    <tr>
                        <td>Ví người chuyển:</td>
                        <td>
                            <span class="finance_wallets" data-id="{{$row['wallet_id']}}">{{$row['wallet_id']}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Ví người nhận:</td>
                        <td>
                            <span class="finance_wallets" data-id="{{$row['receive_wallet_id']}}">{{$row['receive_wallet_id']}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Người tạo:</td>
                        <td>
                            <div class="em-profile" data-id="{{$row['created_by']??''}}">{{$row['created_by']??''}}</div>
                        </td>
                    </tr>

                    <tr>
                        <td>Số tiền:</td>
                        <td>
                            {{ $row['amount']??'' }}
                        </td>
                    </tr>
                    <tr>
                        <td>Mã đối tác:</td>
                        <td>
                           {{ $row['partner_txt_id']??'' }}
                        </td>
                    </tr>
                    <tr>
                        <td>Trạng thái:</td>
                        <td>
                            {{ $row['status']??'' }}
                        </td>
                    </tr>
                    <tr>
                        <td>Người duyệt:</td>
                        <td>
                            <div class="em-profile" data-id="{{$row['approved_by']??''}}">{{$row['approved_by']??''}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Loại:</td>
                        <td>
                            @if(!empty($row['reason_type']))
                                {{ __('finance.wallet_transaction.reason_type.'.$row['reason_type']) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td>Phương thức thanh toán:</td>
                        <td>
                           {{ $row['method']??'' }}
                        </td>
                    </tr>
                    <tr>
                        <td>Nội dung:</td>
                        <td>
                            {{ $row['content']??'' }}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                @if(!empty($row['attachment']))
                     <div class="form-group" style="display: inline-block">
                     @foreach($row['attachment'] as $attachment)
                        <div class="col-sm-6" >
                            <a href="{{env('SERVICE_MEDIA_URL').$attachment}}" target="_blank">
                                <img src="{{env('SERVICE_MEDIA_URL').$attachment}}" style="width: 100%;">
                            </a>
                        </div>
                     @endforeach
                     </div>
                 @endif 
            </div>
        </div>
    </div>       
</div>
@stop
