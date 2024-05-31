@extends('common.filter_layout')
@section('section_filter')
<!-- Sidebar search -->
@if (!empty($groupData))
<div class="sidebar-section">
    <div class="sidebar-section-header">
        <span class="font-weight-semibold">Nhóm theo</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search-4" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>
    
    <div class="collapse show" id="sidebar-search-4">
        <div class="sidebar-section-body">
			<div class="form-group">
				<label class="control-label">Nhóm</label>
				<select name="group[]" multiple class="multiselect form-control">
					@foreach($groupData as $g)
					<option value="{{$g}}" <?php echo !empty($group) && (in_array($g, $group))  ? 'selected' : '' ?>>
						{{__('field.'.$g)}}
					</option>
					@endforeach
				</select>
			</div>
        </div>    
    </div>   
</div>
@endif
<div class="sidebar-section">
    <div class="sidebar-section-header">
        <span class="font-weight-semibold">Cơ bản</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search-1" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>
    
    <div class="collapse show" id="sidebar-search-1">
        <div class="sidebar-section-body">
            @if (empty($groupData))
            <div class="form-group">
                <label class="control-label">Mã hóa đơn</label>
                <input type="text" name="filter[_id]" placeholder="Theo mã hóa đơn" class="form-control" value="{{$filter['_id']??''}}">
            </div>
            <div class="form-group">
                <label class="control-label">Email / Số điện thoại </label>
                <input type="text" name="filter[emailphone]" placeholder="" class="form-control" value="{{$filter['emailphone']??''}}">
            </div>   
            @endif 
            <div class="form-group">
                <label class="control-label">Trạng thái</label>
                <select class="form-control multiselect-basic" multiple name="filter[status][]">
                    @foreach (config('data.invoice_status') as $value)
                    <option <?php echo !empty($filter['status']) && in_array($value, $filter['status']) ? 'selected' : '' ?> value="{{$value}}">{{ __('finance.invoice_status.'.$value) }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label class="control-label">Xác thực</label>
                <select class="form-control" name="filter[is_verified]">
                    <option value="">Chọn trạng thái</option>
                    <option <?php echo isset($filter['is_verified']) && $filter['is_verified'] == 0 ? 'selected' : '' ?> value="0">Chưa xác thực</option>
                    <option <?php echo isset($filter['is_verified']) && $filter['is_verified'] == 1 ? 'selected' : '' ?> value="1">Đã xác thực</option>
                </select>
            </div>
            <div class="form-group">
                <label class="control-label">Ngày tạo từ</label>
                <div class="input-group">
                    <input type="text" name="filter[created_time][gte]" placeholder="" autocomplete="off" class="datepicker form-control" value="{{date('d/m/Y', strtotime($filter['created_time']['gte']??''))}}">    
                </div>
            </div>
            <div class="form-group">
                <label class="control-label">Ngày kết thúc</label>
                <div class="input-group">
                    <input type="text" name="filter[created_time][lte]" placeholder="" autocomplete="off" class="datepicker form-control" value="{{date('d/m/Y', strtotime($filter['created_time']['lte']??''))}}">
                </div>
            </div>
        </div>    
    </div>   
</div>
<div class="sidebar-section">
    <div class="sidebar-section-header">
        <span class="font-weight-semibold">Thương hiệu / chi nhánh</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search-2" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>
    
    <div class="collapse" id="sidebar-search-2">
        <div class="sidebar-section-body">
            <div class="form-group">
                <label class="control-label">Theo thương hiệu</label>
                <select name="filter[brand_id][]" data-module="brand" multiple data-query-status="1" class="em-brand select2_multiple select2_suggest form-control-sm" placeholder="Chọn thương hiệu">
                    <option value="">Chọn thương hiệu</option>
                    @if(!empty($filter['brand_id']))
                        @foreach ($filter['brand_id'] as $branch_id)
                        <option value="{{$branch_id}}" selected>{{$branch_id}}</option>
                        @endforeach
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label class="control-label">Chọn chi nhánh</label>
                <select name="filter[branch_id][]" multiple data-module="branch" data-query-status="active" class="em-branch select2_suggest form-control form-control-sm" data-placeholder="Chọn chi nhánh">
                    <option value="">Chọn chi nhánh</option>
                    @if (!empty($filter['branch_id']))
                        @foreach ($filter['branch_id'] as $branch_id)
                            <option value="{{$branch_id}}" selected>{{$branch_id}}</option>
                        @endforeach
                    @endif
                </select>
            </div>
        </div>    
    </div>   
</div>
<div class="sidebar-section">
    <div class="sidebar-section-header">
        <span class="font-weight-semibold">Theo nhân viên</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search-3" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>
    <div class="collapse" id="sidebar-search-3">
        <div class="sidebar-section-body">
            <div class="form-group">
                <label class="control-label">Người tạo</label>
                <select data-module="employee" class="form-control em-profile select2_suggest" multiple placeholder="Người tạo" name="filter[employee_id]">
                    @if(!empty($filter['employee_id']))
                        <option value="{{$filter['employee_id']}}" selected>{{$filter['employee_id']}}</option>
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label class="control-label">Người quản lý</label>
                <select data-module="employee" class="form-control em-profile select2_suggest" placeholder="Chọn sale" multiple name="filter[sale_id]">
                    @if(!empty($filter['sale_id']))
                        <option value="{{$filter['sale_id']}}" selected>{{$filter['sale_id']}}</option>
                    @endif
                </select>
            </div>
        </div>    
    </div>   
</div>
<!-- /sidebar search -->

@endsection