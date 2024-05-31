@extends('layout.app')
@section('content')
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Số tiền: <span class="format_price">{{$row['amount_used']}}</span></h3>
        </div>
        <div class="card-body row" id="page_invoice_detail">
            <div class="col-lg-6">
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th width="200">Mã hủy:</th>
                            <td>{{$row['_id']}}</td>
                        </tr>
                        <tr>
                            <th>Sản phẩm:</th>
                            <td>{{$invoiceDetail['relate_name']}}</td>
                        </tr>
                        <tr>
                            <th>Mã hóa đơn:</th>
                            <td>{{$row['invoice_id']}}</td>
                        </tr>
                        <tr>
                            <th>Mã chi tiết hóa đơn:</th>
                            <td>{{$row['invoice_detail_id']}}</td>
                        </tr>
                        <tr>
                            <th>Người tạo:</th>
                            <td><div class="em-profile" data-id="{{$row['created_by']}}">{{$row['created_by']}}</div></td>
                        </tr>
                        <tr>
                            <th>Số buổi:</th>
                            <td>{{$row['total_count']}}</td>
                        </tr>

                        <tr>
                            <th>Đã sử dụng:</th>
                            <td>{{$row['total_used']}}</td>
                        </tr>
                        <tr>
                            <th>Số buổi:</th>
                            <td>{{$row['total_count']}}</td>
                        </tr>
                        <tr>
                            <th>Ngày tạo:</th>
                            <td>{{date('d/m/Y H:i:s',$row['created_time'])}}</td>
                        </tr>
                        <tr>
                            <th>Lý do:</th>
                            <td>{{$row['reason'] ?? ''}}</td>
                        </tr>
                        <tr>
                            <th>Số tiền dịch vụ:</th>
                            <td>{{number_format($invoiceDetail['total'])}}</td>
                        </tr>
                        <tr>
                            <th>Số tiền đã dùng:</th>
                            <td>{{number_format($row['amount_used'])}}</td>
                        </tr>
                        <tr>
                            <th>Trạng thái:</th>
                            <td>{{$invoiceDetail['status']}}</td>
                        </tr>
                    </tbody>
                </table>   
            </div>
            <div class="col-lg-6">
                <h5>Phí chi tiết</h5>
                @if (!empty($row['amount_detail']))
                <table class="table table-striped jambo_table table-bordered">
                    <tr>
                        <th width="40%">Tên phí</th>
                        <th>Số tiền</th>
                    </tr>
                    @foreach($row['amount_detail'] as $amountUsedDetail)
                    <tr>
                        <td>
                            {{$amountUsedDetail['name']}}
                        </td>
                        <td class="format_price">{{$amountUsedDetail['amount']}}</td>
                    <tr>
                    @endforeach
                </table>
                @endif
                
                @if (!empty($row['sales']))
                <h5 class="mt-2">Trừ doanh số sale</h5>
                <table class="table table-striped jambo_table table-bordered">
                    <tr>
                        <th width="40%">Tên nhân viên</th>
                        <th>Số tiền</th>
                    </tr>
                    @foreach($row['sales'] as $sale)
                    <tr>
                        <td>
                            <div class="em-profile" data-id="{{$sale['sale_id']}}">{{$sale['sale_id']}}</div>
                            
                        </td>
                        <td class="format_price">{{$sale['amount']}}</td>
                    <tr>
                    @endforeach
                </table>
                @endif
            </div>
        </div>
    </div>                
</div>        
@stop
