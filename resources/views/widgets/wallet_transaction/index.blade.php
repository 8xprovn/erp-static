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
            {{ $row['status'] }}
        </td>
        <td>
            {{ $row['method'] ?? ''}}
        </td>
        <td>
            <div class="em-profile" data-id="{{$row['created_by']}}">{{$row['created_by']}}</div>
        </td>
        
        <td>
            {{ date('d/m/Y H:i:s',$row['created_time']) }}
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