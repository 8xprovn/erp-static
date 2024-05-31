@extends('layout.app')
@section('content')    
@include('common.content_header')
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Danh sách ví</h5>
            <div class="header-elements ">
                <a class="call_ajax_modal btn btn-teal" href="{{route('wallets.create',['type' => 'system'])}}">Tạo ví</a>
            </div>
        </div>
               
            <table class="table datatable-fixed-both" width="100%">
                <thead id="checkbox_all">
                <tr>
                    <th>STT</th>
                    <th>Mã ví</th>
                    <th>Tên ví</th>
                    <th>Số dư</th>
                    <th>Mã liên quan</th>
                    <th>Trạng thái</th>
                    <th>Loại liên quan</th>
                    
                    <th>Ngày tạo</th>
                    <!--@if($type == 'system') <th class="none">Người quản lí</th> @endif-->
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
                        {{number_format($row['balance'] ?? 0)}}
                    </td>
                    <td>
                        {{ $row['relate_id'] ?? ''}}
                    </td>
                    <td>
                        {{ $row['status'] }}
                    </td>
                    <td>
                        {{ $row['relate_type'] ?? '' }}
                    </td>
                    <td>
                        {{date('d/m/Y',$row['created_time'])}}
                    </td>
                    <td>

                        <div class="dropdown dropleft">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu">
                                {!! menuWallet($row) !!}
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
    @include('finance.wallets.section.filter')
@endsection