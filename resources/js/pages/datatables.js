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
                            {
                                extend: 'copyHtml5',
                                footer: $('tfoot').length > 0, // Chỉ bao gồm footer nếu footer tồn tại
                                text: 'Copy',
                                customize: function (copyData) {
                                    // Kiểm tra nếu footer không tồn tại, thoát sớm
                                    if (!$('tfoot').length) return;

                                    // Tạo dữ liệu tổng nếu có footer
                                    var totalRow = [];
                                    $('.datatable_report th').each(function (index) {
                                        if ($(this).hasClass('sum-column')) {
                                            // Tính tổng nếu cột có class 'sum-column'
                                            var total = 0;
                                            dataTableReport.column(index, { page: 'current' }).data().each(function (value) {
                                                total += parseFloat(value) || 0;
                                            });
                                            totalRow.push(Math.round(total)); // Thêm tổng
                                        } else {
                                            totalRow.push(''); // Không có tổng thì để trống
                                        }
                                    });

                                    // Thêm dòng tổng vào nội dung sao chép
                                    copyData.body.push(totalRow);
                                }
                            },
                            {
                                extend: 'excelHtml5',
                                footer: true, // Bao gồm footer khi xuất file Excel
                                text: 'Excel',
                                title: 'Custom Title', 
                                customize: function (xlsx) {
                                    if (!$('tfoot').length) return;
                                    var sheet = xlsx.xl.worksheets['sheet1.xml']; // Truy cập sheet đầu tiên
                                    $(sheet).find('sheetPr').attr('name', document.title || 'Sheet1');
                    
                                    // Tạo dòng tổng ở cuối
                                    var lastRow = $('row', sheet).last().attr('r'); // Lấy số thứ tự dòng cuối
                                    var newRowIndex = parseInt(lastRow) + 1; // Tạo dòng mới ngay sau đó
                    
                                    // Bắt đầu thêm dòng tổng
                                    var totalRow = '<row r="' + newRowIndex + '">';
                                    var columns = $('.datatable_report th').length; // Số cột trong bảng
                    
                                    for (var i = 1; i <= columns; i++) {
                                        if ($('.datatable_report th:nth-child(' + i + ')').hasClass('sum-column')) {
                                            // Nếu cột có class 'sum-column', tính tổng
                                            var total = 0;
                                            dataTableReport.column(i - 1, { page: 'current' }).data().each(function (value) {
                                                total += parseFloat(value) || 0;
                                            });
                    
                                            totalRow += '<c t="inlineStr"><is><t>' + Math.round(total) + '</t></is></c>'; // Ghi tổng
                                        } else {
                                            // Nếu không, để trống
                                            totalRow += '<c t="inlineStr"><is><t></t></is></c>';
                                        }
                                    }
                                    totalRow += '</row>';
                    
                                    // Thêm dòng tổng vào cuối file Excel
                                    $(sheet).find('sheetData').append(totalRow);
                                }
                            },
                            {
                                extend: 'csvHtml5',
                                footer: true, // Bao gồm footer khi xuất file CSV
                                text: 'CSV',
                                filename: document.title,
                                customize: function (csv) {
                                    if (!$('tfoot').length) return;
                                    var totalRow = [];
                                    $('.datatable_report th').each(function (index) {
                                        if ($(this).hasClass('sum-column')) {
                                            // Nếu cột có class 'sum-column', tính tổng
                                            var total = 0;
                                            dataTableReport.column(index, { page: 'current' }).data().each(function (value) {
                                                total += parseFloat(value) || 0;
                                            });
                                            totalRow.push(Math.round(total));
                                        } else {
                                            totalRow.push(''); // Không có tổng thì để trống
                                        }
                                    });
                    
                                    // Thêm dòng tổng vào cuối file CSV
                                    csv += '\n' + totalRow.join(',');
                                    return csv;
                                }
                            },
                            {
                                extend: 'pdfHtml5',
                                footer: true, // Bao gồm footer trong file PDF
                                text: 'Export to PDF',
                                filename: document.title, 
                                customize: function (doc) {
                                    if (!$('tfoot').length) return;
                                    // Tạo dòng tổng
                                    var totalRow = [];
                                    $('.datatable_report th').each(function (index) {
                                        if ($(this).hasClass('sum-column')) {
                                            var total = 0;
                                            dataTableReport.column(index, { page: 'current' }).data().each(function (value) {
                                                total += parseFloat(value) || 0;
                                            });
                                            totalRow.push({ text: Math.round(total), style: 'tableFooter' });
                                        } else {
                                            totalRow.push({ text: '', style: 'tableFooter' });
                                        }
                                    });
                    
                                    // Thêm dòng tổng vào bảng
                                    doc.content[1].table.body.push(totalRow);
                                }
                            }
                        ]
                    },
                    
                    footerCallback: function (row, data, start, end, display) {
                        var api = this.api();
                        if (!$('tfoot', api.table().container()).length) {
                            return; // Thoát nếu không có footer
                        }
                
                        // Hàm tiện ích để định dạng số
                        var intVal = function (i) {
                            return typeof i === 'string'
                                ? i.replace(/[\$,]/g, '') * 1
                                : typeof i === 'number'
                                ? i
                                : 0;
                        };
                
                        // Lặp qua từng cột cần tính tổng
                        api.columns('.sum-column', { page: 'current' }).every(function () {
                            var column = this;
                
                            // Tính tổng giá trị cột hiện tại
                            var total = column
                                .data()
                                .reduce(function (a, b) {
                                    return intVal(a) + intVal(b);
                                }, 0);
                
                            // Hiển thị tổng giá trị trong footer của cột
                            $(column.footer()).html(Math.round(total));
                        });
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