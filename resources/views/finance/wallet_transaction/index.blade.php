@extends('layout.app')
@section('content')    
@include('common.content_header')            
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Danh sách giao dịch</h5>
            <div class="header-elements ">
                @if ($rows->isNotEmpty())
                    <a class="report_ajax_modal mr-1 btn btn-teal" href="#">Export</a>
                @endif
                <a class="call_ajax_modal btn btn-teal" href="{{route('wallet_transaction.deposit')}}">Nạp tiền</a>
                <a class="call_ajax_modal btn btn-teal ml-2" href="{{route('wallet_transaction.withdraw')}}">Rút tiền</a>
            </div>
        </div>
        <table class="table datatable-fixed-both" width="100%">
            <thead id="checkbox_all">
            <tr>
                <th>STT</th>
                <th>Mã GD</th>
                <th>Ví chuyển</th>
                <th>Ví nhận</th>
                <th>Loại GD</th>
                <th>Số tiền</th>
                <th>Mã đối tác</th>
                <th>Trạng thái</th>
                <th>Hình thức</th>
                <th>Người tạo</th>
                
                <th>Ngày tạo</th>
                <th>Nội dung</th>
                <th>Lý do từ chối</th>
                <th class="all text-center"><i class="icon-checkmark3"></i></th>
            </tr>
            </thead>
            <tbody id="checkbox_list">
            @php
                $i = 0;
            @endphp
            @foreach($rows as $row)
                @php
                $i ++;
                @endphp
            <tr>
                <td>{{$i}}</td>
                <td>
                    {{ $row['_id'] }}
                </td>
                <td class="text-nowrap">
                    <span class="finance_wallets" data-id="{{$row['wallet_id']}}">{{$row['wallet_id']}}</span>
                </td>
                <td>
                    <span class="finance_wallets" data-id="{{$row['receive_wallet_id']}}">{{$row['receive_wallet_id']}}</span>
                </td>
                <td>
                    @if(!empty($row['reason_type']))
                        {{ __('finance.wallet_transaction.reason_type.'.$row['reason_type']) }}
                    @endif
                </td>
                <td>
                    {{number_format($row['amount'])}}
                </td>
                <td>
                    {{ $row['partner_txt_id'] ?? '' }}
                </td>
                <td>
                    @if ($row['status'] == 'approved')
                        @php $badge="badge-success"; @endphp
                    @elseif ($row['status'] == 'cancelled')
                        @php $badge="badge-danger"; @endphp
                    @else
                        @php $badge="badge-secondary"; @endphp
                    @endif
                    <div class="badge {{$badge}}">{{$row['status']}}</div>
                </td>
                <td>
                    {{ $row['method'] ?? ''}}
                </td>
                <td>
                   <div class="em-profile" data-id="{{$row['created_by'] ?? ''}}">{{$row['created_by'] ?? ''}}</div>
                </td>
                
                <td>
                    {{ date('d/m/Y H:i:s',$row['created_time']) }}
                </td>
                <td>
                    {{ $row['content'] ?? '' }}
                </td>
                <td>
                    {{ $row['reason'] ?? '' }}
                </td>
                <td class="text-center">
                    <div class="dropdown dropleft">
                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                            <i class="icon-menu9"></i>
                        </a>

                        <div class="dropdown-menu dropdown-right">
                            {!! menuTransaction($row) !!}
                        </div>
                    </div>
                </td>
            </tr>
            @endforeach
            </tbody>
        </table>
        <div class="card-footer">
            {!! $pagination ?? '' !!}
        </div>
    </div>
</div>
@endsection
@push('scripts')
<script type="text/javascript">
    var transaction_index = (function(){
        return {
            cancel: function(id) {
                var route = '{{route('wallet_transaction.cancel',[":id"])}}';
                var url = route.replace(':id',id);
                var html = '<form action="'+url+'" method="POST" class="ajax-submit-form"><div class="modal fade" id="cancel_reason" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">\
                      <div class="modal-dialog" role="document">\
                        <div class="modal-content">\
                          <div class="modal-body">\
                              <div class="form-group">\
                                <label class="control-label">Lý do huỷ</label>\
                                <textarea class="form-control" name="content"></textarea>\
                                <input type="hidden" name="transaction_id" value="'+id+'">\
                              </div>\
                            <button type="submit" class="btn btn-primary" value="Hủy giao dịch">Huỷ giao dịch</button>\
                          </div>\
                        </div>\
                      </div>\
                    </div></form>';
                $("#cancel_reason").remove();
                $("body").append(html);
                $("#cancel_reason").modal('show');
            }
        }
    })();
</script>
@endpush
@section('left-slidebar')
    @include('finance.wallet_transaction.section.filter',['filter' => $filter])
@endsection