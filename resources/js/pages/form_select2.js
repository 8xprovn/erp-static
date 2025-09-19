/* ------------------------------------------------------------------------------
 *
 *  # Select2 selects
 *
 *  Specific JS code additions for form_select2.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var Select2Selects = function() {


    //
    // Setup module components
    //

    // Select2 examples
    var _componentSelect2 = function() {
        if (!$().select2) {
            console.warn('Warning - select2.min.js is not loaded.');
            return;
        }


        //
        // Basic examples
        //

        


        //
        // Advanced examples
        //

        // Minimum input length
        // $('.select-minimum').select2({
        //     minimumInputLength: 2,
        //     minimumResultsForSearch: Infinity
        // });

        // // Allow clear selection
        // $('.select-clear').select2({
        //     placeholder: 'Select a State',
        //     allowClear: true
        // });

        // // Tagging support
        // $('.select-multiple-tags').select2({
        //     tags: true
        // });

        // // Maximum input length
        // $('.select-multiple-maximum-length').select2({
        //     tags: true,
        //     maximumInputLength: 5
        // });

        // // Tokenization
        // $('.select-multiple-tokenization').select2({
        //     tags: true,
        //     tokenSeparators: [',', ' ']
        // });

        // // Maximum selection
        // $('.select-multiple-limited').select2({
        //     maximumSelectionLength: 3
        // });

        // // Maximum selections allowed
        // $('.select-multiple-maximum').select2({
        //     maximumSelectionSize: 3
        // });


        // //
        // // Drag and drop selected items
        // //

        // // Initialize with tags
        // $('.select-multiple-drag').select2({
        //     containerCssClass: 'sortable-target'
        // });

        // // Add jQuery UI Sortable support
        // $('.sortable-target .select2-selection__rendered').sortable({
        //     containment: '.sortable-target',
        //     items: '.select2-selection__choice:not(.select2-search--inline)'
        // });


        // //
        // // Single select with icons
        // //

        // // Format icon
        // function iconFormat(icon) {
        //     var originalOption = icon.element;
        //     if (!icon.id) { return icon.text; }
        //     var $icon = '<i class="icon-' + $(icon.element).data('icon') + '"></i>' + icon.text;

        //     return $icon;
        // }

        // // Initialize with options
        // $('.select-icons').select2({
        //     templateResult: iconFormat,
        //     minimumResultsForSearch: Infinity,
        //     templateSelection: iconFormat,
        //     escapeMarkup: function(m) { return m; }
        // });


        // //
        // // Customize matched results
        // //

        // // Setup matcher
        function matchStart (term, text) {
            if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                return true;
            }

            return false;
        }

        // Initialize
        $.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
            $('.select-matched-customize').select2({
                minimumResultsForSearch: Infinity,
                placeholder: 'Select a State',
                matcher: oldMatcher(matchStart)
            });
        });



        $('.select2_single').select2({
            minimumResultsForSearch: Infinity
        });
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function() {
            _componentSelect2();
        }
    }
}();


// Initialize module
// ------------------------------

$(document).on('DOMContentLoaded MainContentReloaded', function() {
    Select2Selects.init();
});
$(document).on('InitSearch',function(e){
    Select2Selects.init(); 
});
