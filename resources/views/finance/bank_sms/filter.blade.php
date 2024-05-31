@extends('common.filter_layout')
@section('section_filter')
<div class="sidebar-section">
    <div class="sidebar-section-header">
        <span class="font-weight-semibold">Sidebar search</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>
    <div class="collapse show" id="sidebar-search-1">
        <div class="sidebar-section-body">
            <div class="form-group">
                <label class="control-label" for="name">Ngân hàng </label>
                <select name="filter[bank_code]" class="multiselect-basic" placeholder="Chọn ngân hàng">
                    <option value="">Chọn ngân hàng</option>
                    <option {{(!empty($filter['bank_code']) && $filter['bank_code'] == "Vietcombank") ? 'selected' : '';}} value="Vietcombank">VCB</option>
                    <option {{(!empty($filter['bank_code']) && $filter['bank_code'] == "SCB") ? 'selected' : '';}} value="SCB">SCB</option>
                </select>
            </div>


            <div class="form-group">
                <label class="control-label" for="name">Trạng thái </label>
                <select name="filter[status]" class="multiselect-basic" placeholder="Chọn trạng thái">
                    <option value="">Chọn trạng thái</option>
                    <option {{(!empty($filter['status']) && $filter['status'] == "error") ? 'selected' : '';}} value="error">Thất bại</option>
                    <option {{(!empty($filter['status']) && $filter['status'] == "success") ? 'selected' : '';}} value="success">Thành công</option>
                </select>
            </div>
            <div class="form-group">
                <label class="control-label" for="name">Từ ngày </label>
                <div class="input-group">
                    <input type="text" name="filter[from_date]" placeholder="" class="form-control datepicker" value="{{$filter['from_date']??''}}">
                </div>
            </div>


            <div class="form-group">
                <label class="control-label" for="name">Đến ngày </label>
                <div class="input-group">
                    <input type="text" name="filter[to_date]" placeholder="" class="form-control datepicker" value="{{$filter['to_date']??''}}">
                </div>
            </div>


            <div class="form-group">
                <label class="control-label" for="name">Số tài khoản </label>
                <input type="text" name="filter[bank_account]" placeholder="" class="form-control" value="{{$filter['bank_account']??''}}">
            </div>
        </div>
    </div>
</div>
@endsection

