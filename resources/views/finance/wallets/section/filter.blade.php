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
                <label class="control-label" >Mã ví</label>
                <input type="text" name="filter[_id]" placeholder="" class="form-control" value="{{$filter['_id']??''}}">
            </div>
            @if ($type == 'user')
            <div class="form-group">
                <label class="control-label" >Email / Số điện thoại </label>
                <input type="text" name="filter[emailphone]" placeholder="" class="form-control" value="{{$filter['emailphone']??''}}">
            </div>
            @else
            <div class="form-group">
                <label class="control-label" >Loại ví</label>
                <select name="filter[relate_type][]" multiple class="multiselect form-control">
                    @foreach (config('data.wallet_relate_type') as $relate_type)
                    <option value="{{$relate_type}}" <?php echo !empty($filter['relate_type']) && (in_array($relate_type, $filter['relate_type']))  ? 'selected' : '' ?>>{{$relate_type}}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label class="control-label" >Số tài khoản</label>
                <input type="text" name="filter[relate_id]" placeholder="" class="form-control" value="{{$filter['relate_id']??''}}">
            </div>
            @endif
            <div class="form-group">
                <label class="control-label" >Trạng thái</label>
                <select name="filter[status]" class="form-control">
                    <option value="">Chọn trạng thái</option>
                    <option value="active" <?php echo !empty($filter['status']) && $filter['relate_type'] == 'active'  ? 'selected' : '' ?>>Đang hoạt động</option>
                    <option value="inactive" <?php echo !empty($filter['status']) && $filter['relate_type'] == 'inactive'  ? 'selected' : '' ?>>Dừng hoạt động</option>
                </select>
            </div>
        </div>
    </div>
</div>
@endsection