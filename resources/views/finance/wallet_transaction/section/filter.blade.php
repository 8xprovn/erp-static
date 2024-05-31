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
        <span class="font-weight-semibold">Thông tin lọc</span>
        <div class="list-icons ml-auto">
            <a href="#sidebar-search-1" class="list-icons-item" data-toggle="collapse">
                <i class="icon-arrow-down12"></i>
            </a>
        </div>
    </div>

    <div class="collapse show" id="sidebar-search-1">
        <div class="sidebar-section-body">
            <div class="form-group">
                <label class="control-label" for="name">Trạng thái </label>
                <select name="filter[status][]" multiple class="form-control multiselect-basic" >
                    @foreach(config('data.wallet_transaction_status') as $status)
                        <option value="{{$status}}" @if(!empty($filter['status']) && in_array($status, $filter['status'])) selected @endif>{{ $status }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label class="control-label" for="name">Loại giao dịch </label>
                <select name="filter[reason_type][]" multiple class="form-control multiselect-basic" >
                    @foreach(config('data.wallet_transaction_reason_type') as $reasonType)
                        <option value="{{$reasonType}}" @if(!empty($filter['reason_type']) && in_array($reasonType, $filter['reason_type'])) selected @endif>{{ __('finance.wallet_transaction.reason_type.'.$reasonType) }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label class="control-label" for="name">Từ ngày</label>
                <div class="input-group">
                    <input id="start_date" type="text" name="filter[date][gte]" placeholder="" autocomplete="off" class="datepicker form-control" value="{{date('d/m/Y',strtotime($filter['date']['gte']??''))}}">    
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" for="name">Đến ngày</label>
                <div class="input-group">
                    <input id="end_date" type="text" name="filter[date][lte]" placeholder="" autocomplete="off" class="datepicker form-control" value="{{date('d/m/Y',strtotime($filter['date']['lte']??''))}}">
                </div>
            </div>
        </div>
    </div>
</div>
@endsection