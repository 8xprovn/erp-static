/* ------------------------------------------------------------------------------
 *
 *  # Fixed Columns extension for Datatables
 *
 *  Demo JS code for datatable_extension_fixed_columns.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var Datatable = function() {


    //
    // Setup module components
    //

    // Basic Datatable examples
    var _componentDatatable = function(parentDom) {
        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend( $.fn.dataTable.defaults, {
            // columnDefs: [{ 
            //     orderable: false,
            //     width: 100,
            //     targets: [ 5 ]
            // }],
            // paging: false,
            // //responsive: true,
            // autoWidth: true,
            // //processing: true,
            // bInfo : false,
            // ordering: false, 
            // //autoWidth: true,
            // searching: false,
            dom: 'lrt',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
            }
        });

        // Apply custom style to select
        // $.extend( $.fn.dataTableExt.oStdClasses, {
        //     "sLengthSelect": "custom-select"
        // });
        if ($('.datatable_report').length > 0) {
            setTimeout(function(){
                var dataTableReport = parentDom.find('.datatable_report').DataTable({
                    // columnDefs: [
                    // ],
                    // scrollX: true,
                    // scrollY: '55vh',
                    //scrollCollapse: true,
                    dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
                    language: {
                        search: '<span>Filter:</span> _INPUT_',
                        searchPlaceholder: 'Type to filter...',
                        lengthMenu: '<span>Show:</span> _MENU_',
                        paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
                    },
                    responsive: true,
                    paging: false,
                    autoWidth: true,
                    processing: true,
                    bInfo : false,
                    ordering: true, 
                    autoWidth: true,
                    searching: true,
                    scrollY: '60vh',
                    scrollCollapse: true,
                    buttons: {            
                        dom: {
                            button: {
                                className: 'btn btn-light'
                            }
                        },
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5'
                        ]
                    }
                    
                });
            }, 2000);
        }
        // setTimeout(function(){
        //     dataTableReport.columns.adjust();
        // }, 3000);
        
        var arrTimeout = []; var arrWait = [];
        if ($('.datatable-fixed-left').length > 0) {
            if ($.fn.DataTable.isDataTable('.datatable-fixed-left')) {
                $('.datatable-fixed-left').DataTable().destroy();
            }
            //var  setTimeout(function(){
                //fixedTable.columns.adjust();
                $('.datatable-fixed-left').each(function(){
                    var dataPosition = $(this).attr("data-position") || 1;
                    var dataRightPosition = $(this).attr("data-right-position") || 0;
                    var fixedColumns =  {
                        leftColumns: dataPosition,
                    };
                    if (dataRightPosition > 0) {
                        fixedColumns.rightColumns = dataRightPosition;
                    }
                    var fixedTable = $(this).DataTable({
                        scrollX: true,
                        paging: false,
                        searching: false,
                        bInfo : false,
                        ordering: false,
                        scrollY: '60vh',
                        scrollCollapse: true,
                        //fixedColumns: true,
                        fixedColumns: fixedColumns
                        
                    }); 
                    arrTimeout.push(setInterval(function(){
                         fixedTable.columns.adjust();
                    }, 2000));
                })
            //}, 2000);
        }


        if ($('.datatable-fixed-left-search').length > 0) {
            if ($.fn.DataTable.isDataTable('.datatable-fixed-left-search')) {
                $('.datatable-fixed-left-search').DataTable().destroy();
            }
            //var  setTimeout(function(){
                //fixedTable.columns.adjust();
                $('.datatable-fixed-left-search').each(function(){
                    var dataPosition = $(this).attr("data-position") || 1;
                    var dataRightPosition = $(this).attr("data-right-position") || 0;
                    var fixedColumns =  {
                        leftColumns: dataPosition,
                    };
                    if (dataRightPosition > 0) {
                        fixedColumns.rightColumns = dataRightPosition;
                    }
                    var fixedTable = $(this).DataTable({
                        scrollX: true,
                        paging: false,
                        dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
                        searching: true,
                        bInfo : false,
                        ordering: false,
                        scrollY: '60vh',
                        scrollCollapse: true,
                        //fixedColumns: true,
                        fixedColumns: fixedColumns,
                        buttons: [],
                        
                    }); 
                    arrTimeout.push(setInterval(function(){
                         fixedTable.columns.adjust();
                    }, 2000));
                })
            //}, 2000);
        }




        // Left and right fixed columns

            var dataTableConfig = {
                responsive: true,
                scrollX: false,
                dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
                retrieve: true,
                scrollY: '60vh',
                scrollCollapse: true,
                paging: false,
                searching: false,
                bInfo : false,
                ordering: false,
                buttons: [ 
                    // {
                    //     text: 'Hiển thị',
                    //     extend: 'colvis',
                    //     className: 'btn btn-teal ml-2 dropdown-toggle'
                    // }
                ],
                //stateSave: true
                //paging: false
                /*columnDefs: [
                    {
                        className: 'control',
                        orderable: false,
                        targets: -1
                    }
                ]*/
            }

        // if (setTimeoutTable){
        //     clearTimeout(setTimeoutTable);
        // }

        var dataTableConfigSearch = {
            responsive: true,
            scrollX: false,
            dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
            retrieve: true,
            scrollY: '60vh',
            scrollCollapse: true,
            paging: false,
            searching: true,
            bInfo : false,
            ordering: false,
            buttons: [ 
                // {
                //     text: 'Hiển thị',
                //     extend: 'colvis',
                //     className: 'btn btn-teal ml-2 dropdown-toggle'
                // }
            ],
            //stateSave: true
            //paging: false
            /*columnDefs: [
                {
                    className: 'control',
                    orderable: false,
                    targets: -1
                }
            ]*/
        }
        

        parentDom.find('.datatable-fixed-both').each(function(){
            if ($.fn.DataTable.fnIsDataTable(this)) {
                this.distroy();
            }
        });
        //fixedTable.columns.adjust();
        if ($('.datatable-fixed-both').length > 0) {
            arrWait.push(setTimeout(function(){
                var fixedTable = parentDom.find('.datatable-fixed-both').DataTable(dataTableConfig)
                fixedTable.buttons().container().appendTo(".datatable-button");
                arrTimeout.push(setInterval(function(){
                    fixedTable.columns.adjust();
                }, 2000));
            }, 3000)
            );
        }

        parentDom.find('.datatable-fixed-both-search').each(function(){
            if ($.fn.DataTable.fnIsDataTable(this)) {
                this.distroy();
            }
        });
        //fixedTable.columns.adjust();
        if ($('.datatable-fixed-both-search').length > 0) {
            arrWait.push(setTimeout(function(){
                var fixedTable = parentDom.find('.datatable-fixed-both-search').DataTable(dataTableConfigSearch)
                fixedTable.buttons().container().appendTo(".datatable-button");
                arrTimeout.push(setInterval(function(){
                    fixedTable.columns.adjust();
                }, 2000));
            }, 3000)
            );
        }

   
        $(document).on('MainContentReloaded',function(e){
            if (arrTimeout.length === 0) {
                return true;
            }
            arrTimeout.map((a) => {
                clearInterval(a);
                arrTimeout = [];
            })
            arrWait.map((a) => {
                clearTimeout(a);
                arrWait = [];
            })

        });
        

    };


    //
    // Return objects assigned to module
    //

    return {
        init: function(dom) {
            _componentDatatable(dom);
        }
    }
}();
// Initialize module
// ------------------------------
$(document).on('DOMContentLoaded MainContentReloaded',function(e){
    Datatable.init($(e.target));
});