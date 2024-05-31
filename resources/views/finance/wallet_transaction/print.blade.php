<?php
$dateUnix = strtotime($row->created_time); $i = 1;
     if($row->reason_type == 'withdraw'){
         $text = 'chi';
     }elseif($row->reason_type == 'deposit'){
         $text = 'thu';
     }elseif($row->reason_type == 'payment'){
         $text = 'thanh toán';
     }
    /*switch ($wallet->relate_type) {
        case 'contact':
            $wallet_row = 'Học viên';
            break;
        case 'branch':
            $wallet_row = 'Cơ sở';
            break;
        default:
            $wallet_row = 'Tài khoản';
    }
    switch ($wallet_receive->relate_type) {
        case 'contact':
            $wallet_receive_row = 'Học viên';
            break;
        case 'branch':
            $wallet_receive_row = 'Cơ sở';
            break;
        default:
            $wallet_receive_row = 'Tài khoản';
    }*/
?>
    <!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @page { size: auto;  margin: 0mm; size: A4;}
        *{ font-family: 'DejaVu Sans' !important; font-size: 13px;}
        html, body {
            width: 210mm;
            height: 297mm;
        }
    </style>

</head>
<body style="background: #ffffff; line-height: 1.3; margin: auto;">
<div style="overflow: hidden; padding: 15px; border: 2px solid red; position: absolute; left: 10px; right: 10px; top: 10px; bottom: 10px;">
    <table style="width: 100%;">
        <tr style="vertical-align:middle;">
            <td width="300px" style="text-align: left;">
                <img src="data:image/png;base64,{{base64_encode(file_get_contents(public_path('/images/logos/file logo-02.png')))}}" width="200px" alt="QR Code" style="display: block; margin: 0; padding: 0; width: 200px;"><br>
            </td>
            <td>
                <b>CÔNG TY CP GIÁO DỤC VÀ ĐÀO TẠO IMAP VIỆT NAM</b>
                <br>
                <b>Địa chỉ:</b> 14 Trần Kim Xuyến, Cầu Giấy, Hà Nội <br>
                <b>Điện thoại:</b> 0903 411 666
                <br>
                <b>Email:</b> contact@imap.edu.vn<br>
            </td>
        </tr>
    </table>
    <h1 style="text-align: center; font-size: 42px; margin-top: 5px; padding-top: 20px; margin-bottom: 0; position: relative; text-transform: uppercase;">
        PHIẾU {{ $text }}
        <div style="margin: 0; padding: 0; position: absolute; left: 0; top: 0;">
        </div>
    </h1>
    <div style="text-align: right;">
        Phiếu {{$text}} số: <b>{{$row->transaction_id??''}}</b>
    </div>
    <div style="margin-top: 15px; border: 1px solid #999; padding-left: 5px; padding-top: 10px; padding-bottom: 10px;">
        <table width="100%">
            @if($row->reason_type == 'payment')
                <tr>
                    <td style="padding-top: 5px;">
                        <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">
                            Cơ sở thu tiền:
                        </div>
                        <div style="border-bottom: 1px dashed #DDD;">
                            <b>
                                {{ $branch_name??'' }}
                            </b>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 5px;" >
                        <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">
                           Tên Học viên :
                        </div>
                        <div style="border-bottom: 1px dashed #DDD;">
                            <b>
                                {{ $wallet_name??'' }}
                            </b>
                        </div>
                    </td>
                    <td style="padding-top: 5px; ">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-cell; width: 90px; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Số điện thoại:</div>
                            <div style="display: table-cell; border-bottom: 1px dashed #DDD; vertical-align: bottom;">
                                <b>
                                    {{$wallet_phone??''}}
                                </b>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 5px;">
                        <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">
                           Người thanh toán:
                        </div>
                        <div style="border-bottom: 1px dashed #DDD;">
                            <b>
                                {{ $payment_contact['fullname']??'' }}
                            </b>
                        </div>
                    </td>
                    <td style="padding-top: 5px; ">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-cell; width: 90px; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Số điện thoại:</div>
                            <div style="display: table-cell; border-bottom: 1px dashed #DDD; vertical-align: bottom;">
                                <b>
                                    {{ $payment_contact['phone']??'' }}
                                </b>
                            </div>
                        </div>
                    </td>
                </tr>
            @else
                <tr>
                    <td style="padding-top: 5px;" >
                        <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">
                           @switch($row->reason_type)
                               @case('withdraw')
                                    Người nhận tiền
                               @break
                               @case('deposit')
                                   Người nộp tiền
                               @break
                               @case('move')
                                    Ví nhận
                               @break
                               @default
                           @endswitch
                        </div>
                        <div style="border-bottom: 1px dashed #DDD;">
                            <b>
                                @switch($row->reason_type)
                                    @case('withdraw')
                                    {{$wallet_name??''}}
                                    @break
                                    @case('deposit')
                                        {{$wallet_receive_name??''}}
                                    @break
                                    @case('move')
                                    Ví nhận
                                    @break
                                    @default
                                @endswitch
                            </b></div>
                    </td>
                    <td style="padding-top: 5px; ">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-cell; width: 90px; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Số điện thoại:</div>
                            <div style="display: table-cell; border-bottom: 1px dashed #DDD; vertical-align: bottom;">
                                <b>
                                    @switch($row->reason_type)
                                        @case('withdraw')
                                        {{$wallet_phone??''}}
                                        @break
                                        @case('deposit')
                                        {{$wallet_receive_phone??''}}
                                        @break
                                        @case('move')
                                        Ví nhận
                                        @break
                                        @default
                                    @endswitch
                                </b>
                            </div>
                        </div>
                    </td>
                </tr>
            @endif
            <tr>
                <td style="padding-top: 5px;">
                    <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">
                       Mã khách hàng
                    </div>
                    <div style="border-bottom: 1px dashed #DDD;"><b>{{$contact_id??''}}</b></div>
                </td>
{{--                <td style="padding-top: 5px; ">--}}
{{--                    <div style="display: table; width: 100%;">--}}
{{--                        <div style="display: table-cell; width: 90px; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Số điện thoại:</div>--}}
{{--                        <div style="display: table-cell; border-bottom: 1px dashed #DDD; vertical-align: bottom;"><b>{{$wallet_receive_phone??''}}</b></div>--}}
{{--                    </div>--}}
{{--                </td>--}}
            </tr>
            <tr>
                <td style="padding-top: 5px;" colspan="2">
                    <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Số tiền thanh toán:</div>
                    <div style="border-bottom: 1px dashed #DDD;"><b>{{number_format($row->amount, 0, '.', '.')}}</b></div>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px;" colspan="2">
                    <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Số tiền bằng chữ:</div>
                    <div style="border-bottom: 1px dashed #DDD;"><i>{{ numberInVietnameseCurrency($row->amount??0) }}</i></div>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px;" colspan="2">
                    <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Nội dung thanh toán:</div>
                    <div style="border-bottom: 1px dashed #DDD;"><i>{{ $row->content??'' }}</i></div>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px;">
                    <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">Kèm theo:</div>
                    <div style="border-bottom: 1px dashed #DDD;">&nbsp;&nbsp;</div>
                </td>
                <td style="padding-top: 5px;">
                    <div style="float: left; margin-right: 10px; padding-right: 5px; background: #FFF; padding-bottom: 5px;">chứng từ gốc:</div>
                    <div style="border-bottom: 1px dashed #DDD;">&nbsp;&nbsp;</div>
                </td>
            </tr>
        </table>
    </div>
    <table style="width: 100%; margin-top: 20px;">
        <tr valign="top">
            <td style="width: 33%; text-align: center; height: 160px;">
                <br>
                <b>
                    @if($row->reason_type == 'withdraw')
                        Người nhận tiền
                    @elseif($row->reason_type == 'deposit' || $row->reason_type == 'payment')
                        Người nộp tiền
                    @endif
                </b> <br>
            </td>
            <td style="width: 33%; text-align: center;">
                <br>
                <b>Người lập phiếu</b> <br>

            </td>
            <td style="width: 33.3333%; text-align: center;">
                Ngày {{date('d',$dateUnix)}} tháng {{date('m',$dateUnix)}} năm {{date('Y',$dateUnix)}}<br>
                <b>
                @if($row->reason_type == 'withdraw')
                    Thủ quỹ
                @else
                    Người thu tiền
                @endif
                </b><br>
            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                @if($row->reason_type == 'withdraw')
                    {{$wallet_name??''}}
                @elseif($row->reason_type == 'deposit' || $row->reason_type == 'payment')
                    {{$wallet_receive_name??''}}
                @endif
                {{$payment->fullname??''}}
            </td>
            <td style="text-align: center;">{{$created_by['fullname']??''}}</td>
            <td style="text-align: center;"></td>
        </tr>
    </table>
    @if ($row->status=='approved')
        <div style="position: absolute; bottom: 0px; font-style: italic; padding-top: 20px;">
            <div>
                Ký bởi: <span style="color: red;">CÔNG TY CỔ PHẦN GIÁO DỤC VÀ ĐÀO TẠO IMAP VIỆT NAM</span>
            </div>
            <img src="data:image/png;base64,{{base64_encode(file_get_contents(public_path('/images/logos/signed_tick.png')))}}" width="70px" alt="Signed" style="position: absolute; top: 0; left: 100px; opacity: 0.6;"><br>
        </div>
    @endif
</div>
</body>
</html>
