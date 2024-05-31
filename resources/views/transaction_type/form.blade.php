@extends('layout.app')
@section('content')
@include('common.content_header')  
<form class="ajax-submit-form" action="{{$action}}" method="{{$method}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Tạo loại giao dịch</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
        </div>
        <div class="card-body">
        
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Tên</label>
                <div class="col-lg-10">
                    <input name="name" type="text" placeholder="" class="form-control" value="{{$row['name'] ?? ''}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Tên</label>
                <div class="col-lg-10">
                    <select name="type" class="form-control">
                        <option value="">Chọn loại</option>
                        <option value="debit">Thu</option>
                        <option value="credit">Chi</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Chọn ví</label>
                <div class="col-lg-10">
                    <select name="wallet_id" data-module="finance_wallets" data-query-relate_type="accounting" class="select2_suggest form-control">
                        @if (!empty($row['wallet_id']))
                        <option value="{{$row['wallet_id']}}">{{$row['wallet_id']}}</option>
                        @endif
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>                
</form>
@stop
