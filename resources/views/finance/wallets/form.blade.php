@extends('layout.app')
@section('content')
@include('common.content_header')  
<form class="ajax-submit-form" action="{{$action}}" method="{{$method}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Tạo ví</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
        </div>
        <div class="card-body">
        
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Tên ví</label>
                <div class="col-lg-10">
                    <input name="name" type="text" placeholder="" class="form-control"
                           value="{{$row['name'] ?? ''}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Loại ví</label>
                <div class="col-lg-10">
                    <select name="relate_type" class="form-control select2_single">
                        <option value="">Chọn loại ví</option>
                        @foreach (config('data.wallet_relate_type') as $relate)
                        <option value="{{$relate}}" @if(!empty($row) && $row['relate_type'] == $relate) echo 'selected' @endif>{{$relate}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">ID liên quan</label>
                <div class="col-sm-10 col-xs-12">
                    <input name="relate_id" type="text" placeholder="" class="form-control"
                           value="{{$row['relate_id'] ?? ''}}" >
                </div>
            </div>
            @if(!empty($type) && $type == 'system')
                <div class="form-group row">
                    <label class="col-lg-2 col-form-label">Người quản lí</label>
                    <div class="col-lg-10">
                        <select name="manager_id[]" multiple class="form-control em-profile select2_suggest" data-module="employee" >
                            <option value="">---</option>
                            @if (!empty($row['manager_id']))
                                @foreach ($row['manager_id'] as $manager_id)
                                    <option value="{{$manager_id}}" selected>{{$manager_id}}</option>
                                @endforeach
                            @endif
                        </select>
                    </div>
                </div>
            @endif
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Trạng thái</label>
                <div class="col-lg-10">
                    <select name="status" id="" class="form-control select2_single">
                        <option value="active" @if(!empty($row) && $row['status'] == 'active') selected @endif>Active</option>
                        <option value="inactive" @if(!empty($row) && $row['status'] == 'inactive') selected @endif>Inactive</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>                
</form>
@stop
