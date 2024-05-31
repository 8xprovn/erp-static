<table class="table datatable-fixed-both" width="100%">
    <thead id="checkbox_all">
    <tr>
        <th>STT</th>
        <th>Mã GD</th>
        <th>Ví GD</th>
        <th>Loại GD</th>
        <th>Số tiền</th>
        <th>Số dư</th>
        <th>Trạng thái</th>
        <th>Ngày tạo</th>
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
            @if(!empty($row['reason_type']))
                {{ __('finance.wallet_transaction.reason_type.'.$row['reason_type']) }}
            @endif
        </td>
        <td>
            {{number_format($row['amount'])}}
        </td>
        
        <td>
            @if (!empty($row['balance_logs']))
            @php
            $filtered = \Arr::where($row['balance_logs'], function ($value, $key) use ($walletId){
                if ($value['wallet_id'] == $walletId) {
                    return $value;
                }
            });
            @endphp
                @if (!empty($filtered[0]))
                {{number_format($filtered[0]['after'])}}
                @endif
            @endif
        </td>
        <td>
            {{ $row['status'] }}
        </td>        
        <td>
            {{ date('d/m/Y H:i:s',$row['created_time']) }}
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