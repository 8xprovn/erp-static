@extends('layout.app')
@section('content')
@include('common.content_header')   
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Mã Ví: {{$row['_id']}}</h5>            
        </div>
        <div class="card-body">
            <table class="table">
                @if($row['type'] == 'user')
                <tr>
                    <td>Đối tượng:</td>
                    <td>
                        <div class="crm-contact" data-id="{{ $row['relate_id'] }}">{{ $row['relate_id'] }}</div>
                    </td>
                </tr>
                @endif
                <tr>
                    <td width="200px">Số dư:</td>
                    <td>
                        {{number_format($row['balance'] ?? 0)}}
                    </td>
                </tr>
                <tr>
                    <td>Trạng thái:</td>
                    <td>
                        {{ $row['status']}}
                    </td>
                </tr>
                <tr>
                    <td>Loại ví:</td>
                    <td>
                        {{ $row['relate_type'] }}
                    </td>
                </tr>
                <tr>
                    <td>Người quản lí:</td>
                    <td>
                        @if (!empty($row['manager_id']))
                        @foreach($row['manager_id'] as $manager_id)
                            <div class="em-profile" data-id="{{ $manager_id }}">{{ $manager_id }}</div>
                        @endforeach
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Code:</td>
                    <td>
                        {{$row['code']??''}}
                    </td>
                </tr>
                <tr>
                    <td>Số dư đầu kì:</td>
                    <td>
                        @if (!empty($balanceData['first']))
                        @foreach ($balanceData['first']['balance_logs'] as $log) 
                            @if ($log['wallet_id'] == $row['_id'])
                                {{number_format($log['before'])}}
                            @endif
                        @endforeach
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>Số dư cuối kì:</td>
                    <td>
                        @if (!empty($balanceData['last']))
                        @foreach ($balanceData['last']['balance_logs'] as $log) 
                            @if ($log['wallet_id'] == $row['_id'])
                                {{number_format($log['after'])}}
                            @endif
                        @endforeach
                        @endif
                    </td>
                </tr>
            </table>
        </div>
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Giao dịch</h3>            
        </div>
        <div class="card-body">
            <table class="table datatable-fixed-both" width="100%">
                <thead id="checkbox_all">
                <tr>
                    <th>STT</th>
                    <th>Mã GD</th>
                    <th>Ví GD</th>
                    <th>Loại GD</th>
                    <th>Số tiền</th>
                    <th>Số dư</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th class="all text-center"><i class="icon-checkmark3"></i></th>
                </tr>
                </thead>
                <tbody id="checkbox_list">
                @php
                    $i = 0;
                @endphp
                @foreach($transactions as $trans)
                @php
                    $i++;
                @endphp
                <tr>
                    <td>{{$i}}</td>
                    <td>
                        {{ $trans['_id'] }}
                    </td>
                    <td class="text-nowrap">
                        {{$trans['wallet_id']}} --> {{$trans['receive_wallet_id']}}
                    </td>
                    <td>
                        @if(!empty($trans['reason_type']))
                            {{ __('finance.wallet_transaction.reason_type.'.$trans['reason_type']) }}
                        @endif
                    </td>
                    <td>
                        {{number_format($trans['amount'])}}
                    </td>
                    
                    <td>
                        @if (!empty($trans['balance_logs']))
                        @foreach ($trans['balance_logs'] as $log) 
                            @if ($log['wallet_id'] == $row['_id'])
                                {{number_format($log['after'])}}
                            @endif
                        @endforeach
                        @endif
                    </td>
                    <td>
                        {{ $trans['status'] }}
                    </td>        
                    <td>
                        {{ date('d/m/Y H:i:s',$trans['created_time']) }}
                    </td>
                    <td class="text-center">
                        <div class="dropdown dropleft">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-right">
                                {!! menuTransaction($trans) !!}
                            </div>
                        </div>
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
    @include('finance.wallet_transaction.section.filter',['filter' => $filter])
@endsection
