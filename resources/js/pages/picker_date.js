/* ------------------------------------------------------------------------------
 *
 *  # Date and time pickers
 *
 *  Demo JS code for picker_date.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var DateTimePickers = function() {


    //
    // Setup module components
    //

    // Daterange picker
    // var _componentDaterange = function() {
    //     if (!$().daterangepicker) {
    //         console.warn('Warning - daterangepicker.js is not loaded.');
    //         return;
    //     }

    //     // Basic initialization
    //     $('.daterange-basic').daterangepicker({
    //         parentEl: '.content-inner'
    //     });

    //     // Display week numbers
    //     $('.daterange-weeknumbers').daterangepicker({
    //         parentEl: '.content-inner',
    //         showWeekNumbers: true
    //     });

    //     // Button class options
    //     $('.daterange-buttons').daterangepicker({
    //         parentEl: '.content-inner',
    //         applyClass: 'btn-success',
    //         cancelClass: 'btn-danger'
    //     });

    //     // Display time picker
    //     $('.daterange-time').daterangepicker({
    //         parentEl: '.content-inner',
    //         timePicker: true,
    //         locale: {
    //             format: 'MM/DD/YYYY h:mm a'
    //         }
    //     });

    //     // Show picker on right
    //     $('.daterange-left').daterangepicker({
    //         parentEl: '.content-inner',
    //         opens: 'left'
    //     });

    //     // Single picker
    //     $('.daterange-single').daterangepicker({
    //         parentEl: '.content-inner',
    //         singleDatePicker: true
    //     });

    //     // Display date dropdowns
    //     $('.daterange-datemenu').daterangepicker({
    //         parentEl: '.content-inner',
    //         showDropdowns: true
    //     });

    //     // 10 minute increments
    //     $('.daterange-increments').daterangepicker({
    //         parentEl: '.content-inner',
    //         timePicker: true,
    //         timePickerIncrement: 10,
    //         locale: {
    //             format: 'MM/DD/YYYY h:mm a'
    //         }
    //     });

    //     // Localization
        


    //     //
    //     // Pre-defined ranges and callback
    //     //

    //     // Initialize with options
    //     $('.daterange-predefined').daterangepicker(
    //         {
    //             startDate: moment().subtract(29, 'days'),
    //             endDate: moment(),
    //             minDate: '01/01/2014',
    //             maxDate: '12/12/2019',
    //             dateLimit: { days: 60 },
    //             parentEl: '.content-inner',
    //             ranges: {
    //                 'Today': [moment(), moment()],
    //                 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //                 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    //                 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //                 'This Month': [moment().startOf('month'), moment().endOf('month')],
    //                 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    //             }
    //         },
    //         function(start, end) {
    //             $('.daterange-predefined span').html(start.format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + end.format('MMMM D, YYYY'));
    //             $.jGrowl('Date range has been changed', { header: 'Update', theme: 'bg-primary text-white', position: 'center', life: 1500 });
    //         }
    //     );

    //     // Display date format
    //     $('.daterange-predefined span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + moment().format('MMMM D, YYYY'));


    //     //
    //     // Inside button
    //     //

    //     // Initialize with options
    //     $('.daterange-ranges').daterangepicker(
    //         {
    //             startDate: moment().subtract(29, 'days'),
    //             endDate: moment(),
    //             minDate: '01/01/2012',
    //             maxDate: '12/31/2019',
    //             dateLimit: { days: 60 },
    //             parentEl: '.content-inner',
    //             ranges: {
    //                 'Today': [moment(), moment()],
    //                 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //                 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    //                 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //                 'This Month': [moment().startOf('month'), moment().endOf('month')],
    //                 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    //             }
    //         },
    //         function(start, end) {
    //             $('.daterange-ranges span').html(start.format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + end.format('MMMM D, YYYY'));
    //         }
    //     );

    //     // Display date format
    //     $('.daterange-ranges span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + moment().format('MMMM D, YYYY'));
    // };

    // Pickadate picker
    var _componentPickadate = function() {
        if (!$().pickadate) {
            console.warn('Warning - picker.js and/or picker.date.js is not loaded.');
            return;
        }
        var date = new Date(); 
        var maxYear = new Date().getFullYear() + 20;
        // Basic options
        $('.datepicker').each(function() {
            var isEditable = $(this).data('edit') === true; // Kiểm tra data-edit
            $(this).pickadate({
                format: 'dd/mm/yyyy',
                formatSubmit: 'yyyy-mm-dd',
                selectYears: 100,
                selectMonths: true,
                hiddenName: true,
                editable: isEditable, // Thiết lập editable
                onSet: function(context) {
                    if (context.select) {
                        this.$node.trigger('blur');
                    }
                }
            });
        });

        // Thêm sự kiện blur cho tất cả các ô datepicker
        $('.datepicker').on('blur', function() {
            var input = $(this).val();
            var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/; 
            if (input.trim() !== '') {
                if (regex.test(input)) {
                    var dateArray = input.split('/');
                    var submitDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]; 
                    $(this).siblings('input[type=hidden]').val(submitDate); 
                } else {
                    alert('Ngày nhập không đúng định dạng dd/mm/yyyy!'); 
                    $(this).siblings('input[type=hidden]').val(''); 
                }
            }
        });
    };
    var _componentPickatime = function() {
        if (!$().pickatime) {
            console.warn('Warning - picker.js and/or picker.time.js is not loaded.');
            return;
        }
        // Time formats
        $('.timepicker').pickatime({
            // Escape any “rule” characters with an exclamation mark (!).
            format: 'HH:i',
            formatSubmit: 'HH:i:00',
            interval: 15,
            editable: true,
            hiddenSuffix: '',
            hiddenName: true
        });
    };
   


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            //_componentDaterange();
            _componentPickadate();
            _componentPickatime();
        }
    }
}();


// Initialize module
// ------------------------------
$(document).on('DOMContentLoaded MainContentReloaded',function(e){
    DateTimePickers.init();
});