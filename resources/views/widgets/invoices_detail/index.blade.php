<table class="table datatable-fixed-both" style="width: 100%;">
    <thead>
        <tr>
            <th>STT</th>
            <th>Sản phẩm</th>
            <th>ID</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Chi nhánh</th>
            <th>Trạng thái</th>
            <th>Thành tiền</th>
            <th>Thanh toán</th>
            <th>Nợ</th>
            <th>Đã SD</th>
            <th>Đã hoàn</th>
        </tr>
    </thead>
    <tbody id="checkbox_list">
    @php $i = 0; @endphp
    @foreach($rows as $row)
    @php $i ++; @endphp
    <tr>
        <td>
            {{$i}}
        </td>
        <td>
            {{$row['relate_name']??''}}
        </td>
        <td>
            {{$row['_id']??''}}
        </td>
        
        <td>
            {{ __('finance.prod.'.$row['relate_table']) }}
        </td>
        <td >
            {{number_format($row['sub_total']??0)}}
        </td>
        <td>
            {{$row['quantity']??''}}
        </td>
        <td>
            <div class="em-branch" data-id="{{$rowbranch_id??''}}">{{$row['branch_id']??''}}</div>
        </td>
        <td>
            {{$row['status']??''}}
        </td>
        <td >
            {{number_format($row['total']??0)}}
        </td>
        <td >
            {{number_format($row['total_paid'] ??0)}}
        </td>
        <td >
            {{number_format($row['total_debt']??0)}}
        </td>
        <td>{{number_format($row['total_used'] ?? 0)}}</td>
        <td>{{number_format($row['total_refund'] ?? 0)}}</td>
    </tr>
    @endforeach
    </tbody>
</table>