@extends('layout.app')
@section('content')    
@include('common.content_header')   
<div class="content">
    <div class="card">
        <div class="card-header">
            <h5 class="card-title">Danh sách đối tác trả kết quả</h5>
        </div>                
        <table class="table datatable-fixed-both" width="100%">
            <thead>
            <tr>
                <th>ID</th>
                <th class="text-nowrap">Đối tác</th>
                <th>Loại liên quan</th>
                <th>ID liên quan</th>
                <th>Số tiền</th>
                <th>Nội dung</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Lí do</th>
            </tr>
            </thead>
            <tbody>
            @foreach($rows as $row)
            <tr>
                <td>
                    {{ $row['_id']}}
                </td>
                <td>
                    {{ $row['partner'] }}
                </td>
                <td>
                    {{ $row['relate_type'] ?? '' }}
                </td>
                <td>
                    {{ $row['relate_id'] ?? '' }}
                </td>
                <td>
                    {{number_format($row['amount'] ?? 0)}}
                </td>
                <td>
                    {{ $row['content_decoded'] ?? '' }}
                </td>
                <td>
                    {{ $row['status'] }}
                </td>
                <td>
                    {{ date('d/m/Y H:i:s',$row['created_time']) }}
                </td>
                <td>
                    {{ $row['reason'] ?? '' }}
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

