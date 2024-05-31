<?php
?>

@extends('layout.app')
@section('content')
    <form class="form-horizontal form-label-left ajax-submit-form" action="{{$action}}" method="{{$method}}">

        <div class="form-group">
            <a href="{{route('payments.index')}}" class="btn btn-primary">Danh sách payment</a>
            <button class="btn btn-primary ajax-submit-button" type="submit">Assign</button>
            @csrf
        </div>

        <div class="row tab-pane">
            <div class="col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Thông tin</h2>
                        <ul class="nav navbar-right panel_toolbox">
                            <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                            </li>
                            <li><a class="close-link"><i class="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>

                    <div class="x_content row">
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Sale ID</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <select name="sale_id" class="form-control select2_suggest em-profile"  data-module="employee">
                                    @if(!empty($row->sale_id))
                                        <option value="{{$row->sale_id}}">{{$row->sale_id}}</option>
                                    @endif
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2 col-xs-12">Lí do</label>
                            <div class="col-sm-10 col-xs-12 validation_form">
                                <textarea name="reason" class="form-control" placeholder="" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>


@stop
