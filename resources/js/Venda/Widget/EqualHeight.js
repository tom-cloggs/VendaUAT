/**
 * @fileoverview Venda.Platform.EqualHeight
 *
 * This script provides us with the ability to set the same height for the html element.
 * Mostly use to format the product within the same row by set the same height for each html element.
 *
 * @requires JQuery
 * @author Donatas Cereska <dcereska@venda.com>
 */

//create namespace
Venda.namespace('Platform.EqualHeight');

/**
 * Stub function is used to support JSDoc.
 * @class Venda.Platform.EqualHeight
 * @constructor
 */
Venda.Platform.EqualHeight = function () {};

/**
 * This function will find the max height of each class and set the max height to that class
 * @param {Element} each value in Array - the html element and class name to set height
 */
Venda.Platform.EqualHeight.init = function (elementsToSet) {
	var elementsToSetLen = elementsToSet.length;
	for (var i = 0; i < elementsToSetLen; i++) {
		var maxHeight = 0;
		jQuery(elementsToSet[i]).each(function () {
				var curHeight = jQuery(this).height();
				if (curHeight >= maxHeight) {
					maxHeight = curHeight;
				}
			});
		jQuery(elementsToSet[i]).css((jQuery.support.msie && jQuery.support.version < 7 ? '' : 'min-') + 'height', maxHeight + 'px');
	}
};

jQuery(function(){
	if(typeof Venda.Platform.EqualHeight != "undefined"){
		var classtoset = new Array ('.js-column','.js-cat-icatsdesc','.js-scatname','.js-payment-details','.js-store','.js-addressname', '.js-address', '.js-addresslink','.js-main-column','.js-main-2column','.js-canvas-column', 'li.prod .prod-name', 'li.prod .prod-pricedetails');
		Venda.Platform.EqualHeight.init(classtoset);
	}
});