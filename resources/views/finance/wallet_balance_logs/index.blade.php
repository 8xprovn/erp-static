@extends('layout.app')
@section('content')    
@include('common.content_header') 
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Danh sách giao dịch</h5>
        </div>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead id="checkbox_all">
                <tr>
                    <th>ID GD</th>
                    <th>Số tiền</th>
                    <th>Số dư trước</th>
                    <th>Số dư sau</th>
                    <th>Nội dung</th>
                    <th>Ngày tạo</th>
                    <th>Loại</th>
                </tr>
                </thead>
                <tbody id="checkbox_list">
                @foreach($rows as $row)
                <tr>
                    <td>
                        {{ $row->transaction_id??'' }}
                    </td>
                    <td class="format_price">
                        @if(!empty($transactions[$row->transaction_id]))
                            {{ $transactions[$row->transaction_id]->amount??'' }}
                        @endif
                    </td>
                    <td class="format_price">
                        {{$row->balance_before??''}}
                    </td>
                    <td class="format_price">
                        {{$row->balance_after??''}}
                    </td>
                    <td>
                        @if(!empty($transactions[$row->transaction_id]))
                            {{ $transactions[$row->transaction_id]->content??'' }}
                        @endif
                    </td>
                    <td>
                        {{ $row->created_time??'' }}
                    </td>
                    <td>
                        @if(!empty($row->type))
                            {{ __('finance.wallet_transaction.type.'.$row->type) }}
                        @endif
                    </td>
                </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            {!! $pagination ?? '' !!}
        </div>
    </div>            
</div>
@endsection
@section('left-slidebar')
    @include('finance.wallet_balance_logs.filter')
@endsection
