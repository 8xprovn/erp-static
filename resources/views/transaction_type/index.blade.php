@extends('layout.app')
@section('content')    
@include('common.content_header')
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Danh sách ví</h5>
            <div class="header-elements ">
                <a class="call_ajax_modal btn btn-teal" href="{{route('transaction_type.create')}}">Tạo loại giao dịch</a>
            </div>
        </div>
               
            <table class="table datatable-fixed-both" width="100%">
                <thead id="checkbox_all">
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Loại</th>
                    <th>Ví hứng</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Người tạo</th>
                    <th class="all" style="display: block"><i class="icon-checkmark3"></i></th>
                </tr>
                </thead>
                <tbody>
                @php $i = 0 @endphp
                @foreach($rows as $row)
                @php $i++; @endphp
                <tr>
                    <td>{{$i}}</td>
                    <td>
                        {{ $row['_id'] }}
                    </td>                    
                    <td class="text-nowrap">
                        {{$row['name'] ?? ''}}
                    </td>
                    <td>
                        {{$row['type'] ?? ''}}
                    </td>
                    <td>
                        {{ $row['wallet_id'] ?? ''}}
                    </td>
                    <td>
                        {{ $row['status'] }}
                    </td>
                    <td>
                        {{date('d/m/Y',$row['created_time'])}}
                    </td>
                    <td>
                        {!! autoSuggest($row['created_by'],'employee_id') !!}    
                    </td>
                    <td>

                        <div class="dropdown dropleft">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu">
                                <a href="{{route('transaction_type.edit',$row['_id'])}}" class="dropdown-item call_ajax_modal">Sửa loại</a>
                                <a href="{{route('transaction_type.destroy',$row['_id'])}}" class="dropdown-item quick-delete">Xóa loại</a>
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
    @include('transaction_type.section.filter')
@endsection