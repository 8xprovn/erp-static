/* ------------------------------------------------------------------------------
 *
 *  # Bootstrap multiselect
 *
 *  Demo JS code for form_multiselect.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var BootstrapMultiselect = function() {


    //
    // Setup module components
    //

    // Default file input style
    var _componentMultiselect = function(parentDom) {
        if (!$().multiselect) {
            console.warn('Warning - bootstrap-multiselect.js is not loaded.');
            return;
        }


        // Basic examples
        // ------------------------------

        // Basic initialization
        parentDom.find('.multiselect').multiselect({
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
        });
        parentDom.find('.multiselect-basic').multiselect();
    };


    //
    // Return objects assigned to module
    //

    return {
        init: function(parentDom) {
            _componentMultiselect(parentDom);
        }
    }
}();


// Initialize module
// ------------------------------

$(document).on('DOMContentLoaded MainContentReloaded',function(e){
    BootstrapMultiselect.init($(e.target)); 
});
