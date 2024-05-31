@extends('layout.app')
@section('content')              
@include('common.content_header') 

<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Chốt kì hóa đơn</h5>
            <div class="header-elements ">
                <a class="call_ajax_modal btn btn-teal" href="{{route('date_lock.create')}}">Thêm mới</a>
            </div>
        </div>
        <table class="table">
            <thead id="checkbox_all">
            <tr>
                <th>Tên kỳ chốt</th>
                <th>Ngày chốt</th>
                <th>Nhân viên</th>
                <th>Tao luc</th>
                <th>Trạng thái</th>
            </tr>
            </thead>
            @if(!empty($rows))
            <tbody>
            @foreach($rows as $row)
            <tr>
                <td>
                    {{ $row['name']??'' }}
                </td>
                <td>
                    {{ date('Y-m-d',$row['date_str']) }}
                </td>
                <td>
                    <div class="em-profile" data-id="{{ $row['created_by']??'' }}">{{ $row['created_by']??'' }}</div>
                </td>
                <td>
                    {{ date('d/m/Y H:i:s',  $row['created_time']) }}
                </td>
                <td>
                    {{ $row['status']??'' }}
                </td>
            </tr>
            @endforeach
            </tbody>
            @endif
        </table>
    </div>
</div>                        
@stop