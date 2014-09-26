//Declare namespace for ebiz
Venda.namespace("instore");

Venda.instore.searchUser = function() {
	jQuery('form[name="searchuserform"] input[type="submit"]').on('click',function() {
		jQuery(".loading").show();
		jQuery("#searchResults").hide();
		var obj = jQuery('form[name="searchuserform"]');
		var URL = obj.attr('action');
			/* get target*/
			var params = obj.find("input, select, textarea").serialize();
			/* get the value from all input type*/
			jQuery.ajax({
				type : "POST",
				url : URL,
				dataType : "html",
				data : params,
				cache : false,
				/* do not cache*/
				error : function () {
					jQuery("#searchResults").html('Error!');
				},
				success : function (data) {
					jQuery(".loading").hide();
					jQuery("#searchResults").html(data);
					jQuery("#searchResults").slideDown(1000);
				}
			 });
		return false;
	  });

	  jQuery(document).on('click','.resultuser',function() {
	  var  formName = document.billingaddressaddform;
	  var obj = jQuery(this);
	  jQuery('.addcontactaddress').hide();
	  jQuery('.dtsAddress').fadeIn();
	  jQuery('#newuser').val('0');
			formName.title.value = obj.attr('data-title');
			formName.fname.value = obj.attr('data-fname');
			formName.lname.value = obj.attr('data-lname');
			formName.num.value = obj.attr('data-num');
			formName.addr1.value = obj.attr('data-addr1');
			formName.addr2.value = obj.attr('data-addr2');
			formName.city.value = obj.attr('data-city');
			formName.state.value = obj.attr('data-state');
			formName.cntry.value = obj.attr('data-cntry');
			formName.zipc.value = obj.attr('data-zipc');
			formName.phone.value = obj.attr('data-phone');
			formName.usemail.value = obj.attr('data-email');
			formName.submit();
	  });
}

Venda.instore.showAddressStore = function() {
	jQuery('#spanName').text(jQuery('input[name="addrname"]').val());
	jQuery('#spanAdd1').text(jQuery('input[name="addr1"]').val());
	jQuery('#spanAdd2').text(jQuery('input[name="addr2"]').val());
	jQuery('#spanCity').text(jQuery('input[name="city"]').val());
	jQuery('#spanCntry').text(jQuery('input[name="cntry"]').val());
	jQuery('#spanZipc').text(jQuery('input[name="zipc"]').val());
	jQuery('#spanState').text(jQuery('input[name="state"]').val());
	jQuery('#spanPhone').text(jQuery('input[name="phone"]').val());
};


