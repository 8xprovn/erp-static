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
                <label class="control-label" >Tên</label>
                <input type="text" name="filter[name][like]" placeholder="" class="form-control" value="{{$filter['name']['like']??''}}">
            </div>
            <div class="form-group">
                <label class="control-label" >Loại</label>
                <select name="filter[type]" class="form-control">
                    <option value="">Chọn loại</option>
                    @foreach (config('data.transaction_type_type') as $type)
                    <option value="{{$type}}" {{ (!empty($filter['type']) && $filter['type'] == $type)  ? 'selected' : '' }}>{{$type}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
</div>
@endsection