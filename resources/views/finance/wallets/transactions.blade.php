@extends('layout.app')
@section('content')
    <form class="form-horizontal form-label-left">

        <div class="tool-box-sticky">
            <div class="tool-box-left">
                {{--<a href="{{route('wallets.index',['type' => $type])}}" title="Quay lại" class="btn btn-primary">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                </a>--}}

            </div>
        </div>
        <div class="panel-body-common">
            @include('finance.wallets.detail_tab_menu')

            <div class="tab-content">
                <div class="table-responsive">
                    <?php if (!empty($rows)) { ?>
                    <table class="table table-striped jambo_table table-bordered">
                        <thead id="checkbox_all">
                        <tr>
                            <th class="width-40 align-center">STT</th>
                            <th class="tr_sticky_left">Mã giao dịch</th>
                            <th>Ví người chuyển</th>
                            <th>Ví người nhận</th>
                            <th>Số tiền</th>
                            <th>Mã GD đối tác</th>
                            <th>Mã thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Hình thức</th>
                            <th>Người tạo</th>
                            <th>Người duyệt</th>
                            <th>Ngày tạo</th>
                            <th>Loại lý do</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <?php if(isset($rows) && $rows) {
                        $i = 1;
                        ?>
                        <tbody id="checkbox_list">
                        <?php foreach($rows as $row) {
                        $wds = $walletDetails[$row->wallet_id];
                        $wdr = $walletDetails[$row->receive_wallet_id]
                        ?>
                        <tr>
                            <td class="align-center">
                                {{$i??''}}
                            </td>
                            <td class="tr_sticky_left">
                                {{ $row->transaction_id??'' }}
                            </td>
                            <td>
                                @if ($wds->type == 'user')
                                    <span class="crm-contact" data-id="{{$wds->relate_id}}">{{$wds->relate_id}}</span>
                                @else
                                    <a href="{{route('wallets.show',['type' => 'system','wallet' => $row->wallet_id])}}" class="btn btn-default btn-sm">{{$wds->name}}</a>
                                @endif
                            </td>
                            <td>
                                @if ($wdr->type == 'user')
                                    <span class="crm-contact" data-id="{{$wdr->relate_id}}">{{$wdr->relate_id}}</span>
                                @else
                                    <a href="{{route('wallets.show',['type' => 'system','wallet' => $row->receive_wallet_id])}}" class="btn btn-default btn-sm">{{$wdr->name}}</a>
                                @endif

                            </td>
                            <td class="format_price">
                                {{$row->amount??''}}
                            </td>
                            <td>
                                {{ $row->partner_txt_id??'' }}
                            </td>
                            <td>
                                {{ $row->payment_id??'' }}
                            </td>
                            <td>
                                {{ $row->status??'' }}
                            </td>
                            <td>
                                {{ $row->method??'' }}
                            </td>
                            <td>
                                <div class="em-profile" data-id="{{$row->created_by??''}}">{{$row->created_by??''}}</div>
                            </td>
                            <td>
                                <div class="em-profile" data-id="{{$row->approved_by??''}}">{{$row->approved_by??''}}</div>
                            </td>
                            <td>
                                {{ $row->created_time??'' }}
                            </td>
                            <td>
                                @if(!empty($row->reason_type))
                                    {{ __('finance.wallet_transaction.reason_type.'.$row->reason_type) }}
                                @endif
                            </td>
                            <td class="action last tr_sticky_right">
                                <div class="dropdown">
                                    <i class="fa fa-list" aria-hidden="true" class="dropdown-toggle" data-toggle="dropdown" ></i>
                                    <div class="dropdown-menu">
                                        <a href="{{ route('wallet_transaction.show', $row->transaction_id) }}" class="btn-primary btn btn-xs ">Xem</a>
                                        <a href="{{ route('wallet_transaction.print', $row->transaction_id) }}" class="btn-primary btn btn-xs ">In</a>
                                       {{-- @if($row->status == 'approved')
                                            <a href="javascript:transaction_index.cancel({{$row->transaction_id??''}})" class="btn-danger btn btn-xs ">Huỷ giao dịch</a>
                                        @endif--}}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <?php
                        $i++;
                        } ?>
                        </tbody>
                        <?php }else{ ?>
                        <div class="no-result">No result</div>
                        <?php } ?>
                    </table>
                    {!! $pagination??'' !!}
                    <?php } ?>
                </div>
            </div>
        </div>
    </form>
@stop