Venda.instore.stores = [];
Venda.instore.getCurrentStore = function() {
	jQuery('#js-loading').show();

    jQuery.get( jQuery('#tag-ebizurl').text().replace('http:',window.location.protocol) + "/scat/storelocator&temp=storesjson&layout=blank", function(dataString) {
        Venda.instore.stores = jQuery.parseJSON('[' + dataString + ']');

		if (navigator.geolocation) {
				// Use method getCurrentPosition to get coordinates
			navigator.geolocation.getCurrentPosition(function (position) {
					Venda.instore.showCurrentStore(position);
			});
		}
	});
};
// get current store from the current postion
Venda.instore.showCurrentStore = function(position) {
	Venda.instore.storesQuery = [];
	var latlng = new google.maps.LatLng(position.coords.latitude ,  position.coords.longitude);
	//var latlng = new google.maps.LatLng(55.863432 , -4.253077);
	for (i=0; i<Venda.instore.stores.length; i++){

		var point = new google.maps.LatLng(Venda.instore.stores[i].Latitude, Venda.instore.stores[i].Longitude);  // point of the current store
		var meters = google.maps.geometry.spherical.computeDistanceBetween(latlng, point)       // distance between the two points
		var kilometers = (meters / 1000);
		Venda.instore.stores[i].Dist = kilometers.toFixed(2);

		if(Venda.instore.stores[i].Dist == 0){
			Venda.instore.storesQuery.push(Venda.instore.stores[i]);
		}
		else if(Venda.instore.stores[i].Dist < 2){
			Venda.instore.storesQuery.push(Venda.instore.stores[i]);
		}
	}
	jQuery('#js-loading').hide();
	if (Venda.instore.storesQuery != ""){
		jQuery('#currentStore').html(jQuery('#store-tmpl').tmpl(Venda.instore.storesQuery));
		Venda.instore.selectedStore();
	}else {
		jQuery('#js-noresult').show();
	}
};
//show delivery address of store
Venda.instore.selectedStore = function(position) {
	jQuery(document).on('click','.dtsStorelocator .js-linkstore a',function(e) {
		e.preventDefault();
		Venda.storeloc.fillForm(this.id);
		jQuery(".delivertostoreadd").show();
		jQuery(".dtsStorelocator").fadeOut();
		Venda.instore.showAddressStore();
	});
	jQuery(".dtsStorelocator .js-storeLocSelect").on("change", function(){
		var storeID = jQuery(".dtsStorelocator .js-storeLocSelect option:selected").attr('data-storeid');
		Venda.storeloc.fillForm(storeID);
		jQuery(".delivertostoreadd").show();
		// hide store locator DTS
		jQuery(".dtsStorelocator").fadeOut();
		Venda.instore.showAddressStore();
	});
};
// selected manual pay type option on order summary page
Venda.instore.selectPaytype = function() {
	if(typeof document.ordersummaryinstoreform.ohpaytype !== "undefined") {
	    for (var i=0; i<document.ordersummaryinstoreform.ohpaytype.length; i++) {
			if ( document.ordersummaryinstoreform.ohpaytype[i].value == 5) {
				document.ordersummaryinstoreform.ohpaytype[i].checked=true;
			}
	    }
    }
    if(typeof document.ordersummaryinstoreform.payment_id !== "undefined") {
        jQuery('input#manualpayment').attr('checked','checked');
    }
};
//load static page into content of popup box
Venda.instore.doPopUpContent = function () {
    if (jQuery("#helpNavigation").length > 0) {
      jQuery("#helpNavigation a").click( function() {
			var url = Venda.Ebiz.doProtocal(jQuery(this).attr("href"));
			jQuery(".staticContent").load(url + '&layout=noheaders' , function(){
				if (jQuery('.toggleContent').length > 0){
					Venda.Ebiz.expandContent()
				}
				if (jQuery('#contactForm').length > 0){
					jQuery(this).find('input[type="submit"]').on('click',function() {
						Venda.instore.submitFormModal('form', '.staticContent');
						return false;
					});
					jQuery("#contactForm").validate();
				}
				return false;
			});
			return false;
		});
	}
};
Venda.instore.submitFormModal = function(formName, divId){
	var obj = jQuery('form[name='+formName+']');
	var URL = obj.attr('action');
	obj.find('input[name="layout"]').val('noheaders');
	var params = obj.find("input, select, textarea").serialize();/* get the value from all input type*/
	jQuery.ajax({
		type : "GET",
		url : URL,
		dataType : "html",
		data : params,
		cache : false,
		error : function () {
			jQuery(divId).html('Error!');
		},
		success : function (data) {
			jQuery(divId).html(data);
		}
	 });
	 return false;
};
Venda.instore.showConfirmationModal = function() {
	jQuery('#confirmModal').foundation('reveal', 'open');
	 jQuery('#confirmModal a').click(function(){
		jQuery('#confirmModal').foundation('reveal', 'close');
	 });
};
jQuery(function(){
	Venda.instore.cj = new CookieJar({expires: 3600 * 24 * 7, path: '/'});
	if(jQuery('#searchUser').length > 0) {
		Venda.instore.searchUser();
		Venda.instore.cj.put('instore-name', jQuery('#tag-staffname').text());
	}

	if(jQuery('#deliveryoption').length > 0) {
		Venda.instore.getCurrentStore();
	}

	if(jQuery('#delivertostore').length > 0) {
		jQuery(document).on('mouseover click','.ui-autocomplete li.ui-menu-item a',function() {
			jQuery('.js-storelocatorresults').slideDown();
		});
		Venda.instore.selectedStore();
	}

	if(jQuery('#orderconfirmation').length > 0) {
		Venda.instore.selectPaytype();
		jQuery('input[name="orxorxtstaffname"]').val(Venda.instore.cj.get('instore-name'));
		jQuery('input[name="orxorxtstorename"]').val(jQuery('.js-storeaddress').find('.js-storename').text());
	}
	if(jQuery('#orderreceipt').length < 1) {
		jQuery(".js-showconfirm").bind('click',function() {
			Venda.instore.showConfirmationModal();
			return false;
		});
	}

});

