<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="/theme/layout_1/LTR/material/full/assets/css/all.min.css" rel="stylesheet" type="text/css">
</head>
<body style="background: #ffffff;">
    <div style="margin: 20px; padding-bottom: 50px;">
        <table style="width: 100%;">
            <tr style="vertical-align:middle;">
                <td>
                    <b>CÔNG TY CP GIÁO DỤC VÀ ĐÀO TẠO IMAP VIỆT NAM</b>
                    <br>
                    <b>Địa chỉ:</b> 14 Trần Kim Xuyến, Cầu Giấy, Hà Nội <br>
                    <b>Điện thoại:</b>{{$brand['hotline'] ?? ''}}
                    <br>
                    <b>Email:</b> contact@imap.edu.vn<br>
                </td>
                <td align="right" width="100px">
                    
                </td>
            </tr>
        </table>
        <h1 style="text-align: center; font-weight: bold; font-size: 42px; margin-top: 5px; padding-top: 20px; margin-bottom: 0; position: relative; text-transform: uppercase;">
            ĐƠN HÀNG
        </h1>
        <div style="text-align: right;">
            Đơn hàng số: <h2 style="display: inline;">{{$invoice['_id']??''}}</h2>
        </div>
        <table class="table table-borderless">
            <tr>
                <td width="200px">Cơ sở:</td>
                <td >{{$branchDetail['name']??''}}</td>
            </tr>
            <tr>
                <td >Họ tên học viên:</td>
                <td >{{$contact['fullname']??''}}</td>
            </tr>
            <tr>
                <td >Số điện thoại:</td>
                <td >{{$contact['phone']??''}}</td>
            </tr>
            <tr>
                <td >Email:</td>
                <td >{{$contact['email']??''}}</td>
            </tr>
        </table>
        <table class="table">
            <tr>
                <th width="30px">STT</th>
                <th>Sản phẩm</th>
                <th>SL</th>
                <th>Đơn vị</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>
            <tr>
                <td >(1)</td>
                <td >(2)</td>
                <td>(3)</td>
                <td>(4)</td>
                <td>(7)</td>
                <td>(8)</td>
            </tr>
            @php 
            $i = 1; 
            
            @endphp
            @foreach ($rows as $row)
            <tr>
                <td >
                    {{$i}}
                </td>
                <td >
                    {{$row['relate_name']}}
                    <br>
                    {{__('finance.prod.'.$row['relate_table'])}}
                </td >
                <td >
                    {{$row['quantity']}}
                </td>
                <td>
                    {{__('finance.prod.unit.'.$row['relate_table'])}}
                </td>
                <td>
                    {{number_format($row['sub_total'], 0, '.', '.')}}
                </td>
                <td >
                    {{number_format($row['total'], 0, '.', '.')}}
                </td>
            </tr>
            @endforeach
        </table>
        <div class="row">
            <div class="col-lg-8">
                <h5 style="margin-left: 30px;">
                    Chữ ký học viên
                </h5>
                
            </div>
            <div class="col-lg-4">
                <table class="table">
                    <tr>
                        <td >Tổng tiền gốc</td>
                        <td>{{number_format($invoice['original_amt'], 0, '.', '.')}}</td>
                    </tr>
                    
                    <tr>
                        <td >Ưu đãi giảm giá</td>
                        <td>{{number_format($invoice['discount_other_amt'], 0, '.', '.')}}</td>
                    </tr>
                    <tr>
                        <td >Hủy dịch vụ</td>
                        <td>{{number_format($invoice['cancelled_amt'], 0, '.', '.')}}</td>
                    </tr>
                    <tr>
                        <td >Tổng tiền</td>
                        <td>{{number_format($invoice['total_amt'], 0, '.', '.')}}</td>
                    </tr>
                    <tr>
                        <td >Đã thanh toán</td>
                        <td>{{number_format($invoice['total_amt'] - $invoice['debt_amt'], 0, '.', ',')}}</td>
                    </tr>
                    <tr>
                        <td >Chưa thanh toán</td>
                        <td>{{number_format($invoice['debt_amt'], 0, '.', ',')}}</td>
                    </tr>
                </table>
            </div>
        </div>
        
    </div>

</body>
</html>
