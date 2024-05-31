<!-- Secondary sidebar -->
<div class="sidebar sidebar-light sidebar-secondary sidebar-expand-xl sidebar-collapsed">
	<!-- Expand button -->
	<button type="button" class="btn btn-sidebar-expand sidebar-control sidebar-secondary-toggle">
		<i class="icon-arrow-right13"></i>
	</button>
	<!-- /expand button -->
	<!-- Sidebar content -->
	<div class="sidebar-content">
		<!-- Header -->
		<div class="sidebar-section sidebar-section-body d-flex align-items-center">
			<h5 class="mb-0">Lọc dữ liệu</h5>
			<div class="ml-auto">
				<button type="button" class="btn btn-outline-dark border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-secondary-toggle d-none d-xl-inline-block">
					<i class="icon-transmission"></i>
				</button>

				<button type="button" class="btn btn-outline-dark border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-secondary-toggle d-xl-none">
					<i class="icon-cross2"></i>
				</button>
			</div>
		</div>
		<form action="{{url()->current()}}" class="ajax-filter-form">
			<!-- /header -->
			@yield('section_filter')
			<div class="sidebar-section-body">
				<button type="submit" class="btn btn-primary btn-block">
		            <i class="icon-search4 font-size-base mr-2"></i>
		            Lọc thông tin
		        </button>
	    	</div>
    	</form>
	</div>
	<!-- /sidebar content -->
</div>
<!-- /secondary sidebar -->