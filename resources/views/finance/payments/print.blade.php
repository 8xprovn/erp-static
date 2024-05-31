<?php
$dateUnix = strtotime($payment['payment_date']); $i = 1;
$text = ($payment['type'] == 'refund') ? 'chi' : 'thu';
?>
<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    
    
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    
    <link href="/theme/layout_1/LTR/material/full/assets/css/all.min.css" rel="stylesheet" type="text/css">
    <style>
        @page { size: auto;  margin: 0mm; size: A4;}
    </style>
</head>
<body style="background: #FFF;">
    <div style="padding: 20px; position: relative; padding-bottom: 50px;">
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
                    <img src="data:image/svg+xml;base64,{{base64_encode($qrCode)}}" alt="QR Code" style="display: block;">
                </td>
            </tr>
        </table>
        <h1 style="text-align: center; font-weight: bold; font-size: 42px; margin-top: 5px; padding-top: 20px; margin-bottom: 0; position: relative; text-transform: uppercase;">
            PHIẾU {{$text}}
            <div style="margin: 0; padding: 0; position: absolute; left: 0; top: 0;">
                
            </div>
        </h1>
        <div style="text-align: right;">
            Phiếu {{$text}} số: <b>{{$payment['_id']}}</b><br>
            Đơn hàng số: <b>{{$payment['invoice_id']}}</b>
        </div>
        <table class="table">
            <tr>
                <td width="200px">
                    Cơ sở:
                </td>
                <td >
                    {{$branch['name']??''}}
                </td>

            </tr>
            <tr>
                <td>
                    Học viên:
                </td>
                <td>
                    <b>{{$contact['fullname']??''}}</b>
                </td>
            </tr>
            <tr>
                <td>Số điện thoại:</td>
                <td>
                    <b>{{$contact['phone']??''}}</b>
                </td>
            </tr>
            
            <tr>
                <td>
                    Số tiền thanh toán:
                </td>
                <td >
                    <b>{{number_format($payment['amount'], 0, '.', '.')}}
                </td>
            </tr>
            <tr>
                <td>
                    Số tiền bằng chữ:
                </td>
                <td >
                    {{ numberInVietnameseCurrency($payment['amount']??0) }}
                </td>
            </tr>
            <tr>
                <td>
                    Nội dung thanh toán:
                </td>
                <td >
                    <i>{{$payment['type'] == 'refund' ? 'Hoàn tiền học phí' :  'Thu tiền học phí' }}  đơn hàng {{$payment['invoice_id']}}</i>
                </td>
            </tr>
            <tr>
                <td>Kèm theo:</td>
                <td >Chứng từ gốc:</td>
                
            </tr>
        </table>
        <div style="margin-top: 15px; font-style: italic; font-size: 10pt;">Để xem chi tiết đơn hàng vui lòng quét mã QR hoặc truy cập website tại địa chỉ: https://erp.ebomb.edu.vn/finance/shared/invoices/{{$payment['invoice_id']}}/{{$invoice['access_code'] ?? ''}}</div>
        <table style="width: 100%; margin-top: 20px;">
            <tr valign="top">
                <td style="width: 50%; text-align: center; height: 160px;">
                    <br>
                    <b>Người {{($payment['type'] == 'refund') ? 'nhận' : 'nộp'}} tiền</b> <br>
                </td>
                <td style="width: 50%; text-align: center;">
                    <br>
                    <b>Người lập phiếu</b> <br>

                </td>
            </tr>
            <tr>
                <td style="text-align: center;"> {{$payment['fullname']??''}}</td>
                <td style="text-align: center;">{{$created_by['fullname']??''}}</td>
                <td style="text-align: center;"></td>
            </tr>
        </table>
        @if ($payment['status']=='approved')
        <div style="position: absolute; bottom: 0px; font-style: italic; padding-top: 20px;">
            <div>
                Ký bởi: <span style="color: red;">CÔNG TY CỔ PHẦN GIÁO DỤC VÀ ĐÀO TẠO IMAP VIỆT NAM</span>
            </div>
            <img src="{{public_path('/images/logos/signed_tick.png')}}" width="70px" alt="Signed" style="position: absolute; top: 0; left: 100px; opacity: 0.6;"><br>
        </div>
        @endif
    </div>
</body>
</html>
