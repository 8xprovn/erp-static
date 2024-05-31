<table class="table datatable-fixed-both" width="100%">
    <thead id="checkbox_all">
    <tr>
        <th>Hóa đơn</th>
        <th>Chi tiết hóa đơn</th>
        <th>Giá trị hóa đơn</th>
        <th>Trạng thái hóa đơn</th>
        <th>Sử dụng dự kiến</th>
        <th>Sử dụng thực tế</th>
        <th>Số tiền hoàn</th>
        <th>Trạng thái</th>
        <th>Lý do</th>
        <th style="width: 40px">Thao tác</th>
    </tr>
    </thead>
    <tbody id="checkbox_list">
    @foreach($rows as $row)
    <tr>
        <td>
            <a href="{{route('invoices.show',[$row['invoice_id']??''])}}" target="_blank">{{$row['invoice_id']??''}}</a>
        </td>
        <td>
            <a href="{{route('invoices.show',[$row['invoice_id']??''])}}" target="_blank">{{$row['invoice_detail_id']??''}}</a>
        </td>


        <td class="format_price">
            {{$detailData[$row['invoice_detail_id']]['total']??''}}
        </td>
        <td>
            {{$detailData[$row['invoice_detail_id']]['status']??''}}
        </td>
        <td class="format_price">
            {{$row['amount_default']??''}}
        </td>
        <td class="format_price">
            {{$row['amount_used']??0}}
        </td>
        <td class="format_price">
            {{$row['amount']??''}}
        </td>
        <td>
            {{ $row['status']??'' }}
        </td>
        <td>
            {{ $row['reason']??'' }}
        </td>
        <td>
            <div class="dropdown dropleft">
                <a href="#" class="list-icons-item" data-toggle="dropdown">
                    <i class="icon-menu9"></i>
                </a>
                <div class="dropdown-menu">
                    @if($row['status'] == 'open')
                    <a href="javascript:;" data-url="{{route('invoice_detail_cancel.edit', $row['_id']??'')}}" class="call_ajax_modal dropdown-item">Duyệt</a>
                    @else
                    <a href="javascript:;" data-url="{{route('invoice_detail_cancel.show', $row['_id']??'')}}" class="call_ajax_modal dropdown-item">Xem</a>
                    @endif
                </div>
            </div>
        </td>
        
    </tr>
    @endforeach
    </tbody>
</table>

