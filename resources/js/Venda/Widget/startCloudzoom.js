//create namespace for startCloudzoom
Venda.namespace('Widget.startCloudzoom');


Venda.Widget.startCloudzoom.switched   = true;
Venda.Widget.startCloudzoom.scrWidth = 641;

Venda.Widget.startCloudzoom.setCloudzoom  = function() {
    var H = jQuery('#productdetail-image').find("img").height();
    jQuery('#productdetail-image').css('min-height', H);
    if ((jQuery(window).width() < Venda.Widget.startCloudzoom.scrWidth) && !Venda.Widget.startCloudzoom.switched ){
            //mobile screen
             Venda.Widget.startCloudzoom.switched = true;

           if(jQuery('.cloudzoom').hasClass('activeZoom')){
                jQuery('.cloudzoom').data('CloudZoom').destroy();
                jQuery('.cloudzoom').removeClass('activeZoom');
            }
            jQuery(swipeEvent);
    } else if (Venda.Widget.startCloudzoom.switched && (jQuery(window).width() > (Venda.Widget.startCloudzoom.scrWidth-1))) {

            Venda.Widget.startCloudzoom.switched = false;

            if(Venda.Attributes.howManyLargeImgs > 0){

                jQuery('.cloudzoom').addClass('activeZoom');
                jQuery('.js-productdetail-swipe').hide();
                var options = {
                zoomSizeMode: 'image',
                zoomPosition:4,
                variableMagnification:false,
                disableZoom : 'auto'
                };
                jQuery('#zoom1, .cloudzoom-gallery').CloudZoom(options);
            }else {
                Venda.Attributes.ViewAlternativeImg();
            }

        jQuery('#productdetail-altview').find("a").bind("click", function(event){
            event.preventDefault();

            jQuery('.prod-loading, .prod-loading-bg').show();
            jQuery('#zoom1').load(function(){
                jQuery('.prod-loading, .prod-loading-bg').hide();
            });
        });

    }
};
var currentData = "";
jQuery(window).on({
     load:function(){
        jQuery('#productdetail-altview').jqSlider({isTouch: Modernizr.touch,sliderEnable: 1});

        if(jQuery(window).width() < Venda.Widget.startCloudzoom.scrWidth){
            Venda.Widget.startCloudzoom.switched   = false;
        }
        Venda.Widget.startCloudzoom.setCloudzoom();
     },
     resize:function(){
        Venda.Widget.startCloudzoom.setCloudzoom();
     }
});

var itemnum = 0;
// Events
var swipeEvent = function(){
    var objAltview = jQuery('#productdetail-altview');
    var howManyAlt = parseInt(objAltview.find("a").length);
    if(howManyAlt <= 1){
            jQuery('.js-productdetail-swipe').hide();
            return false;
    }else {
        jQuery('.js-productdetail-swipe').fadeIn();
        setTimeout('jQuery(".swipetext").fadeOut();',7000);
        Venda.Attributes.ViewAlternativeImg();

        jQuery('.js-productdetail-swipe').on("swipeleft swiperight", function(event){
            var current = itemnum;
            jQuery(".swipetext").fadeOut();

            switch(event.type){
                case "swipeleft":
                    ++current;
                    current = (current >= howManyAlt)?0:current;       itemnum = current ;
                    objAltview.find("a").eq(current).trigger("click");
                    return false;
                break;

                case "swiperight":
                default:
                    --current;
                    current = (current < 0)?howManyAlt-1:current; itemnum = current ;
                    objAltview.find("a").eq(current).trigger("click");
                    return false;
            }
        });
    }
};
