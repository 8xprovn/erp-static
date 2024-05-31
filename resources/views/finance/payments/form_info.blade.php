@extends('layout.app')
@section('content')
@include('common.content_header')  
<form class="form-horizontal form-label-left ajax-submit-form"  action="{{$action}}" method="{{$method}}" id="edu_payment_update_form">
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Cập nhật thanh toán</h5>
            <div class="header-elements">
                <button type="submit" class="btn btn-primary ajax-submit-button ml-3">Lưu thông tin <i class="icon-paperplane ml-2"></i></button>
            </div>
            
        </div>
        <div class="card-body">     
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Cơ sở thu tiền</label>
                <div class="col-lg-10">
                    <select name="branch_id"  data-module="branch" class="select2_suggest em-branch form-control">
                        @if(!empty($row['branch_id']) && $row['branch_id'])
                            <option value="{{ $row['branch_id']??''}}" selected>{{ $row['branch_id']}}</option>
                        @else
                            <option value="{{\Auth::user()->branch_id??'' }}" selected>{{\Auth::user()->branch_id??'' }}</option>
                        @endif
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Ngày thu</label>
                <div class="col-lg-10">
                    <input type="text" name="payment_date" class="form-control datepicker" value="{{date('d/m/Y',$row['payment_date'] ?? time())}}" autocomplete="off" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Tổng số tiền</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control format_price" value="{{$row['amount']??''}}" disabled autocomplete="off" >
                </div>
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-form-label">Phân bổ sale</label>
                <div class="col-lg-10">
                    <table class="sale table order-list">
                        <thead>
                        <tr>
                            <td>Sale</td>
                            <td>Số tiền</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        @if(!empty($row['sales']))
                            @php $key = 1; @endphp

                            @foreach($row['sales'] as $sale)
                                <tr id="sale_{{$key}}">
                                    <td class="col-sm-2">
                                        <select name="sales[{{$key}}][sale_id]" class="select2_suggest form-control em-profile" data-module="employee">
                                            <option value="{{$sale['sale_id'] ?? ''}}">{{$sale['sale_id'] ?? ''}}</option>
                                        </select>
                                    </td>
                                    <td class="col-sm-2">
                                        <input type="text" name="sales[{{$key}}][amount]" value="{{$sale['amount'] ?? ''}}" placeholder="Số tiền doanh số" autocomplete="off" class="form-control format_price">
                                    </td>
                                    <td class="col-sm-2">
                                        <a class="deleteRow" onclick="delete_current_dom('#sale_{{$key}}')"><input type="button" class="ibtnDel btn btn-md btn-danger " value="Xóa"></a>
                                    </td>
                                </tr>
                            @php $key++; @endphp
                        @endforeach
                        @endif
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="1" style="text-align: left;">
                                <button type="button" onclick="javascript:page_payment_update.addSale();" class="btn btn-sm btn-block btn-success">Thêm</button>
                            </td>
                        </tr>
                        <tr>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</form>
    
@stop
@push('scripts')
<script>
    var page_payment_update = (function(){
        var _parent_dom = '#edu_payment_update_form';
        var _countPaymentSale = {{count($row['sales']) + 1}};
        if(_countPaymentSale > 1){
            var _sale_count = _countPaymentSale;
        }else{
            var _sale_count = 1;
        }
        return {
            addSale: function() {
                var html = '<tr id="sale_'+_sale_count+'">\
                                <td  class="col-sm-4"><select required name="sales[' + _sale_count + '][sale_id]" class="form-control em-profile select2_suggest" data-module="employee"></select>\
                                </td>\
                                <td  class="col-sm-4">\
                                    <input  required type="text" name="sales[' + _sale_count + '][amount]" value="" placeholder="" autocomplete="off" class="form-control format_price">\
                                </td>\
                                <td class="col-sm-4">\
                                    <a class="deleteRow" onclick="delete_current_dom(\'#sale_' + _sale_count + '\')"><input type="button" class="ibtnDel btn btn-md btn-danger " value="Xóa"></a>\
                                </td>\
                            </tr>';
                $(_parent_dom).find(".sale tbody").append(html).trigger( "MainContentReloaded", [] );
                _sale_count ++;
            },
            init: function() {
                if (_sale_count == 1) {
                    this.addSale();
                } 
            }
        }

    })();
    $(document).ready(function(){
        //page_payment_update.addSale();
    });
</script>
@endpush
