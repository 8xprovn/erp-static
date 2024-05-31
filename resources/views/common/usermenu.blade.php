<!-- User menu -->
<div class="sidebar-section">
	<div class="sidebar-user-material">
		<div class="sidebar-section-body">
			<div class="d-flex">
				<div class="flex-1">
					<button type="button" class="btn btn-outline-light border-transparent btn-icon btn-sm rounded-pill">
						<i class="icon-wrench"></i>
					</button>
				</div>
				<a href="#" class="flex-1 text-center"><img src="{{env('STATIC_URL')}}/theme/global_assets/images/placeholders/placeholder.jpg" class="img-fluid rounded-circle shadow-sm" width="80" height="80" alt=""></a>
				<div class="flex-1 text-right">
					<button type="button" class="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-main-resize d-none d-lg-inline-flex">
						<i class="icon-transmission"></i>
					</button>

					<button type="button" class="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-main-toggle d-lg-none">
						<i class="icon-cross2"></i>
					</button>
				</div>
			</div>

			<div class="text-center">
				<h6 class="mb-0 text-white text-shadow-dark mt-3">{{\Auth::user()->email}}</h6>
				<span class="font-size-sm text-white text-shadow-dark">{{\Auth::user()->job_title}}</span>
			</div>
		</div>
									
		<div class="sidebar-user-material-footer">
			<a href="#user-nav" class="d-flex justify-content-between align-items-center text-shadow-dark dropdown-toggle" data-toggle="collapse"><span>My account</span></a>
		</div>
	</div>

	<div class="collapse border-bottom" id="user-nav">
		<ul class="nav nav-sidebar">
			<li class="nav-item">
				<a href="#" class="nav-link">
					<i class="icon-user-plus"></i>
					<span>My profile</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link">
					<i class="icon-coins"></i>
					<span>My balance</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link">
					<i class="icon-comment-discussion"></i>
					<span>Messages</span>
					<span class="badge badge-teal badge-pill align-self-center ml-auto">58</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link">
					<i class="icon-cog5"></i>
					<span>Account settings</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link">
					<i class="icon-switch2"></i>
					<span>Logout</span>
				</a>
			</li>
		</ul>
	</div>
</div>
<!-- /user menu -->