/**
 * @fileoverview Venda.Widget.Tracking - Creates variables for use in tracking scripts, e.g. Google Analytics
 * 
 * The data used to populate the variables is contained in hidden divs in the required templates stated before the functions.
 * This file must be loaded before any tracking scripts that use it's variables e.g. templates/tracking/googleAnalyticsSnippet
 *
 * @author Oliver Secluna <oliversecluna@venda.com>
 */

// Initiate namespacing 
Venda.namespace('Widget.Tracking'); 

/**
 * Stub function is used to support JSDoc.
 * @class Venda.Widget.Tracking
 * @constructor
 */
Venda.Widget.Tracking = function (){};

/**
 * Create variable to pass current workflow step to tracking javascript
  * Requires templates/tracking/shared/workflowSteps
 */
Venda.Widget.Tracking.Step = function () {
    if (jQuery("#tag-workflow").length > 0){
        
        var workflowStep = jQuery("#tag-workflow").html() + "/",
            curstep = jQuery("#tag-curstep").html().replace(/^\s+|\s+$/g, "");
            
        workflowStep += curstep;
        
        if (jQuery("#tag-emptytemplate").length > 0){
            workflowStep += "/empty";
        }
        
        if (jQuery("#tag-errorsboolean").length > 0){
            workflowStep += "/error";
        }
        
        return workflowStep;
    }
    return false;
};

/**
 * Create variables to pass session-level variables to tracking javascipt
 * Requires templates/tracking/shared/workflowSteps
 */
Venda.Widget.Tracking.Ses = {
        lang : jQuery("#tag-lang").html(),
        locn : jQuery("#tag-locn").html(),
        ustype : jQuery("#tag-ustype").html()
    }

/**
 * Create array to store order item objects
 * Requires templates/tracking/shared/orderReceipts
 */
Venda.Widget.Tracking.orditemsArray = []; //Create array to store order item objects

//Function to push order item objects to array
Venda.Widget.Tracking.orditemJSON = function(orditemObj) {
	Venda.Widget.Tracking.orditemsArray.push(orditemObj);
};