@extends('common.filter_layout')
@section('section_filter')
<!-- Sidebar search -->

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
            <div class="form-group">
                <label class="control-label" for="name">Theo hóa đơn </label>
                <input type="number" name="filter[invoice_id]" placeholder="" class="form-control" value="{{$filter['invoice_id']??''}}">
            </div>

            <div class="form-group">
                <label class="control-label" for="name">Theo chi tiết hóa đơn </label>
                <input type="number" name="filter[invoice_detail_id]" placeholder="" class="form-control" value="{{$filter['invoice_detail_id']??''}}">
            </div>
            <div class="form-group">
                <label class="control-label" for="name">Theo Trạng thái </label>
                <select name="filter[status][]" multiple class="multiselect-basic form-control">
                    @foreach (config('data.invoice_detail_cancel_status') as $value)
                    <option value="{{$value}}" <?php echo !empty($filter['status']) && in_array($value, $filter['status']) ? 'selected' : '' ?>>{{$value}}</option>
                    @endforeach
                </select>
            </div>
        </div>    
    </div>   
</div>
@endsection