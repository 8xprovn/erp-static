@extends('layout.app')
@section('content')              
@include('common.content_header')
<div class="content">
    <div class="card">
        <div class="card-header header-elements-inline">
            <h5 class="card-title">Danh sách phiếu thu</h5>
            <div class="header-elements ">
                @if ($rows->isNotEmpty())
                <a class="report_ajax_modal mr-1 btn btn-teal" href="#">Export</a>
                @endif
                <a class="call_ajax_modal btn btn-teal" href="{{route('invoices.create')}}">Tạo hóa đơn</a>
            </div>
        </div>
        <table class="table datatable-fixed-both display" width="100%">
            <thead id="checkbox_all">
            <tr>
                <th>STT</th>
                <th>#ID</th>
                <th>KH</th>
                <th>Mã hóa đơn</th>
                <th>Người thanh toán</th>
                <th>Người tạo</th>
                <th>Kế toán</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Loại</th>
                <th>Thương hiệu</th>
                <th>Thương hiệu gốc</th>
                <th>Cơ sở</th>
                <th>Nguồn</th>
                <th>Ngày tạo</th>
                <th>Ngày thu</th>
                <th>Gửi email</th>
                <th>Lý do</th>
                <th class="all text-center"><i class="icon-checkmark3"></i></th>
            </tr>
            </thead>
            <tbody id="checkbox_list">
            @php $i = 0; @endphp
            @foreach($rows as $row)
            @php $i++; @endphp
            <tr>
                <td>{{$i}}</td>
                <td>
                    {{$row['_id']}}
                </td>
                <td class="text-nowrap">
                    <span class="crm-contact" data-id="{{$row['contact_id'] ?? ''}}">{{$row['contact_id'] ?? ''}}</span>
                </td>
                <td>
                    <a href="{{ route('invoices.show',$row['invoice_id']) }}">
                        {{$row['invoice_id']}}
                    </a>
                </td>
                
                <td>
                    <span class="crm-contact" data-id="{{$row['payment_contact_id'] ?? ''}}">{{$row['payment_contact_id'] ?? ''}}</span>
                </td>
                <td>
                    <div class="em-profile" data-id="{{$row['created_by'] ?? ''}}">{{$row['created_by'] ?? ''}}</div>
                </td>
                <td>
                    <div class="em-profile" data-id="{{$row['accountant_id'] ?? ''}}">{{$row['accountant_id'] ?? ''}}</div>
                </td>
                <td>
                    {{number_format($row['amount'])}}
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
                    {{__('finance.payment_type.'.$row['type'])}}
                </td>
                <td>
                    <div class="em-brand" data-id="{{ $row['brand_id'] ?? '' }}">{{ $row['brand_id'] ?? '' }}</div>
                </td>
                <td>
                    <span class="em-brand" data-id="{{$row['opportunity_data']['og_brand_id'] ?? ''}}">{{ $row['opportunity_data']['og_brand_id'] ?? '' }}</span>
                </td>
                <td>
                    <div class="em-branch" data-id="{{ $row['branch_id'] ?? ''}}">{{ $row['branch_id'] ?? ''}}</div>
                </td>
                <td>
                    {{$row['opportunity_data']['source'] ?? ''}}
                </td>
                <td>
                    {{date('d/m/Y H:i:s',$row['created_time'])}}
                </td>
                <td>
                    {{date('d/m/Y',$row['payment_date'])}}
                </td>
                <td class="text-center">
                    @if(!empty($row['is_send_mail']))
                        {!!   check_is_send_mail($row['is_send_mail']) !!}
                    @endif
                </td>
                <td>
                    <div style="max-width: 200px; overflow: hidden;">{{$row['reason'] ?? ''}}</div> 
                    
                </td>
                <td class="text-center">
                    <div class="dropdown dropleft">
                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                            <i class="icon-menu9"></i>
                        </a>

                        <div class="dropdown-menu dropdown-right">
                            {!! menuPayment($row) !!}
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
    document.addEventListener('DOMContentLoaded',function(){
        $("body").on("click",".call_notify_payment", function (e) {
            var payment_id = $(this).attr('data-payment');
            var arrId = [];
            $("#checkbox_list").find('input[type="checkbox"]:checked').each(function () {
                arrId.push($(this).attr('data-student'));
            });
            var route = '{{route('payments.send', [":payment_id"])}}';
            var url = route.replace(':payment_id',payment_id);

            $.confirm({
                title: 'Confirm!',
                content: 'Bạn có chắc muốn gửi thông tin thanh toán không?',
                closeIcon: true,
                keyboardEnabled: true,
                backgroundDismiss: true,
                cancelButton: "Cancel",
                confirmButtonClass: 'btn-danger',
                confirm: function confirm() {
                    helpers.curlpost(url, {'student_id': arrId}, function (response) {
                        if (response.error || response.status == 'error') {
                            show_notify_error(response);
                            return false;
                        }
                        new PNotify({
                            title: 'Success',
                            text: 'Gửi thông tin thanh toán thành công',
                            type: 'success',
                            styling: 'bootstrap3',
                            delay: 2000,
                            mouse_reset: false
                        });

                        if (callback && typeof callback === "function") {
                            callback(response);
                        }
                    });
                }
            });
        });
    })
</script>
@endpush
@section('left-slidebar')
    @include('finance.payments.section.filter',['filter' => $input])
@endsection

