/**
* @fileoverview Venda.Attributes
 * Venda's Attributes functionality incorporates a standardized way of interfacing Attribute Products with the front-end as to make
 * the modification and creation of selection methods easier.
 *
 * These are the swatch assets required for intefaces that use swatches
 *
 * @author Alby Barber <abarber@venda.com>
 * @author Donatas Cereska <DonatasCereska@venda.com>
*/

Venda.Attributes.UpdateSwatch = function (attName, uID) {

 	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {

			var swatchList = '';
			var att1 = Venda.Attributes.productArr[i].attSet.att1.selected,
				att2 = Venda.Attributes.productArr[i].attSet.att2.selected,
				att3 = Venda.Attributes.productArr[i].attSet.att3.selected,
				att4 = Venda.Attributes.productArr[i].attSet.att4.selected;

			for (var t = 0; t < Venda.Attributes.productArr[i].attSet[attName].options.length; t++) {

				var attOption 	= Venda.Attributes.productArr[i].attSet[attName].options[t]

				if (attName == 'att1'){
					var stockstatus = Venda.Attributes.GetAll(Venda.Attributes.productArr[i].attSet.att1.options[t], att2, att3, att4, 'stockstatus').replace(/ /g,"_");
				}
				if (attName == 'att2'){
					var stockstatus = Venda.Attributes.GetAll(att1, Venda.Attributes.productArr[i].attSet.att2.options[t], att3, att4, 'stockstatus').replace(/ /g,"_");
				}
				if (attName == 'att3'){
					var stockstatus = Venda.Attributes.GetAll(att1, att2, Venda.Attributes.productArr[i].attSet.att3.options[t], att4, 'stockstatus').replace(/ /g,"_");
				}
				if (attName == 'att4'){
					var stockstatus = Venda.Attributes.GetAll(att1, att2, att3, Venda.Attributes.productArr[i].attSet.att4.options[t], 'stockstatus').replace(/ /g,"_");
				}
				swatchList += '<li class="js-'+ Venda.Ebiz.clearText(attOption) + ' js-attributeSwatch js-' + stockstatus + '" id="attributeSwatch_' + uID + '" data-attName="'+ attName +'" data-attValue="'+ attOption + '"><span class="js-swatchText">' + attOption + '</span></li>';
			}

			var selectName = "#oneProduct_" + uID + " #swatchList_" + attName;
			jQuery(selectName).replaceWith("<ul id='swatchList_" + attName + "'>" + swatchList + "</ul>");

			if(attName == 'att2') {
				var $substitutes = jQuery('#substitutes').html();
				jQuery('#swatchList_att2').append($substitutes);
			}
		}
	}

};

Venda.Attributes.setSelectedClass = function (uID){
	for(var i = 0; i < Venda.Attributes.productArr.length; i++) {
		if (Venda.Attributes.productArr[i].attSet.id == uID) {
			for (var t = 1; t <= Venda.Attributes.HowManyAtts(uID); t++) {
				var att = 'att' + t;

				if (typeof Venda.Attributes.productArr[i].attSet[att].selected=="undefined"){
					return false;
				}

				if (Venda.Attributes.productArr[i].attSet[att].selected.length != 0) {
					jQuery("#oneProduct_" + uID + " #attributeInputs .js-" + Venda.Ebiz.clearText(Venda.Attributes.productArr[i].attSet[att].selected)).addClass("js-selected");

					if (Venda.Attributes.Settings.useSelectedArrow){
						jQuery("#oneProduct_" + uID + " #attributeInputs .js-selected").prepend('<div class="js-selectedArrow-shadow"></div>');
					}

					if(jQuery("#attributesForm").length > 0) {
						if(document.getElementById("attributesForm").innerHTML == "halfswatch") {
							document.getElementById("hiddenInput_" + att).name = att;
							document.getElementById("hiddenInput_" + att).value = Venda.Attributes.productArr[i].attSet[att].selectedValue;
						}
					if(document.getElementById("attributesForm").innerHTML == "swatch") {
							document.getElementById("hiddenInput_" + att).name = att;
							document.getElementById("hiddenInput_" + att).value = Venda.Attributes.productArr[i].attSet[att].selectedValue;
						}
					}

				}
			}
		}
	}
};