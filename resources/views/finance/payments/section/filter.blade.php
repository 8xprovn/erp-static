@extends('common.filter_layout')
@section('section_filter')
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
				<label class="control-label" for="name">Nhóm</label>
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
		<span class="font-weight-semibold">Thông tin cơ bản</span>
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
				<label class="control-label" for="name">Theo mã hóa đơn</label>
				<input type="text" name="filter[invoice_id]" placeholder="" class="form-control" value="{{$filter['invoice_id']??''}}">
			</div>
			<div class="form-group">
				<label class="control-label" for="name">Theo mã thanh toán</label>
				<input type="text" name="filter[payment_id]" placeholder="" class="form-control" value="{{$filter['payment_id']??''}}">
			</div>
			<div class="form-group">
				<label class="control-label" for="name">Email / Số điện thoại </label>
				<input type="text" name="filter[emailphone]" placeholder="" class="form-control" value="{{$filter['emailphone']??''}}">
			</div>
			@endif


			
			<div class="form-group">
				<label class="control-label" for="name">Loại</label>
				<select name="filter[type][]" multiple class="multiselect form-control"">
					
					<?php foreach (config('data.payment_type') as $key => $value) { ?>
					<option value="{{$value}}" <?php echo !empty($filter['type']) && (in_array($value,$filter['type'])) ? 'selected' : '' ?>>
						{{ __('finance.payment_type.'.$value) }}
					</option>
					<?php } ?>
				</select>
			</div>
			<div class="form-group">
				<label class="control-label" for="name">Theo phương thức</label>
				<select name="filter[method][]" multiple class="multiselect form-control">

					<?php foreach (config('data.payment_method') as  $value) { ?>
					<option value="{{$value}}" <?php echo !empty($filter['method']) && (in_array($value, $filter['method']))  ? 'selected' : '' ?>>
						{{ __('finance.payment_method.'.$value) }}
					</option>
					<?php } ?>
				</select>
			</div>
			<div class="form-group">
				<label class="control-label" for="name">Theo trạng thái</label>
				<select name="filter[status][]" multiple class="multiselect form-control"">
					
					<?php foreach (config('data.payment_status') as $key => $value) { ?>
					<option value="{{$value}}" <?php echo !empty($filter['status']) && (in_array($value,$filter['status'])) ? 'selected' : '' ?>>
						{{ __('finance.payment_status.'.$value) }}
					</option>
					<?php } ?>
				</select>
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
				<label class="control-label" for="name">Thương hiệu</label>
				<select name="filter[brand_id][]" multiple class="em-brand select2_suggest form-control" data-module="brand">
					@if (!empty($filter['brand_id']))
						@foreach ($filter['brand_id'] as $brand_id)
						<option value="{{$brand_id}}" selected>{{$brand_id}}</option>
						@endforeach
					@endif
				</select>
			</div>

			<div class="form-group">
				<label class="control-label" for="name">Thương hiệu gốc</label>
				<select name="filter[og_brand_id][]" multiple class="em-brand select2_suggest form-control" data-module="brand">
					@if (!empty($filter['og_brand_id']))
						@foreach ($filter['og_brand_id'] as $brand_id)
						<option value="{{$brand_id}}" selected>{{$brand_id}}</option>
						@endforeach
					@endif
				</select>
			</div>
            <div class="form-group">
				<label class="control-label" for="name">Cơ sở</label>
				<select name="filter[branch_id][]" data-module="branch" multiple class="select2_suggest em-branch form-control">
					<option value="">---</option>
					@if(!empty($filter['branch_id']))
						<option value="{{$filter['branch_id']??''}}" selected>{{$filter['branch_id']}}</option>
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
				<label class="control-label" for="name">Nhân viên tạo</label>
				<select name="filter[created_by]" multiple data-module="employee" class="em-profile select2_suggest form-control">
					@if(!empty($filter['employee_id']))
						<option value="{{$filter['created_by']??''}}" selected>{{$filter['created_by']}}</option>
					@endif
				</select>
			</div>

			<div class="form-group">
				<label class="control-label" for="name">Sale hưởng</label>
				<select data-module="employee" class="form-control em-profile select2_suggest" multiple name="filter[sales.sale_id]">
					@if(!empty($filter['sale_id']))
						<option value="{{$filter['sales.sale_id']}}" selected>{{$filter['sales.sale_id']}}</option>
					@endif
				</select>
			</div>
        </div>    
    </div>   
</div>
<div class="sidebar-section">
    <div class="sidebar-section-header">
        <span class="font-weight-semibold">Theo thời gian</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search-4" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>
    
    <div class="collapse" id="sidebar-search-4">
        <div class="sidebar-section-body">
            <div class="form-group">
				<label class="control-label" for="name">Ngày bắt đầu</label>
				<div class="input-group">
					<input id="start_date" type="text" name="filter[payment_date][gte]" placeholder="" autocomplete="off" class="datepicker form-control" value="{{date('d/m/Y', strtotime($filter['payment_date']['gte']?? '-3 month'))}}">
			
				</div>
			</div>

			<div class="form-group input-group">
				<label class="control-label" for="name">Ngày kết thúc</label>
				<div class="input-group">
					<input id="end_date" type="text" name="filter[payment_date][lte]" placeholder="" autocomplete="off" class="datepicker form-control" value="{{date('d/m/Y', strtotime($filter['payment_date']['lte']?? 'now'))}}">
			
				</div>
			</div>
        </div>    
    </div>   
</div>
@endsection


					 