const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
// const components = [
// 	'resources/js/components/common.js',
// 	'resources/js/components/crm.js',
// 	'resources/js/components/edu.js',
// 	'resources/js/components/invoice.js'
// ];

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/master/css')
mix.scripts([
    'resources/js/main/bootstrap.bundle.min.js',
    'resources/js/plugins/tables/datatables/datatables.min.js',
    'resources/js/plugins/tables/datatables/extensions/fixed_columns.min.js',
    'resources/js/plugins/tables/datatables/extensions/responsive.min.js',
    'resources/js/plugins/tables/datatables/extensions/buttons.min.js',
    //'resources/js/plugins/loaders/progressbar.min.js',
    'resources/js/plugins/pickers/pickadate/picker.js',
    'resources/js/plugins/pickers/pickadate/picker.date.js',
    'resources/js/plugins/pickers/pickadate/picker.time.js',
    'resources/js/plugins/ui/moment/moment.min.js',
    'resources/js/plugins/forms/selects/select2.min.js',
    'resources/js/plugins/notifications/pnotify.min.js',
    'resources/js/plugins/forms/selects/bootstrap_multiselect.js',
    'resources/js/vendors/jquery-price-format/jquery.priceformat.min.js',
    'resources/js/vendors/autoNumeric.min.js',
    //'resources/js/vendors/uploaders/fileinput/fileinput.min.js',
    'resources/js/pages/datatables.js',
    'resources/js/pages/autoload-data-service.js',
    'resources/js/pages/picker_date.js',
    'resources/js/pages/layout.js',
    'resources/js/pages/form_select2.js',
    'resources/js/pages/form_multiselect.js',
    'resources/js/pages/uploads.js',
    //'resources/js/pages/datatables_responsive.js',
    'resources/js/pages/app.js',
    'resources/js/vendors/filepond/filepond.js',
    'resources/js/vendors/filepond/filepond.jquery.js',
    'resources/js/vendors/filepond/filepond-plugin-image-preview.js',
    'resources/js/vendors/filepond/filepond-plugin-media-preview.js',
    'resources/js/vendors/tinymce/tinymce.min.js',
    'resources/js/app/*'
], 'public/master/js/vendors.js').minify('public/master/js/vendors.js');
mix.styles([
    'resources/js/vendors/filepond/filepond-plugin-image-preview.css',
    'resources/js/vendors/filepond/filepond-plugin-media-preview.css',
    'resources/js/vendors/filepond/filepond.css',
    'resources/js/vendors/filepond/filepond.css',
    'master/css/custom.css',
], 'public/master/css/vendors.css')
