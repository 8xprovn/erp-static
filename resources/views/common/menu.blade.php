@php
$route = \Route::current();
$params = $route->parameters;
$routeName = $route->getName();
//var_dump($params['action'],$routeName)
@endphp
<div class="sidebar-section" id="sidebar-section">
    <ul class="nav nav-sidebar" data-nav-type="accordion">
        <!-- Main -->
        <li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs mt-1">Cá nhân</div> <i class="icon-menu" title="Main"></i></li>
        <li class="nav-item">
            <a href="{{route('home')}}" class="nav-link active">
                <i class="icon-home4"></i>
                <span>
                    Dashboard
                </span>
            </a>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-basket"></i> <span>Đơn hàng</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('invoices.me',['action' => 'created'])}}" class="nav-link {{($routeName == 'invoices.me' && !empty($params['action']) && $params['action'] == 'created') ? 'active' : ''}}">Đã tạo</a></li>
                <li class="nav-item"><a href="{{route('invoices.me',['action' => 'care'])}}" class="nav-link {{($routeName == 'invoices.me' && !empty($params['action']) && $params['action'] == 'care') ? 'active' : ''}}">Đang chăm sóc</a></li>
                <li class="nav-item"><a href="{{route('invoices.new')}}" class="nav-link {{($routeName == 'invoices.new') ? 'active' : ''}}">Chờ duyệt</a></li>
            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-cash3"></i> <span>Thanh toán</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('payments.me')}}" class="nav-link {{($routeName == 'payments.me') ? 'active' : ''}}">Thanh toán</a></li>
            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-transmission"></i> <span>Quản lý giao dịch</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">

                <li class="nav-item"><a href="{{route('wallet_transaction.created')}}" class="nav-link {{($routeName == 'wallet_transaction.created') ? 'active' : ''}}">Đã tạo</a></li>
                <li class="nav-item"><a href="{{route('wallet_transaction.deposit')}}" class="nav-link {{($routeName == 'wallet_transaction.deposit') ? 'active' : ''}}">Nạp tiền</a></li>
                <li class="nav-item"><a href="{{route('wallet_transaction.withdraw')}}" class="nav-link {{($routeName == 'wallet_transaction.withdraw') ? 'active' : ''}}">Rút tiền</a></li>
                <li class="nav-item"><a href="{{route('wallet_transaction.move')}}" class="nav-link {{($routeName == 'wallet_transaction.move') ? 'active' : ''}}">Điều chuyển tiền</a></li>
                <li class="nav-item"><a href="{{route('wallet_transaction.spend')}}" class="nav-link {{($routeName == 'wallet_transaction.spend') ? 'active' : ''}}">Chi tiền</a></li>
                <li class="nav-item"><a href="{{route('wallet_transaction.confirm', ['status'  => 'debit'])}}" class="nav-link {{($routeName == 'wallet_transaction.confirm' && !empty($params['status']) && $params['status'] == 'debit') ? 'active' : ''}}">Duyệt giao dịch thu</a></li>
                <li class="nav-item"><a href="{{route('wallet_transaction.confirm', ['status'  => 'credit'])}}" class="nav-link {{($routeName == 'wallet_transaction.confirm' && !empty($params['status']) && $params['status'] == 'credit') ? 'active' : ''}}">Duyệt giao dịch chi</a></li>

            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-lan"></i> <span>Báo cáo</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('report.payments.sales.me')}}" class="nav-link {{($routeName == 'report.payments.sales.me') ? 'active' : ''}}">Doanh số sale</a></li>
                <li class="nav-item"><a href="{{route('report.payments.details.me')}}" class="nav-link {{($routeName == 'report.payments.details.me') ? 'active' : ''}}">Doanh số sản phẩm</a></li>
            </ul>
        </li>
        <li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs mt-1">Admin</div> <i class="icon-menu" title="Main"></i></li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-basket"></i> <span>Đơn hàng</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('invoices.index')}}" class="nav-link {{($routeName == 'invoices.admin') ? 'active' : ''}}">Đơn hàng</a></li>
            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-cash3"></i> <span>Thanh toán</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('payments.index')}}" class="nav-link {{($routeName == 'payments.index') ? 'active' : ''}}">Thanh toán</a></li>
            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-wallet"></i> <span>Quản lý ví</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('wallets.index',['type' => 'user'])}}" class="nav-link {{($routeName == 'wallets.index' && !empty($params['type']) && $params['type'] == 'user') ? 'active' : ''}}">Ví người dùng</a></li>
                <li class="nav-item"><a href="{{route('wallets.index',['type' => 'system'])}}" class="nav-link {{($routeName == 'wallets.index' && !empty($params['type']) && $params['type'] == 'system') ? 'active' : ''}}">Ví hệ thống</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a href="{{route('invoice_detail_cancel.index')}}" class="nav-link {{($routeName == 'invoice_detail_cancel.index') ? 'active' : ''}}"><i class="icon-copy"></i> <span>Yêu cầu hủy dịch vụ<v/span></a>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-transmission"></i> <span>Quản lý giao dịch</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('wallet_transaction.index')}}" class="nav-link {{($routeName == 'wallet_transaction.index') ? 'active' : ''}}">Danh sách giao dịch</a></li>
            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-lan"></i> <span>Đối tác</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('bank_callback.index')}}" class="nav-link {{($routeName == 'bank_callback.index') ? 'active' : ''}}">Mpos</a></li>
                <li class="nav-item"><a href="{{route('bank_sms.index')}}" class="nav-link {{($routeName == 'bank_sms.index') ? 'active' : ''}}">SMS Chuyển khoản</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a href="{{route('date_lock.index')}}" class="nav-link {{(in_array($routeName,['date_lock.index','date_lock.create'])) ? 'active' : ''}}"><i class="icon-copy"></i> <span>Chốt kì hóa đơn </span></a>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-lan"></i> <span>Báo cáo</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('report.wallet')}}" class="nav-link {{($routeName == 'report.wallet') ? 'active' : ''}}">Ví</a></li>
                <li class="nav-item"><a href="{{route('report.invoices')}}" class="nav-link {{($routeName == 'report.invoices') ? 'active' : ''}}">Hóa đơn</a></li>
                <li class="nav-item"><a href="{{route('report.payments')}}" class="nav-link {{($routeName == 'report.payments') ? 'active' : ''}}">Thanh toán</a></li>
                <li class="nav-item"><a href="{{route('report.payments.sales')}}" class="nav-link {{($routeName == 'report.payments.sales') ? 'active' : ''}}">Doanh số sale</a></li>
                <li class="nav-item"><a href="{{route('report.payments.details')}}" class="nav-link {{($routeName == 'report.payments.details') ? 'active' : ''}}">Doanh số sản phẩm</a></li>
                <li class="nav-item"><a href="{{route('report.wallet_transaction')}}" class="nav-link {{($routeName == 'report.wallet_transaction') ? 'active' : ''}}">Giao dịch ví</a></li>
            </ul>
        </li>
        <li class="nav-item nav-item-submenu">
            <a href="#" class="nav-link"><i class="icon-cog4"></i> <span>Cài đặt</span></a>
            <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                <li class="nav-item"><a href="{{route('transaction_type.index')}}" class="nav-link {{($routeName == 'transaction_type.index') ? 'active' : ''}}">Loại giao dịch</a></li>
            </ul>
        </li>
    </ul>
</div>
@push('scripts')
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded',function(){
        $("#sidebar-section").find(".nav-link").bind("click",function() {
            $("#sidebar-section").find(".active").removeClass("active");
            $(this).addClass("active");
        })
        $("#sidebar-section").find(".active").each(function(){
            $(this).closest('.nav-item-submenu').addClass('nav-item-expanded nav-item-open');
        });
    });
</script>
@endpush
