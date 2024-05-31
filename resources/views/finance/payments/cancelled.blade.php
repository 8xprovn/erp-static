@extends('layout.app')
@section('content')
@include('common.content_header')  
<form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}" id="invoice_payment_form">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Hủy thanh toán: {{$row['_id']}}</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Cơ sở</label>
                        <div class="col-lg-10">
                            <select name="branch_id"  data-module="branch" class="select2_suggest em-branch form-control" disabled>
                                @if(!empty($row['branch_id']) && $row['branch_id'])
                                    <option value="{{ $row['branch_id']??''}}" selected>{{ $row['branch_id']}}</option>
                                @else
                                    <option value="{{ \Auth::user()->branch_id??'' }}" selected>{{ \Auth::user()->branch_id??'' }}</option>
                                @endif
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-2 col-form-label">Lí do</label>
                        <div class="col-lg-10">
                            <textarea name="reason" class="form-control" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <table class="table table-striped">
                        <tr>
                            <td>Mã thanh toán</td>
                            <td>
                                {{$row['_id']??''}}
                            </td>
                        </tr>
                        <tr>
                            <td>Mã hoá đơn</td>
                            <td>
                                {{$row['invoice_id']??''}}
                            </td>
                        </tr>
                        <tr>
                            <td>Khách hàng</td>
                            <td>
                                <span class="crm-contact" data-id="{{$row['contact_id'] ??''}}">{{$row['contact_id'] ??''}}</span>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>Người thanh toán</td>
                            <td>
                                <span class="crm-contact" data-id="{{$row['payment_contact_id'] ??''}}">{{$row['payment_contact_id'] ??''}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>
                                {{$row['status']??''}}
                            </td>
                        </tr>
                        <tr>
                            <td>Loại</td>
                            <td>
                                {{__('finance.payment_type.'.$row['type'])}}
                            </td>
                        </tr>
                        <tr>
                            <td>Người tạo</td>
                            <td>
                                <div class="em-profile"  data-id="{{$row['created_by']??''}}">{{$row['created_by']??''}} </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Ngày thanh toán</td>
                            <td>
                                {{date('d/m/Y',$row['payment_date'])}}
                            </td>
                        </tr>
                        <tr>
                            <td>Địa chỉ</td>
                            <td>
                                {{$row['address']??''}}
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>
                                {{$row['phone']??''}}
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
</form>
@stop
