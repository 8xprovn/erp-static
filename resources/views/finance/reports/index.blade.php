@extends('layout.app')
@section('content')
@include('common.content_header')
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Thống kê thanh toán</h5>
        </div>
        <div class="card-body">
            <table class="table datatable_report display" width="100%">
                <thead>
                    <tr>
                        @if (!empty($input['group']))
                        @foreach ($input['group'] as $group)
                        <th>{{__('field.'.$group)}}</th>
                        @endforeach
                        @endif
                        @foreach ($sum_data as $k => $v)
                        <th class="all">{{__('field.'.str_replace("::",".",$k))}}</th>
                        @endforeach
                    </tr>
                </thead>
                <tbody>
                    @foreach ($rows as $row)
                    <tr>
                        @if (!empty($input['group']))
                        @foreach ($row['_id'] as $k => $id)
                            <td>{!! autosuggest($id,$input['group'][$k]) !!}</td>
                        @endforeach
                        @endif
                        @foreach ($sum_data as $k => $v)
                            <td>{{number_format($row[$k])}}</td>
                        @endforeach
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop
@section('left-slidebar')
    @if (!empty($view_filter))
    {!! $view_filter !!}
    @endif
@endsection

