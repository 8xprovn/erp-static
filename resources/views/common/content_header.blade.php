<!-- Page header -->
<div class="page-header page-header-light">
	<!--<div class="page-header-content header-elements-lg-inline">
		<div class="page-title d-flex">
			<h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Datatables</span> - Fixed Columns</h4>
			<a href="#" class="header-elements-toggle text-body d-lg-none"><i class="icon-more"></i></a>
		</div>
		@if (!empty($buttons))
		<div class="header-elements d-none">
			<div class="d-flex justify-content-center">
				@foreach ($buttons as $k => $btn)
				<a href="{{$btn['link']}}" class="btn btn-link btn-float font-size-sm font-weight-semibold text-body {{(!empty($btn['is_popup'])) ? 'call_ajax_modal' : ''}}">
					<i class="icon-bars-alt text-pink"></i>
					<span>{{$btn['name']}}</span>
				</a>
				@endforeach
			</div>
		</div>
		@endif
	</div>-->

	<div class="breadcrumb-line breadcrumb-line-light header-elements-lg-inline">
		<div class="d-flex">
			<div class="breadcrumb">
				<a href="index.html" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
				<a href="datatable_extension_fixed_columns.html" class="breadcrumb-item">Datatables</a>
				<span class="breadcrumb-item active">Fixed columns</span>
			</div>

			<a href="#" class="header-elements-toggle text-body d-lg-none"><i class="icon-more"></i></a>
		</div>

		<div class="header-elements d-none">
			<div class="breadcrumb justify-content-center">
				<a href="#" class="breadcrumb-elements-item">
					<i class="icon-comment-discussion mr-2"></i>
					Support
				</a>

				<!--<div class="breadcrumb-elements-item dropdown p-0">
					<a href="#" class="breadcrumb-elements-item dropdown-toggle" data-toggle="dropdown">
						<i class="icon-gear mr-2"></i>
						Settings
					</a>

					<div class="dropdown-menu dropdown-menu-right">
						<a href="#" class="dropdown-item"><i class="icon-user-lock"></i> Account security</a>
						<a href="#" class="dropdown-item"><i class="icon-statistics"></i> Analytics</a>
						<a href="#" class="dropdown-item"><i class="icon-accessibility"></i> Accessibility</a>
						<div class="dropdown-divider"></div>
						<a href="#" class="dropdown-item"><i class="icon-gear"></i> All settings</a>
					</div>
				</div>-->
			</div>
		</div>
	</div>
</div>
<!-- /page header -->