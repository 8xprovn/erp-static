@if(\Request::input('view') == 'popup' || \Request::header("view") == 'popup')
    @yield('content')
    @stack('scripts')
@elseif (\Request::header("view") == 'ajax')
    @hasSection('left-slidebar')
    @yield('left-slidebar')
    @endif
    <!-- Main content -->
    <div class="content-wrapper">
        <div class="content-inner">
            @yield('content')
        </div>
        <div class="btn-to-top btn-to-top-visible"><button type="button" class="btn btn-dark btn-icon rounded-pill"><i class="icon-arrow-up8"></i></button></div>
        @stack('scripts')
    </div>
    @hasSection('right-slidebar')
        @yield('right-slidebar')
    @endif
    <!-- Secondary sidebar -->
    
@else
<!DOCTYPE html>
<html lang="en">
<head>    
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>FINANCE - ERP - IMAP</title>

    <!-- Global stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="{{env('STATIC_URL')}}/theme/global_assets/css/icons/icomoon/styles.min.css" rel="stylesheet" type="text/css">
    <link href="{{env('STATIC_URL')}}/theme/layout_1/LTR/material/full/assets/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="{{env('STATIC_URL')}}/css/vendors.css" rel="stylesheet" type="text/css">
    <!-- /global stylesheets -->
    
    <script src="{{env('STATIC_URL')}}/theme/global_assets/js/main/jquery.min.js"></script>
    
    <script type="text/javascript">
        SITE_URL = '<?php echo url('/'); ?>';
        SERVICE_PATH = '{{env('ROUTE_PREFIX')}}';
        window.API_SERVICE_URL = '{{env('API_MICROSERVICE_URL')}}';
        window.SERVICE_MEDIA_URL = '{{env('SERVICE_MEDIA_URL')}}';
        window.SERVICE_UPLOAD_URL = '{{env('SERVICE_UPLOAD_URL')}}';
    </script>
    <meta name="robots" content="noindex, nofollow">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Dashboard </title>
    <link rel="dns-prefetch" href="{{env('STATIC_URL')}}"/>
    <style type="text/css">
        .datatable-fixed-both td, .datatable-fixed-both th{
            white-space: nowrap !important;
        }
        .modal.right .modal-dialog {
            position: fixed;
            margin-top: 0px;
            top: 0;
            overflow-y: auto;
            max-width: none;
            bottom: 0;
            margin-bottom: 0px;
            width: 84%;
            bottom: 0;
            right: 0;
            overflow-y: auto;
        }
        .modal-backdrop.show {
            opacity: 0.65;
        }
        .card-overlay {background-color: rgba(0,0,0,.5)}
        .modal.right.fade .modal-dialog {
            right: -80%;
            -webkit-transition: opacity 0.6s linear, right 0.6s ease-out;
            -moz-transition: opacity 0.6s linear, right 0.6s ease-out;
            -o-transition: opacity 0.6s linear, right 0.6s ease-out;
            transition: opacity 0.6s linear, right 0.6s ease-out;
        }
        .modal.right.fade.show .modal-dialog {
            right: 0;
        }
        .dataTables_scroll .dataTables_scrollBody {position: static !important;}

        .modal.right .modal-content{height: 100%; overflow-y: auto;}
        .select2-selection--multiple {border-bottom: 1px solid #EEE;}
        .datatable-button .dt-buttons {margin: 0;}
    </style>
    
</head>
<body class="nav-md">
<!-- <a onclick="document.getElementById('resultFrame').contentWindow.DialByLine('audio','','1002')">+1 (303) 499-7111</a> -->
<!-- <div id="contentframe" style="position:fixed; bottom: 0px; right: 5px; z-index: 99999; height: 80px;">
    <iframe height="100%" width="100%" style="width:100%; height:100%; border: none;" id="resultFrame" src="/phone/index.html"></iframe>
</div> -->
<!-- sidebar menu -->
@include('common.navbar')
<!-- /sidebar menu -->
<!-- Page content -->
    <div class="page-content">
        <!-- Page content -->
        

        <!-- Main sidebar -->
        <div class="sidebar sidebar-light sidebar-main sidebar-expand-lg">

            <!-- Sidebar content -->
            <div class="sidebar-content">
                @include('common.usermenu')
                @include('common.menu')
            </div>
        </div>

        @hasSection('left-slidebar')
            @yield('left-slidebar')
        @endif
        <!-- Main content -->
        <div class="content-wrapper">
            <div class="content-inner">
                @yield('content')
            </div>
            
        </div>
        @hasSection('right-slidebar')
            @yield('right-slidebar')
        @endif

        <!-- Secondary sidebar -->
    </div>
    
    <div class="btn-to-top btn-to-top-visible"><button type="button" class="btn btn-dark btn-icon rounded-pill"><i class="icon-arrow-up8"></i></button></div>

    <!-- Core JS files -->
    <script src="{{env('STATIC_URL')}}/js/vendors.min.js?v=3"></script>
    <script src="{{env('STATIC_URL')}}/js/app.js?v=3"></script>
    <!-- /core JS files -->
    @stack('scripts')
</body>
</html>
@endif
