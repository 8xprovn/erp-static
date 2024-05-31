<div class="row">
                                <div class="col-sm-4" style="width: 200px">
                                    <div class="form-group">
                                        <label class="control-label" for="name">Theo trạng thái </label>
                                        <select name="filter[status]" class="form-control select2_single">
                                            <option value="">Select an option</option>
                                            <option value="open" @if(!empty($filter['status']) && $filter['status'] == 'open') selected @endif>open</option>
                                            <option value="success" @if(!empty($filter['status']) && $filter['status'] == 'success') selected @endif>success</option>
                                            <option value="error" @if(!empty($filter['status']) && $filter['status'] == 'error') selected @endif>error</option>
                                        </select>
                                    </div>
                                </div>
                            </div>