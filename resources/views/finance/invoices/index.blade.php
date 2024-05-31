@extends('layout.app')
@section('content')    
@include('common.content_header')            
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Danh sách hóa đơn</h5>
            <div class="header-elements ">
                @if ($rows->isNotEmpty())
                <a class="report_ajax_modal mr-1 btn btn-teal" href="#">Export</a>
                @endif
                <a class="call_ajax_modal btn btn-teal" href="{{route('invoices.create')}}">Tạo hóa đơn</a>
                <div class="datatable-button"></div>
            </div>
        </div>
        <table class="table datatable-fixed-both" width="100%">
            <thead>
            <tr>
                <th>STT</th>
                <th>Mã</th>
                <th width="200px">Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Tiền gốc</th>
                <th>Tiền giảm</th>
                <th>Đã TT</th>
                <th>Nợ</th>
                <th>Thương hiệu</th>
                <th>Người thanh toán</th>
                <th>Người tạo</th>
                <th>Sale</th>
                <th>Chi nhánh</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Xác nhận</th>
                <th>Mã cơ hội</th>
                <th>Nguồn</th>
                <th>Thương hiệu gốc</th>
                
                <th class="">Note</th>
                <th class="all"><i class="icon-checkmark3"></i></th>
            </tr>
            </thead>
            <tbody>
            @php $i = 0; @endphp
            @foreach($rows as $row)
            @php $i ++; @endphp
            <tr>
                <td>{{$i}}</td>
                <td><a href="{{route('invoices.show',[$row['_id']])}}">{{$row['_id']}}</a></td>
                <td class="text-nowrap"><span class="crm-contact" data-id="{{$row['contact_id']??''}}">{{$row['contact_id']}}</span></td>
                <td>{{number_format($row['total_amt'])}}</td>
                <td>{{number_format($row['original_amt'])}}</td>
                <td>{{number_format($row['discount_amt'])}}</td>
                <td>{{number_format(($row['total_amt'] - $row['debt_amt'])??0)}}</td>
                <td>{{number_format($row['debt_amt'])}}</td>
                <td>
                    <div class="em-brand" data-id="{{$row['brand_id']??''}}"></div>
                </td>
                <td><span class="crm-contact" data-id="{{$row['payment_contact_id']}}">{{$row['payment_contact_id']??''}}</span></td>
                <td><div class="em-profile" data-id="{{$row['created_by']??''}}"></div></td>
                <td><div class="em-profile" data-id="{{$row['sale_id']??''}}"></div></td>
                <td><div class="em-branch" data-id="{{$row['branch_id']??''}}"></div></td>
                <td>{{date('d/m/Y H:i:s',$row['created_time']??'')}}</td>
                <td> {{ __('finance.invoice_status.'.$row['status']??'') }}</td>
                <td>{!! check_is_verified($row['is_verified']??0) !!}</td>
                
                <td>{{$row['opportunity_data']['opportunity_id']??''}}</td>
                <td>{{$row['opportunity_data']['source']??''}}</td>
                <td>
                    <span class="em-brand" data-id="{{$row['opportunity_data']['og_brand_id']??''}}">{{$row['opportunity_data']['og_brand_id']??''}}</span>
                </td>
                <td class="white-space-nomal" style="min-width: 150px">
                    <div class="collapse" id="oppshowcontent_{{$row['_id']}}">{{$row['note']??''}}</div>
                    <a role="button" class="collapsed" data-toggle="collapse" href="#oppshowcontent_{{$row['_id']}}" aria-expanded="false" aria-controls="oppshowcontent_{{$row['_id']}}"></a>
                </td>
                <td class="text-center">
                    <div class="dropdown dropleft">
                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                            <i class="icon-menu9"></i>
                        </a>

                        <div class="dropdown-menu">
                            {!! menuInvoice($row) !!}
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
@stop
@push('scripts')
<script type="text/javascript">
    var invoice_index = (function(){
        return {
            cancel: function(id) {
                var route = '{{route('invoices.confirm',[":id"])}}';
                var url = route.replace(':id',id);
                var html = '<form action="'+url+'?status=cancelled'+'" method="POST" class="ajax-submit-form"><div class="modal fade" id="cancel_reason" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">\
                          <div class="modal-dialog" role="document">\
                            <div class="modal-content">\
                              <div class="modal-body">\
                                  <div class="form-group">\
                                    <label class="control-label">Lý do từ chối</label>\
                                    <textarea class="form-control" name="reason"></textarea>\
                                    <input type="hidden" name="class_id" value="'+id+'">\
                                  </div>\
                                <button type="submit" class="btn btn-primary" value="Hủy lớp">Từ chối</button>\
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
    @include('finance.invoices.section.filter',['filter' => $filter])
@endsection
