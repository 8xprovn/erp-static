@extends('layout.app')
@section('content')
@include('common.content_header')  
<form class="ajax-submit-form" action="{{$action}}" method="{{$method}}" data-redirect-uri="{{$redirect_uri}}">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Cập nhật SMS</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
        </div>
        <div class="card-body">
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Loại giao dịch</label>
                <div class="col-lg-10">
                    <select name="transaction_type" class="form-control select2_single">
                        <option value="deposit">Nạp tiền</option>
                        <option value="transaction">Xử lý giao dịch</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Khách hàng</label>
                <div class="col-lg-10">
                    <select name="relate_id" data-module="contact" class="select2_suggest form-control"></select>
                </div>
            </div>
            
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ngân hàng</label>
                <div class="col-lg-10">
                    <input disabled type="text" placeholder="" class="form-control" value="{{$row['bank_code'] ?? ''}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Số tiền</label>
                <div class="col-lg-10">
                    <input disabled type="text" placeholder="" class="form-control" value="{{$row['amount'] ?? ''}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Tài khoản</label>
                <div class="col-lg-10">
                    <input disabled type="text" placeholder="" class="form-control" value="{{$row['account'] ?? ''}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ngày</label>
                <div class="col-lg-10">
                    <input disabled type="text" placeholder="" class="form-control" value="{{date('d/m/Y H:i:s',$row['date'] ?? '')}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Loại</label>
                <div class="col-lg-10">
                    <input disabled type="text" placeholder="" class="form-control" value="{{$row['type'] ?? ''}}" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Nội dung</label>
                <div class="col-lg-10">
                    <textarea disabled class="form-control">{{$row['content'] ?? ''}}</textarea>
                </div>
            </div>
        </div>
    </div>
</div>                
</form>
@stop
