/**
* @fileoverview Venda.Attributes
 * Venda's Attributes functionality incorporates a standardized way of interfacing Attribute Products with the front-end as to make
 * the modification and creation of selection methods easier.
 *
 * This is the swatch interface used to display select swatches for each attribute
 *
 * The files below will be included dynamicly when required:
 * @requires js/Venda/Attributes/attributeAsset-Swatch.js
 *
 * @author Alby Barber <abarber@venda.com>
 * @author Donatas Cereska <DonatasCereska@venda.com>
*/

Venda.Attributes.Swatch = function () {

	jQuery(".js-oneProduct").each(function(index) {
		var uID = this.id.substr(11);
		Venda.Attributes.productArr[index] = new Venda.Attributes.GenerateOptionsJSON(index, uID);
		if(jQuery("#oneProduct_" + uID + " #attributeInputs").length) {
			jQuery("#oneProduct_" + uID + " #attributeInputs").addClass("js-type-swatch");
			for (var t = 1; t <= Venda.Attributes.HowManyAtts(uID); t++) { Venda.Attributes.generateSwatch('att' + t, uID); }
			Venda.Attributes.PresetAtt(index, uID);
/* 			jQuery('#oneProduct_' + uID + ' #pricerange').text(Venda.Attributes.GetPriceRange(uID));
			jQuery('#oneProduct_' + uID + ' #price').text(Venda.Attributes.GetPriceRange(uID));
			Venda.Attributes.updateAttributes(uID); */
		}
		Venda.Attributes.swatchImage('att2', uID);
	});

	// This is getting all the assets that can be loaded after the Onload
	var url = '/content/ebiz/' + jQuery("#tag-ebizref").text() + '/resources/js/Venda/Attributes/attributeAsset-Swatch.js';

	jQuery.getScript(url, function(Status) {
		if (!Status) {
			console.log('Whoops! attributeAsset-Swatch.js did not load');
		} else {
	 		//ColourSwatch selection
			var singleuID = jQuery(".js-oneProduct").attr("id").substr(11);
			var urlParam = Venda.Platform.getUrlParam(location.href, 'colour')

			if(jQuery(".js-oneProduct").length === 1) {
				if(urlParam == "" || jQuery("#oneProduct_" + singleuID + " #attributeInputs").find('.js-colourSwatch[data-attvalue="'+urlParam+'"]').length == 0) {
					urlParam = jQuery("#oneProduct_" + singleuID + " #attributeInputs").find('.js-colourSwatch:first').data('attvalue');
				}
				if(urlParam != "") {
					Venda.Attributes.SwatchBehaviour('att2', urlParam, singleuID);
				}
			}
		}
		//All loaded
	});
}();



// Events
jQuery('body').off('click').on('click','.js-attributeSwatch', function() {
	var uID = this.id.substr(16);
	var attName 	= this.getAttribute('data-attName');
	var attValue 	= this.getAttribute('data-attValue');
	Venda.Attributes.SwatchBehaviour(attName, attValue, uID);

	var price = jQuery('.js-attributesPrice .js-prod-price').text();

	// If you have currency converter include the following line
	if(jQuery("#currencyConverter").length) {
		if (jQuery('#tag-currencycode') && (typeof jQuery().pennies !== 'undefined')){
			jQuery('.js-attributesPrice .js-prod-price').pennies('convert',{to:jQuery(this).pennies('get'),from: jQuery('#tag-currencycode').html()});
		}
	}

});

Venda.Attributes.SwatchBehaviour = function(attName, attValue, uID) {
	Venda.Attributes.setSelectedJSON(attName,attValue, uID);
	Venda.Attributes.updateAttributes(uID);
	for (var t = 1; t <= Venda.Attributes.HowManyAtts(uID); t++) { Venda.Attributes.UpdateSwatch('att' + t, uID); }
	// setSelectedClass is used to add a class to the swatch .selected
	Venda.Attributes.setSelectedClass(uID);
	Venda.Attributes.swatchImage('att2',uID);
	jQuery('[id^="swatchList_att"]').show();
	jQuery("#attributeInputs .loading").hide();
};