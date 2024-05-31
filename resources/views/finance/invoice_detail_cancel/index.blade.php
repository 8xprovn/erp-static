@extends('layout.app')
@section('content')    
@include('common.content_header')     
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Danh sách hủy dịch vụ</h5>
        </div>

        <table class="table datatable-fixed-both" style="width: 100%">
            <thead>
            <tr>
                <th>STT</th>
                <th>#ID</th>
                <th>Khánh hàng</th>
                <th>Mã HĐ</th>
                <th>Chi tiết HĐ</th>
                <th>Cơ sở</th>
                <th>Giá trị</th>
                <th>Sử dụng dự kiến</th>
                <th>Sử dụng thực tế</th>
                <th>Số tiền hoàn</th>
                <th>Người tạo</th>
                <th>Trạng thái</th>
                <th>Lý do</th>
                <th class="all"><i class="icon-checkmark3"></i></th>
            </tr>
            </thead>
            <tbody>
            @php $i = 0 @endphp
            @foreach($rows as $row)
            @php $i++; @endphp
            <tr>
                <td>{{$i}}</td>
                <td>{{$row['_id']}}</td>
                <td>
                    <div class="crm-contact" data-id="{{$row['contact_id'] ?? ''}}">{{$row['contact_id'] ?? ''}}</div>
                </td>
                <td>
                    <a href="{{route('invoices.show',[$row['invoice_id']])}}" target="_blank">{{$row['invoice_id']}}</a>
                </td>
                <td>
                    <a href="{{route('invoices.show',[$row['invoice_id']])}}" target="_blank">{{$row['invoice_detail_id']}}</a>
                </td>
                
                <td>
                    <div class="em-branch" data-id="{{$row['branch_id'] ?? ''}}">{{$row['branch_id'] ?? ''}}</div>
                </td>
                <td>
                    {{number_format($row['amt_total'] ?? 0)}}
                </td>
                
                <td>
                    {{number_format($row['amount_default'] ?? 0)}}
                </td>
                <td>
                    {{number_format($row['amount_used'] ?? 0)}}
                </td>
                <td>
                    {{number_format($row['amount'] ?? 0)}}
                </td>
                
                <td>
                    <div class="em-profile" data-id="{{ $row['created_by'] ??'' }}">{{ $row['created_by'] ??'' }}</div>
                </td>
                <td>
                    {{ $row['status'] ?? ''}}
                </td>
                <td>
                    {{ $row['reason'] ?? '' }}
                </td>        
                <td>
                    <div class="dropdown dropleft">
                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                            <i class="icon-menu9"></i>
                        </a>

                        <div class="dropdown-menu">
                            @if($row['status'] == 'open')
                            <a href="{{route('invoice_detail_cancel.edit', $row['_id'])}}" class="dropdown-item call_ajax_modal">Duyệt / Từ chối</a>
                            @else
                            <a href="{{route('invoice_detail_cancel.show', $row['_id'])}}" class="dropdown-item call_ajax_modal">Xem</a>
                            @endif
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
    @include('finance.invoice_detail_cancel.filter')
@endsection