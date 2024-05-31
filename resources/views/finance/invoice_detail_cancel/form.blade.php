@extends('layout.app')
@section('content')
@include('common.content_header')    
<form class="ajax-submit-form" id="form_invoice_create" data-redirect-uri="{{$redirect_uri ?? ''}}" action="{{$action}}" method="{{$method}}" id="invoice_detail_cancel_confirm"> 
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline bg-">
            <h5 class="card-title">Duyệt hủy dịch vụ</h5>
            <div class="header-elements">
                <input type="hidden" name="status" value="">
                <button class="btn btn-success ajax-submit-button" onclick="this.form.status.value=this.value" value="approved" type="submit">Duyệt đơn</button>
                <button class="btn btn-danger ajax-submit-button ml-2" onclick="this.form.status.value=this.value" value="cancelled" type="submit">Từ chối</button>
            </div>
            
        </div>
        <div class="card-body row">    
            <div class="col-sm-6">
                <h4>Tổng số tiền sử dụng</h4>
                <div class="form-group">
                    <input type="text" class="format_price form-control" autocomplete="off" readonly required name="amount_used" value="{{$row['amount_used']??''}}">
                </div>
                <div class="form-group">
                    <h5>Chi tiết số tiền sử dụng</h5>
                    @php $countIndex = 1; @endphp
                    
                    <table class="sale table order-list" id="invoice_detail_cancel_amount">
                        <tr>
                            <th width="50%">Loại tiền</th>
                            <th>Số tiền</th>
                            <th width="40px"></th>
                        </tr>
                        @if (!empty($row['amount_detail']))
                        @foreach($row['amount_detail'] as $detail)
                        <tr id="amount_detail_item_{{$countIndex}}">
                            <td><input name="amount_detail[{{$countIndex}}][name]" type="text" placeholder="Loại" class="form-control" value="{{$detail['name'] ?? ''}}"></td>
                            <td><input name="amount_detail[{{$countIndex}}][amount]" onkeyup="invoice_cancel_confirm.calculator()" type="text" placeholder="Giá trị" class="form-control amount_detail_item_value" value="{{$detail['amount'] ?? ''}}"></td>
                            <td><button class="btn btn-danger" type="button" onclick="invoice_cancel_confirm.deleteMoreDetail('{{$countIndex}}')">Delete</button></td>
                        </tr>
                        @php $countIndex++; @endphp
                        @endforeach
                        @endif
                    </table>
                    
                    <button class="btn btn-warning" type="button" onclick="invoice_cancel_confirm.addMoreDetail()">Thêm tiền</button>
                </div>
                
                <h2 class="page-header">Phân bổ doanh số</h2>
                <table class="sale table order-list" id="sales_data">
                    <tr>
                        <td width="30%">Sale</td>
                        <td>Số tiền</td>
                        <td width="40px"></td>
                    </tr>
                    
                        
                    <tr id="sale_1">
                        <td>
                            <select name="sales[1][sale_id]" class="select2_suggest form-control em-profile" data-module="employee" data-query-status="active">
                                <option value="{{$invoice['sale_id']}}">{{$invoice['sale_id']}}</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" name="sales[1][amount]" value="{{$row['amount_used']??''}}" placeholder="" autocomplete="off" class="form-control sale_amount format_price">
                        </td>
                        <td>
                            <a class="deleteRow" onclick="delete_current_dom('#sale_1');"><input type="button" class="ibtnDel btn btn-md btn-danger " value="Xóa"></a>
                        </td>
                    </tr>

                </table>
                <button type="button" onclick="invoice_cancel_confirm.addSale()" class="btn btn-sm btn-block btn-success">Thêm</button>
            </div>
            <div class="col-sm-6">
                <table class="table table-striped">
                    <tr>
                        <td width="200px"><label >Sản phẩm</label></td>
                        <td>{{$invoiceDetail['relate_name']??''}}</td>
                    <tr>
                        <td><label >Mã hóa đơn</label></td>
                        <td>{{$row['invoice_id']??''}}</td>
                    </tr>
                    <tr>
                        <td><label >Mã chi tiết hóa đơn</label></td>
                        <td>{{$row['invoice_detail_id']??''}}</td>
                    </tr>
                    <tr>
                        <td><label >Người tạo</label></td>
                        <td><div class="em-profile" data-id="{{$row['created_by']??''}}">{{$row['created_by']??''}}</div></td>
                    </tr>
                    <tr>
                        <td><label >Số buổi</label></td>
                        <td>{{$row['total_count']??''}}</td>
                    </tr>
                    <tr>
                        <td><label>Đã sử dụng</label></td>
                        <td class="format_price">{{$row['total_used']??''}}</td>
                    </tr>
                    <tr>
                        <td><label>Ngày tạo</label></td>
                        <td>{{date('d/m/Y H:i:s',$row['created_time'])}}</td>
                    </tr>
                    <tr>
                        <td><label>Lý do</label></td>
                        <td>{{$row['reason']??''}}</td>
                    </tr>
                    <tr>
                        <td><label>Số tiền dịch vụ</label></td>
                        <td class="format_price">{{$invoiceDetail['total']??''}}</td>
                    </tr>
                    <tr>
                        <td><label>Trạng thái</label></td>
                        <td>{{$invoiceDetail['status'] ??''}}</td>
                    </tr>
                    <tr>
                        <td><label>Số tiền đã dùng</label></td>
                        <td class="format_price">{{$row['amount_default']??''}}</td>
                    </tr>
                </table>
            
            </div>
                                
                            
        </div>
    </div>
