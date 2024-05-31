<?php
$dateUnix = strtotime($payment->payment_date); $i = 1;
?>
<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @page { size: auto;  margin: 0mm; }
    </style>

</head>
<body style="background: #ffffff; font-family: Times New Roman; font-size: 14px; line-height: 1.5; margin: auto; max-width: 800px;">
    <h3>Kính gửi bạn: {{$contact['fullname']??''}},</h3>
    <span> Hệ thống {{$brand['name']}} xin trân trọng cảm ơn học viên đã đăng ký khóa học tại trung tâm.</span><br>
    <p>Chúng tôi nhận được khoản thanh toán của bạn chi tiết như <b>file đính kèm</b></p>
    Bạn vui lòng kiểm tra thông tin thanh toán. Nếu có bất kỳ sai sót nào vui lòng liên hệ theo thông tin sau để được hỗ trợ:
    <br><br>
    <span style="font-weight: bold;">{{$brand['name']}} - {{$brand['hotline'] ?? ''}}</span><br>
    <span style="font-weight: bold;">
        Email: contact@imap.edu.vn
    </span><br><br>
    Một lần nữa, xin chân thành cảm ơn bạn đã tin tưởng và lựa chọn Hệ thống {{$brand['name']}}
</body>
</html>
