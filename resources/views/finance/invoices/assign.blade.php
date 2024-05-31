@extends('layout.app')
@section('content')
@include('common.content_header')   
<form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Chuyển quyền quản lý hóa đơn</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">

            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Sale ID</label>
                <div class="col-lg-10">
                    <select name="sale_id" class="form-control select2_suggest" data-module="employee"></select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Lí do</label>
                <div class="col-lg-10">
                    <textarea name="reason" class="form-control" placeholder="" rows="3"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
                    
</form>


@stop
