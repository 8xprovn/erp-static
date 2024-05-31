@extends('layout.app')
@section('content')
    <form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}" id="invoice_payment_form">
        <div class="form-group">
            <a href="{{route('payments.store')}}" class="btn btn-primary">Danh sách payment</a>
            <button class="btn btn-primary ajax-submit-button" onclick="paymentConfirm('approved');" type="submit">Duyệt thanh toán</button>
            <button class="btn btn-danger ajax-submit-button"  onclick="paymentConfirm('error');" type="submit">Từ chối</button>
            <input type="hidden" id="payment_confirm_status" value="" name="status">
        </div>
        <div class="row tab-pane" id="test_detail">
            <div class="col-sm-6 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Thông tin payment {{$row->payment_id}}</h2>
                        <input name="contact_id" type="hidden" placeholder="" class="form-control"
                               value="{{$row->contact_id ?? ''}}">
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content row">
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Cơ sở</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <select name="branch_id"  data-module="branch" class="select2_suggest em-branch form-control">
                                    @if(!empty($row->branch_id) && $row->branch_id)
                                        <option value="{{ $row->branch_id??''}}" selected>{{ $row->branch_id}}</option>
                                    @else
                                        <option value="{{ \Illuminate\Support\Facades\Auth::user()->branch_id??'' }}" selected>{{ \Illuminate\Support\Facades\Auth::user()->branch_id??'' }}</option>
                                    @endif
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Lý do</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <textarea name="reason" class="form-control" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Thông tin chi tiết payment</h2>
                        <input name="contact_id" type="hidden" placeholder="" class="form-control"
                               value="{{$row->contact_id ?? ''}}">
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content row">
                        <table class="table table-striped">
                            <tr>
                                <td>Mã thanh toán</td>
                                <td>
                                    {{$row->payment_id??''}}
                                </td>
                            </tr>
                            <tr>
                                <td>Mã hoá đơn</td>
                                <td>
                                    {{$row->invoice_id??''}}
                                </td>
                            </tr>
                            <tr>
                                <td>Tên khách hàng</td>
                                <td>
                                    {{$row->fullname??''}}
                                </td>
                            </tr>
                            <tr>
                                <td>Trạng thái</td>
                                <td>
                                    {{$row->status??''}}
                                </td>
                            </tr>
                            <tr>
                                <td>Loại</td>
                                <td>
                                    {{__('finance.payment_type.'.$row->type)}}
                                </td>
                            </tr>
                            <tr>
                                <td>Người tạo</td>
                                <td>
                                    <div class="em-profile"  data-id="{{$row->employee_id??''}}">{{$row->employee_id??''}} </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Sale hưởng</td>
                                <td>
                                    <div class="em-profile"  data-id="{{$row->sale_id??''}}">{{$row->sale_id??''}} </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Ngày thanh toán</td>
                                <td>
                                    {{$row->payment_date??date('Y-m-d')}}
                                </td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>
                                    {{$row->address??''}}
                                </td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>
                                    {{$row->phone??''}}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>

    </form>
    <script type="text/javascript">
        function paymentConfirm(stt) {
            $("#payment_confirm_status").val(stt);
        }
    </script>
@stop
