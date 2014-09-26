/**
 * An Off-canvas approach for small device
 * Account details and Minicart off-canvas style (left/right) when viewing the site on a small device
*/
jQuery(function(){
  jQuery(document).on('click', '#js-canvas-left', function (e) {
    e.preventDefault();
    jQuery('html').toggleClass("js-activeLeft");
  });
  jQuery(document).on('click', '#js-canvas-right', function (e) {
    e.preventDefault();
    jQuery('html').toggleClass("js-activeRight");
    if (!Venda.mcd.minicartLoaded) { Venda.mcd.loadMinicartHtml(); }
  });
});

jQuery(document).on('click', '#js-canvas-content-left li:not(.recentorders)', function () {
  jQuery('html').toggleClass("js-activeLeft");
});

jQuery(document).on('click', '#js-canvas-content-right #minicartClose', function () {
  jQuery('html').toggleClass("js-activeRight");
});

jQuery(window).on('resize', function () {
  // ONLY do if screen size is equal/more than 768
  if (Modernizr.mq('only all and (min-width: 768px)')) {
    jQuery('html').removeClass("js-activeLeft js-activeRight");
  }
});