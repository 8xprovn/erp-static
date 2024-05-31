@extends('common.filter_layout')
@section('section_filter')
<!-- Sidebar search -->
                <div class="sidebar-section">
                    <div class="sidebar-section-header">
                        <span class="font-weight-semibold">Sidebar search</span>
                        <div class="list-icons ml-auto">
                            <a href="#sidebar-search" class="list-icons-item" data-toggle="collapse">
                                <i class="icon-arrow-down12"></i>
                            </a>
                        </div>
                    </div>

                    <div class="collapse show" id="sidebar-search">
                        <form class="sidebar-section-body" action="#">
                            <div class="form-group-feedback form-group-feedback-right">
                                <input type="search" class="form-control" placeholder="Search">
                                <div class="form-control-feedback">
                                    <i class="icon-search4 font-size-base text-muted"></i>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /sidebar search -->

<!--
<div class="row">
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label class="control-label" for="name">Theo loại </label>
                                        <select name="filter[type]" class="form-control select2_single" id="">
                                            <option value="">Select an option</option>
                                            @foreach(config('data.wallet_transaction_type') as $type_log)
                                                <option value="{{ $type_log }}" @if(!empty($filter['type']) && $filter['type'] == $type_log) selected @endif>{{   __('finance.wallet_transaction.type.'.$type_log)}}</option>
                                            @endforeach
                                        </select>
                                        <input type="hidden" name="filter[wallet_id]" value="{{$filter['wallet_id']??''}}">
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label class="control-label" for="name">Từ ngày</label>
                                        <input type="text" name="filter[from_date]" class="form-control datepicker" value="{{$filter['from_date']??''}}">
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label class="control-label" for="name">Đến ngày</label>
                                        <input type="text" name="filter[to_date]" class="form-control datepicker" value="{{$filter['to_date']??''}}">
                                    </div>
                                </div>
                            </div>-->
@endsection