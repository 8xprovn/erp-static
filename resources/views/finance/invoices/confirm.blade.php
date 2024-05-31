@extends('layout.app')
@section('content')
@include('common.content_header')   
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Hóa đơn: {{$invoiceDetail['_id'] ?? ''}}</h3>
            <div class="header-elements">

                <form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}" data-redirect-uri="{{$redirect_uri ?? ''}}" id="invoice_payment_form">
                    @if ($action == route('invoices.verify',[$invoiceDetail['_id']]))
                    <button class="btn btn-primary ajax-submit-button" onclick="invoice_detail.confirm('verified');" type="submit">Xác nhận</button>
                    @else
                    <button class="btn btn-primary ajax-submit-button" onclick="invoice_detail.confirm('approved');" type="submit">Duyệt hóa đơn</button>
                    <button class="btn btn-danger ajax-submit-button"  onclick="invoice_detail.cancel('error');" type="submit">Từ chối</button>
                    @endif
                    <input type="hidden" id="invoice_confirm_status" value="" name="status">
                </form>
            </div>
            
        </div>
        <div class="card-body" id="page_invoice_detail">
            <div class="row">
                <div class="col-sm-6">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th width="170px">Khách hàng:</th>
                                <td class="text-left"><span class="crm-contact" data-id="{{$invoiceDetail['contact_id'] ?? ''}}">{{$invoiceDetail['contact_id'] ?? ''}}</span></td>
                            </tr>
                            <tr>
                                <th>Người thanh toán:</th>
                                <td class="text-left"><span class="crm-contact" data-id="{{$invoiceDetail['payment_contact_id'] ?? ''}}">{{$invoiceDetail['payment_contact_id'] ?? ''}}</span></td>
                            </tr>
                            <tr>
                                <th>Điện thoại:</th>
                                <td class="text-left"><span class="crm-contact" data-format="$(phone)" data-id="{{$invoiceDetail['contact_id'] ?? ''}}">{{$invoiceDetail['contact_id'] ?? ''}}</span></td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td class="text-left"><span class="crm-contact" data-format="$(email)" data-id="{{$invoiceDetail['contact_id'] ?? ''}}">{{$invoiceDetail['contact_id'] ?? ''}}</span></td>
                            </tr>
                            <tr>
                                <th>Mã cơ hội</th>
                                <td class="text-left">
                                    {{$invoiceDetail['opportunity_data']['opportunity_id'] ?? ''}}
                                </td>
                            </tr>
                        </tbody>
                    </table>   
                </div>
                <div class="col-sm-6">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th width="170px">Sale</th>
                                <td class="text-left"><span class="em-profile" data-id="{{$invoiceDetail['sale_id'] ?? ''}}">{{$invoiceDetail['sale_id'] ?? ''}}</span></td>
                            </tr>
                            <tr>
                                <th>Trạng thái</th>
                                <td class="text-left">{{__('finance.invoice_status.'.$invoiceDetail['status']) ?? ''}}</td>
                            </tr>
                            

                            <tr>
                                <th>Đã thanh toán:</th>
                                <td>{{number_format(max($invoiceDetail['total_amt'] - $invoiceDetail['debt_amt'],0))}}</td>
                            </tr>
                            <tr>
                                <th>Hủy được hoàn:</th>
                                <td>{{number_format($invoiceDetail['cancelled_amt'] ?? 0)}}</td>
                            </tr>
                            <tr>
                                <th>Chưa thanh toán:</th>
                                <td>{{number_format($invoiceDetail['debt_amt'])}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                
            @widget('InvoicesDetail.Index', ['invoice_id' => $invoiceDetail['_id']])


            <div class="card-body">
                <div class="d-lg-flex flex-lg-wrap row">
                    <div class="col-lg-8">
                        <h3>Note</h3>
                        {{$invoiceDetail['note'] ?? ''}}
                    </div>
                    <div class="pt-2 mb-3 wmin-lg-400 ml-auto" >

                        
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Mã giảm giá:</th>
                                    <td class="text-right">{{$invoiceDetail['discount_code'] ?? ''}}</td>
                                </tr>
                                <tr>
                                    <th>Giảm theo chương trình:</th>
                                    <td class="text-right format_price">{{$invoiceDetail['discount_coupon_amt'] ?? ''}}</td>
                                </tr>
                                <tr>
                                    <th>Giảm khác:</th>
                                    <td class="text-right format_price">{{$invoiceDetail['discount_other_amt'] ?? ''}}</td>
                                </tr>
                                <tr>
                                    <th>Tiền gốc:</th>
                                    <td class="text-right format_price">{{$invoiceDetail['original_amt'] ?? ''}}</td>
                                </tr>
                                <tr>
                                    <th>Tổng tiền: <span class="font-weight-normal"></span></th>
                                    <td class="text-right"><h5 class="font-weight-semibold format_price">{{$invoiceDetail['total_amt'] ?? ''}}</h5></td>
                                </tr> 
                            </tbody>
                        </table>
           
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    var invoice_detail = (function(){
        return {
            confirm: function(id) {
                $("#invoice_confirm_status").val('approved');
            },
            cancel: function() {
                $("#invoice_confirm_status").val('cancelled');
            }
        }
    })();
</script>
@stop
