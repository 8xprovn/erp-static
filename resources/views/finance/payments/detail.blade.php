@extends('layout.app')
@section('content')
@include('common.content_header')   
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Phiếu thu: {{$row['_id']}}</h3>
            <div class="header-elements">
                <div class="dropdown dropleft">
                    <a href="#" class="list-icons-item" data-toggle="dropdown">
                        <i class="icon-menu9"></i>
                    </a>

                    <div class="dropdown-menu">
                        {!! menuPayment($row) !!}
                    </div>
                </div>
            </div>
            
        </div>
        <div class="card-body row">

            <div class="col-lg-7">
                <table class="table table-striped">
                    <tr>
                        <th width="200px">Khách hàng</th>
                        <td>
                            <div class=" em-profile" data-id="{{$row['payment_contact_id']}}">{{$row['contact_id']}}</div>
                        </td>
                    </tr>
                    <tr>
                        <th>Người thanh toán:</th>
                        <td>
                            <div class=" em-profile" data-id="{{$row['payment_contact_id']}}">{{$row['payment_contact_id']}}</div>
                        </td>
                    </tr>
                    <tr>
                        <th>Doanh số</th>
                        <td>
                            {{$row['amount']}}
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày thanh toán:</th>
                        <td>
                            {{$rowpayment_date??date('Y-m-d')}}
                        </td>
                    </tr>
                    <tr>
                        <th>Địa chỉ:</th>
                        <td>
                            {{$contactDetail['address']??''}}
                        </td>
                    </tr>
                    <tr>
                        <th>Phone:</th>
                        <td>
                            {{$contactDetail['phone']??''}}
                        </td>
                    </tr>
                    <tr>
                        <th>Cơ sở thu tiền:</th>
                        <td>
                            @if(!empty($row['branch_id']) && $row['branch_id'])
                                <div data-id="{{ $row['branch_id']??''}}" class="em-branch">{{ $row['branch_id']}}</div>
                            @else
                                <div data-id="{{\Auth::user()->branch_id??'' }}" class="em-branch">{{\Auth::user()->branch_id??'' }}</div>
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <th>Hình thức:</th>
                        <td>
                            @if(!empty($row['method']))
                                {{ __('finance.payment_method.'.$row['method']) }}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <th>Số tiền:</th>
                        <td>
                            @if(!empty($row['amount']))
                                {{number_format($row['amount'], 0, '.', '.')}}
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <th>Ghi chú:</th>
                        <td>
                            {{$row['note'] ?? ''}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-lg-5">
                
                @if (!empty($row['sales']))
                <h5 class="card-title">Phân  bổ doanh số</h5>
                <table class="table table-striped jambo_table table-bordered">
                    <tr>
                        <th>Sale</th>
                        <th>Số tiền</th>
                    </tr>
                    @foreach ($row['sales'] as $sale)
                    <tr>
                        <td>
                            <span class=" em-profile" data-id="{{$sale['sale_id']}}">{{$sale['sale_id']}}</span>    
                        </td>
                        <td>{{number_format($sale['amount'])}}</td>
                    <tr>
                    @endforeach
                </table>
                @endif
                @if (!empty($row['invoice_details']))
                <h5 class="card-title mt-3">Phân bổ sản phẩm</h5>
                <table class="table table-striped jambo_table table-bordered">
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số tiền</th>
                    </tr>
                    @foreach ($row['invoice_details'] as $detail)
                    <tr>
                        <td>{{$details[$detail['detail_id']]['relate_name']}}</td>
                        <td>{{number_format($detail['amount'])}}</td>
                    <tr>
                    @endforeach
                </table>
                @endif
            </div>
           
        </div>
        @if (!empty($row['transactions']))
        <div class="card-header header-elements-inline">
            <h3 class="card-title">Giao dịch</h3>
        </div>
        @widget('WalletTransaction.Index', ['_id' => $row['transactions']])
        @endif
    </div>
</div>

@stop
