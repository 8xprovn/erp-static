@extends('layout.app')
@section('content')    
@include('common.content_header')      
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Danh sách sms</h5>
        </div>

        <table class="table datatable-fixed-both" width="100%">
            <thead id="checkbox_all">
            <tr>
                <th>STT</th>
                <th>Mã SMS</th>
                <th>Ngân hàng</th>
                <th >Ngày giao dịch</th>
                <th>Số TK</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Loại</th>
                <th>ID liên quan</th>
                <th>Giao dịch</th>
                <th class="text-nowrap">Mã giao dịch</th>
                <th>Nội dung</th>
                <th>Lí do</th>
                <th class="all"><i class="icon-checkmark3"></i></th>
            </tr>
            </thead>
            <tbody id="checkbox_list">
            @php $i = 0; @endphp
            @foreach($rows as $row)
            @php $i++; @endphp
            <tr>
                <td>{{$i}}</td>
                <td>
                    {{ $row['_id'] }}
                </td>
                <td>
                    {{ $row['bank_code'] }}
                </td>
                
                <td>
                    {{ date('d/m/Y H:i:s',$row['created_time']) }}
                </td>                
                <td>
                    {{$row['account'] ?? ''}}
                </td>
                <td>
                    {{number_format($row['amount'] ?? 0)}}
                </td>
                <td>
                    {{$row['status'] ?? ''}}
                </td>
                <td>
                    {{ $row['type'] ?? '' }}
                </td>
                <td>
                    {{ $row['relate_id'] ?? '' }}
                </td>
                <td>
                    {{ $row['transaction_type'] ?? '' }}
                </td>
                <td>
                    {{ $row['transaction_id'] ?? '' }}
                </td>
                <td class="white-space-nomal collapse_td" style="min-width: 300px;">
                    {!! $row['content'] !!}
                </td>
                <td>
                    {{ $row['reason'] ?? '' }}
                </td>
                <td class="text-center">
                    <div class="dropdown dropleft">
                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                            <i class="icon-menu9"></i>
                        </a>

                        <div class="dropdown-menu">
                            {!! menuBankSms($row) !!}
                        </div>
                    </div>
                </td>
            </tr>
            @endforeach
            </tbody>
        </table>
        <div class="card-footer">
            {!! $pagination ?? '' !!}
        </div>
    </div>
</div>
@endsection
@section('left-slidebar')
    @include('finance.bank_sms.filter')
@endsection