</div>
</form>
    <script type="text/javascript">
        var invoice_cancel_confirm = (function(){
            var _countIndex = {{$countIndex}};
            var _sale_count = 1;
            var _parent_dom = '#invoice_detail_cancel_confirm';
            return {
                addMoreDetail: function(){
                    var html = '<tr id="amount_detail_item_' + _countIndex + '">\
                                    <td>\
                                        <input type="text" placeholder="Loại" name="amount_detail[' + _countIndex + '][name]" class="form-control" value="">\
                                    </td>\
                                    <td>\
                                        <input type="text" onkeyup="invoice_cancel_confirm.calculator()" placeholder="Giá trị" name="amount_detail[' + _countIndex + '][amount]" class="form-control amount_detail_item_value format_price" value="0">\
                                    </td>\
                                    <td>\
                                        <button class="btn btn-danger" type="button" onclick="invoice_cancel_confirm.deleteMoreDetail(' + _countIndex + ')">Delete</button>\
                                    </td>\
                                </tr>';
                    $("#invoice_detail_cancel_amount").append(html).trigger( "MainContentReloaded", [] );
                    _countIndex ++;
                    //this.calculator();
                },
                deleteMoreDetail: function(idx) {
                    $("#amount_detail_item_" + idx).remove();
                    this.calculator();
                },
                calculator: function() {
                    var total = 0;
                    $(".amount_detail_item_value").each(function(item) {
                        total += parseInt($(this).unmask());
                    });
                    $("input[name=amount_used]").val(total).trigger('pricechange');
                },
                addSale: function() {
                    
                    _sale_count ++;
                    var html = '<tr id="sale_'+_sale_count+'">\
                                    <td><select required name="sales[' + _sale_count + '][sale_id]" class="form-control em-profile select2_suggest" data-module="employee"></select>\
                                    </td>\
                                    <td>\
                                        <input required type="text" name="sales[' + _sale_count + '][amount]" value="0" placeholder="" autocomplete="off" class="form-control sale_amount format_price">\
                                    </td>\
                                    <td>\
                                        <a class="deleteRow" onclick="delete_current_dom(\'#sale_' + _sale_count + '\');"><input type="button" class="ibtnDel btn btn-md btn-danger " value="Xóa"></a>\
                                    </td>\
                                </tr>';
                    $("#sales_data").append(html);
                    $("#sale_"+_sale_count).trigger( "MainContentReloaded", [] );
                }
            }
        })();
    </script>
@stop
