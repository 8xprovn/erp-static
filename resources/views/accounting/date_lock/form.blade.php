@extends('layout.app')
@section('content')
@include('common.content_header')    
<form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}"> 
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Chốt kì hóa đơn</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary">Submit <i class="icon-paperplane ml-2"></i></button>
            </div>
        </div>
        <div class="card-body">
            
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Tên</label>
                <div class="col-lg-10">
                    <input name="name" type="text" placeholder="" class="form-control" value="{{$row->name ?? ''}}">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ngày chốt</label>
                <div class="col-lg-10">
                    <input name="date_str" type="text"  class="form-control datepicker" value="{{date('d/m/Y',strtotime($row->date_str ?? date("Y-m-d") . "- 1 day"))}}">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-xs-12 validation_form">
                    <span style="color: red">* Lưu ý:</span>
                    <br>Ngày chốt lớn hơn ngày chốt gần nhất và nhỏ hơn ngày hiện tại.
                    <br>Các payment trước ngày chốt phải được duyệt hoặc từ chối.
                </div>
            </div>
        </div>
    </div>
</div>
</form>
@stop
