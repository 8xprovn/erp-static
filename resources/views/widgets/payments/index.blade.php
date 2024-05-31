<table class="table datatable-fixed-both" width="100%">
    <thead id="checkbox_all">
    <tr>
        <th>STT</th>
        <th>Mã thanh toán</th>
        <th>Tên khách hàng</th>
        <th>Mã hóa đơn</th>
        <th>Người tạo</th>
        <th>Sale</th>
        <th>Kế toán</th>
        <th >Số tiền</th>
        <th >Mã GD</th>
        <th >Trạng thái</th>
        <th >Loại</th>
        <th >Thương hiệu</th>
        <th >Cơ sở</th>
        <th >Ngày tạo</th>
        <th >Ngày thu</th>
        <th >Gửi email</th>
        <th >Phân bổ</th>
        <th >Lý do</th>
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
            <a class="call_ajax_modal" href="{{ route('payments.show',$row['_id']) }}">
            {{$row['_id']??''}}
            </a>
        </td>
        <td>
            {!! autoSuggest($row['contact_id'],'contact_id') !!}
        </td>
        <td>
            <a href="{{ route('invoices.show',$row['invoice_id']) }}">
                {{$row['invoice_id']??''}}
            </a>
        </td>
        <td>
            <div class="em-profile" data-id="{{$row['created_by']??''}}">{{$row['created_by']??''}}</div>
        </td>
        <td>
            @foreach ($row['sales'] as $sale)
            <div>
            {!! autoSuggest($sale['sale_id'],'employee_id') !!} 
                @if (count($row['sales']) > 1) 
                    {{number_format($sale['amount'])}}
                @endif
            </div>
            @endforeach
        </td>
        <td>
            <div class="em-profile" data-id="{{$row['accountant_id']??''}}">{{$row['accountant_id']??''}}</div>
        </td>
        <td class="format_price">
            {{$row['amount']??''}}
        </td>
        <td>
            {{$row['transaction_id']??''}}
        </td>
        <td>
            {{$row['status']??''}}
        </td>
        <td>
            {{__('finance.payment_type.'.$row['type'])}}
        </td>
        <td>
            <div class="em-brand" data-id="{{ $row['brand_id']??'' }}">{{ $row['brand_id']??'' }}</div>
        </td>
        <td>
            <div class="em-branch" data-id="{{ $row['branch_id']??'' }}">{{ $row['branch_id']??'' }}</div>
        </td>
        <td>
            {{date('d/m/Y H:i:s',$row['created_time'])}}
        </td>
        <td>
            {{date('d/m/Y',$row['payment_date']??'')}}
        </td>
        <td style="text-align: center">
            @if(!empty($row['is_send_mail']))
                {!!   check_is_send_mail($row['is_send_mail']) !!}
            @endif
        </td>
        <td>
            {{$row['data']??''}}
        </td>
        <td>
            {{$row['reason']??''}}
        </td>
        <td>
            <div class="dropdown dropleft">
                <a href="#" class="list-icons-item" data-toggle="dropdown">
                    <i class="icon-menu9"></i>
                </a>
                <div class="dropdown-menu">
                    {!! menuPayment($row) !!}
                </div>
            </div>
        </td>
    </tr>
    @endforeach
    </tbody>
</table>