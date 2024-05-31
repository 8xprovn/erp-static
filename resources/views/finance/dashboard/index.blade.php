@extends('layout.app')
@section('content')    
@include('common.content_header')            
@php  
    $arrDataChart[] = ['Ngày', 'Thu', 'Hoàn'];

    foreach($paymentSales as $date => $saleDate) {
        
        $date = date('d/m/Y',$saleDate['_id'][1]);
        if (empty($arrDataChart[$date])) {
            $arrDataChart[$date] = [$date,0,0];
        }
        if ($saleDate['_id'][0] == 'default') {
            $arrDataChart[$date][1] = $saleDate['total'];
        } 
        else {
            $arrDataChart[$date][2] = $saleDate['total'];
        }
        if (empty($arrPaymentData[$saleDate['_id'][0]])) {
            $arrPaymentData[$saleDate['_id'][0]] = ['total' => 0, 'count' => 0];
        }
        $arrPaymentData[$saleDate['_id'][0]]['total'] +=  $saleDate['total'];
        $arrPaymentData[$saleDate['_id'][0]]['count'] +=  $saleDate['count'];
        
    }
    $arrDataChart = array_values($arrDataChart);
@endphp
<div class="content">
    <!-- Quick stats boxes -->
    <div class="row">
        <div class="col-sm-6 col-xl-3">
            <div class="card card-body bg-primary text-white has-bg-image">
                <div class="media">
                    <div class="media-body">
                        <span class="text-uppercase font-size-xs">Tổng phiếu thu:</span>
                        <h3 class="mb-0">{{number_format($arrPaymentData['default']['total'] ?? 0)}} vnđ</h3>
                        <h6 class="mb-0">{{number_format($arrPaymentData['default']['count'] ?? 0)}} hóa đơn</h6>
                    </div>

                    <div class="ml-3 align-self-center">
                        <i class="icon-bubbles4 icon-3x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="card card-body bg-success text-white has-bg-image">
                <div class="media">
                    <div class="mr-3 align-self-center">
                        <i class="icon-pointer icon-3x opacity-75"></i>
                    </div>
                    <div class="media-body text-right">
                        <span class="text-uppercase font-size-xs">Hoàn tiền</span>
                        <h3 class="mb-0">{{number_format($arrPaymentData['refund']['total'] ?? 0)}} vnđ</h3>
                        <h6 class="mb-0">{{number_format($arrPaymentData['refund']['count'] ?? 0)}} hóa đơn</h6>
                    </div>
                </div>
            </div>
        </div>
        @if (!empty($invoices))
        <div class="col-sm-6 col-xl-3">
            <div class="card card-body bg-danger text-white has-bg-image">
                <div class="media">
                    <div class="media-body">
                        <h3 class="mb-0 format_price">{{number_format($invoices->count)}}</h3>
                        <span class="text-uppercase font-size-xs">Hóa đơn</span>
                    </div>

                    <div class="ml-3 align-self-center">
                        <i class="icon-bag icon-3x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
        @endif
        
        

        <div class="col-sm-6 col-xl-3">
            <div class="card card-body bg-indigo text-white has-bg-image">
                <div class="media">
                    <div class="mr-3 align-self-center">
                        <i class="icon-enter6 icon-3x opacity-75"></i>
                    </div>

                    <div class="media-body text-right">
                        <span class="text-uppercase font-size-xs">Công nợ</span>
                        <h3 class="mb-0">{{number_format($debitAmount[0]['total'] ?? 0)}} vnđ</h3>
                        <h6 class="mb-0">{{number_format($debitAmount[0]['count'] ?? 0)}} hóa đơn</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /quick stats boxes -->
    <!-- Main charts -->
    <div class="row">
        <div class="col-xl-7">
            <!-- CHART SALE -->
            <div class="card">
                <div class="card-header header-elements-inline bg-">
                    <h5 class="card-title">Doanh thu theo ngày</h5>
                    <div class="header-elements">
                        <a class="btn btn-primary" href="{{route('invoices.create')}}">Tạo hóa đơn</a>
                    </div>
                    
                </div>
                <div class="card-body" id="columnchart_material">
                </div>
            </div>
            <!-- END CHART SALE -->
        </div>
        @if (!empty($pendingTransaction))
        <div class="col-xl-5" id="dashboard-sale-statistic">
            <!-- Sales stats -->
            <div class="card">
                @foreach($pendingTransaction as $k => $trans) 
                <div class="card-header header-elements-inline bg-">
                    <h5 class="card-title">Giao dịch {{$k}}</h5>
        
                </div>

                <div class="card-body py-0">
                    <div class="row text-center">
                        @foreach ($trans as $trans)
                        <div class="col-4">
                            <div class="mb-3">
                                <h2 class="font-weight-semibold mb-0">{{$trans->count ?? 0}}</h2>
                                <span class="text-muted font-weight-semibold">{{$trans->reason_type}}</span>
                            </div>
                        </div>
                        @endforeach
                       
                    </div>
                </div>
                 @endforeach
            </div>
            <!-- /sales stats -->

        </div>
        @endif
    </div>
</div>

@stop
@push('scripts')
<script src="https://www.gstatic.com/charts/loader.js"></script>
@if (!empty($arrDataChart))
<script type="text/javascript">
    google.charts.load('current', {'packages':['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable({!!json_encode($arrDataChart)!!});

        // var options = {
        //   chart: {
        //     title: 'Company Performance',
        //     subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        //   }
        // };
        var options = {
          bars: 'horizontal' // Required for Material Bar Charts.
        };


        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data,google.charts.Bar.convertOptions(options));
    }
    $(window).resize(function(){
      drawChart();
    });

</script>
@endif
@endpush