/**
 * @fileoverview Venda.Widget.jqSlider - Display a specific element with slider
 *
 * This widget provides us with the ability to create a slider for any elements
 *
 * @requires jQuery	js/external/jquery-1.7.1.min.js
 * @requires jQuery	js/external/jquery-ui-1.8.14.custom.min.js
 * @author Sakesan Panjamawat (Auii) <sakp@venda.com>
*/

(function($){
	$.fn.jqSlider = function(opt){
		/**
		* jqSlider default configuration
		* @type Object
		*/
		var options = {
			display: 4,
			slidenum: 1,
			duration: 0.3,
			direction: 'horizontal',
			elementwidth: 200,
			elementheight: 200,
			uuid: '',
			sliderEnable: 1
		};
		$.extend(options, opt);
		var equalHeight = function(elements){
			if(typeof(Venda.Platform.EqualHeight) != "undefined"){
				Venda.Platform.EqualHeight.init(elements.split(','));
			}
		};
		var hoverHandler = function(){

		};
		if(opt.sliderEnable == 1){
			return this.each(function(index){
				/* apply default option + override option */
				/* ignore if not has child element / or already apply  */
				$this = $(this);
				var total = $this.children().length;
				var opt = $.extend({}, options, $this.data());
				opt.total = total;
				opt.display = (opt.display < 1) ? 1 : opt.display;
				opt.slidenum = (opt.slidenum > opt.display) ? opt.display : opt.slidenum;
				if(!(/horizontal|vertical/).test(opt.direction)){opt.direction = 'horizontal';}
				if(opt.equalheight != '' && typeof(opt.equalheight) != 'undefined') equalHeight(opt.equalheight);

				opt.elementwidth = $this.children().first().outerWidth();
				opt.elementheight = $this.children().first().outerHeight();
				if(opt.uuid == ''){opt.uuid = (this.id) ? 'slider-'+this.id : 'slider-'+index;}
				$this.data(opt);

				/* make slider structure */
				if($this.parent().is('.js-slider-innerwrap')){
					$parentEle = $this.parents('.js-slider-wrap');
					var current = -1;
					var $sliderEle = $parentEle.find('.js-slider-body');
					$sliderEle.data('current', current);
					$parentEle.find('.js-slider-next').click();
				}else{
					$this.addClass('js-slider-body');
					$this.wrap('<div class="js-'+opt.uuid+'-wrap js-slider-wrap" id="'+opt.uuid+'"><div class="js-slider-innerwrap"></div></div>');
					$parentEle = $this.parents('.js-slider-wrap');
					$parentEle.find('.js-slider-innerwrap').css({position: 'relative'});
					$parentEle.addClass('js-slider-style-'+opt.direction);
				}
				opt = $this.data();
				/* assign width-height*/

				if(opt.direction == 'horizontal'){
					$this.css({position: 'relative', width: (opt.total*opt.elementwidth)+1});
					// disable the width for responsive layout
					// $parentEle.find('.js-slider-innerwrap').width(opt.display*opt.elementwidth);
				}else{
					$this.css({position: 'relative', height: (opt.total*opt.elementheight)+1});
					$parentEle.find('.js-slider-innerwrap').width(1*opt.elementwidth);
					$parentEle.find('.js-slider-innerwrap').height(opt.display*opt.elementheight);
				}
				if($parentEle.find('.js-slider-control').length > 0){return ;}
				if(opt.isTouch){
					$parentEle.find('.js-slider-innerwrap').css('overflow','auto');
				}else{
					if(opt.total > opt.display) {
						if(opt.direction=='horizontal'){
							$parentEle.prepend('<div class="js-slider-control js-slider-prev js-slider-state-disabled" data-control="prev"><i class="icon-small_arrow_left  icon-2x"></i></div>')
							.append('<div class="js-slider-control js-slider-next" data-control="next"><i class="icon-small_arrow_right  icon-2x"></i></div>');
						} else {
							$parentEle.prepend('<div class="js-slider-control js-slider-prev js-slider-state-disabled" data-control="prev"><i class="icon-caret-up icon-2x"></i></div>')
							.append('<div class="js-slider-control js-slider-next" data-control="next"><i class="icon-caret-down icon-2x"></i></div>');
						}
						$parentEle.find('.js-slider-control').bind({
							mouseenter: function(e){ $(this).toggleClass('js-slider-state-hover'); },
							mouseleave: function(e){ $(this).toggleClass('js-slider-state-hover'); },
							click: function(e){
								var $parentEle = $(this).parent();
								var $sliderEle = $parentEle.find('.js-slider-body');

								var opt = $sliderEle.data();
								var current = opt.current || 1;
								var doSlide=false;
								if($(this).is('.js-slider-prev') && current > 1){
									current-=opt.slidenum;
									doSlide=true;
								}
								if($(this).is('.js-slider-next') && current+opt.display <= opt.total){
									current+=opt.slidenum;
									doSlide=true;
								}
								if(current < 1) current = 1;
								if(!doSlide) return ;

								if(opt.direction == 'horizontal'){
									$sliderEle.animate({right : ((current-1)*opt.elementwidth)},opt.duration*1000);
								}else{
									$sliderEle.animate({bottom : ((current-1)*opt.elementheight)},opt.duration*1000);
								}
								$sliderEle.data('current', current);

								if(current+opt.display > opt.total){
									$parentEle
										.find('.js-slider-next')
										.addClass('js-slider-state-disabled');
								}else{
									$parentEle
										.find('.js-slider-next')
										.removeClass('js-slider-state-disabled');
								}
								if(current == 1){
									$parentEle
										.find('.js-slider-prev')
										.addClass('js-slider-state-disabled');
								}else{
									$parentEle
										.find('.js-slider-prev')
										.removeClass('js-slider-state-disabled');
								}
							}
						});
					}
				}
			});
		}
	}
})(jQuery);


