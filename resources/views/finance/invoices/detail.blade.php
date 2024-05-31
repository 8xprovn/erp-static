@extends('layout.app')
@section('content')
@include('common.content_header')   
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Hóa đơn: {{$invoiceDetail['_id'] ?? ''}}</h3>
            <div class="header-elements">
                <div class="dropdown dropleft">
                    <a href="#" class="list-icons-item" data-toggle="dropdown">
                        <i class="icon-menu9"></i>
                    </a>

                    <div class="dropdown-menu">
                        {!! menuInvoice($invoiceDetail) !!}
                    </div>
                </div>
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
                                <td>{{number_format($invoiceDetail['total_paid'])}}</td>
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
        <div class="card-header header-elements-inline">
            <h4 class="card-title">Thanh toán</h4>
        </div>
            @widget('Payments.Index', ['invoice_id' => $invoiceDetail['_id']])
            
        <div class="card-header header-elements-inline">
            <h4 class="card-title">Hủy dịch vụ</h4>
        </div>
        @widget('InvoiceDetailCancel.Index', ['invoice_id' => $invoiceDetail['_id']])
    </div>
</div>
<div class="block-render-note" data-params='{"relate_type": "finance_invoice","relate_id": "{{$invoiceDetail['_id'] ?? ''}}"}'>Note loading ....</div>
@stop