//create namespace for jqSlider
Venda.namespace('Widget.jqSlider');

Venda.Widget.jqSlider.switched   = true;
Venda.Widget.jqSlider.maxHeight = 0;

Venda.Widget.jqSlider.doslider  = function() {
	if (jQuery('.header-row-one.show-for-small').is(':visible') && !Venda.Widget.jqSlider.switched  ){
		//mobile screen
	   	 Venda.Widget.jqSlider.switched  = true;
		Venda.Widget.jqSlider.disableSlider();
	}   else if (Venda.Widget.jqSlider.switched  && jQuery('.header-row-one.show-for-small').is(':hidden')) {
		jQuery(".js-productSlider").find(".morebutton").hide();
	    	Venda.Widget.jqSlider.switched  = false;
		Venda.Widget.jqSlider.enableSlider();
		jQuery('#bottomtab').find(".js-tab-header > .js-tab-nav li").off('click')
	}
};

Venda.Widget.jqSlider.getHeight  = function(objID) {
	Venda.Widget.jqSlider.maxHeight = 0;
	jQuery('#'+objID).find('.js-slider li:lt(5)').each(function () {
	            Venda.Widget.jqSlider.maxHeight  += jQuery(this).outerHeight(true);
	  });
};
Venda.Widget.jqSlider.showMore  = function(obj) {
	var objID = obj.parent('.js-productSlider').attr('id');
	jQuery('#'+objID).find('.js-slider').removeClass('showLess');
	var maxHeight = 'auto';
	jQuery('#'+objID).find(".morebutton").find('i').removeClass('icon-expand_icon').addClass('icon-close_icon');
	jQuery('#'+objID).find(".morebutton").find('span').html('View less best buys');
       	 jQuery('#'+objID).find(".js-slider").css({
        		'height' : maxHeight,
        		'width' : 'auto'
    	});

};
Venda.Widget.jqSlider.showLess  = function(obj) {
	var objID = obj.parent('.js-productSlider').attr('id');
	jQuery('#'+objID).find(".morebutton").show();
	Venda.Widget.jqSlider.getHeight(objID);
	jQuery('#'+objID).find('.js-slider').addClass('showLess');
	var maxHeight = Venda.Widget.jqSlider.maxHeight +'px';
	jQuery('#'+objID).find(".morebutton").find('i').addClass('icon-expand_icon').removeClass('icon-close_icon');
	jQuery('#'+objID).find(".morebutton").find('span').html('View more best buys');
       	 jQuery('#'+objID).find(".js-slider").css({
        		'height' : maxHeight
    	});
};

Venda.Widget.jqSlider.disableSlider = function(){
	jQuery('.js-slider').jqSlider({sliderEnable: 0});
	jQuery('.js-slider').removeClass('js-slider-active');
	jQuery('.js-slider').removeAttr('style');
	jQuery('.js-slider').parents('.js-productSlider').find('.js-slider-control').remove();
	jQuery(".js-productSlider").find(".morebutton").hide();

	jQuery('.js-productSlider').each(function(){
		if(jQuery(this).find('.js-slider li').length >= 6){
			Venda.Widget.jqSlider.showLess(jQuery(this).find(".morebutton"));
		}
	});
	jQuery('#bottomtab').find(".js-tab-header > .js-tab-nav li").on('click',function(){
		if(jQuery('.js-tab-content .js-tab-active').find('.js-slider li').length >= 6){
			Venda.Widget.jqSlider.showLess(jQuery('.js-tab-content .js-tab-active').find(".morebutton"));
		}
	});
	jQuery('.morebutton').off('click');
       	jQuery('.morebutton').on('click',function(e){
       		e.preventDefault();
       		if(jQuery(this).parent('.js-productSlider').find('.js-slider.showLess').length > 0){
       			Venda.Widget.jqSlider.showMore(jQuery(this));
       		}else{
			Venda.Widget.jqSlider.showLess(jQuery(this));
       		}
       	});
};

Venda.Widget.jqSlider.enableSlider = function(){
	jQuery('.js-slider').addClass('js-slider-active');
	jQuery(".js-productSlider").find(".morebutton").hide();
	jQuery('.js-productSlider').each(function(){
		Venda.Widget.jqSlider.showMore(jQuery(this).find(".morebutton"));
	});
	jQuery('.js-slider').jqSlider({isTouch: Modernizr.touch,sliderEnable: 1});
};


jQuery(window).on({
	 load:function(){
		if(jQuery(".js-slider").length > 0){
			if(jQuery('.header-row-one.show-for-small').is(':visible')){
				Venda.Widget.jqSlider.switched    = false;
				//Venda.Widget.jqSlider.getHeight();
			}
			Venda.Widget.jqSlider.doslider();
		}
		jQuery('.prod-detail-slider').jqSlider({isTouch: Modernizr.touch,sliderEnable: 1});
	 },
	 resize:function(){
	 	if(jQuery(".js-slider").length > 0){
	    		Venda.Widget.jqSlider.doslider();
		 }
	 }
});

