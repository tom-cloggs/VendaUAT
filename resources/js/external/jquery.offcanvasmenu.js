/*global console, $, google, util, jQuery, FastClick: true */
/*jslint browser: true */
/*jslint white: true */
/*jslint bitwise: true */
/*jslint plusplus: true */

/**
 * jquery.offcanvasmenu.js
 * https://github.com/cloudfour/offCanvasMenu
 * ---------
 * REVISIONS
 * 030713 - AJW - Updated to allow off-canvas from both sides of the screen.
 * ---------
 */
(function() {
  var $;

  $ = typeof jQuery !== "undefined" && jQuery !== null ? jQuery : Zepto;

  $.offCanvasMenu = function(options) {
  var actions, baseCSS, body, container, cssSupport, head, inner, innerWrapper, menu, menuLeft, outer, outerWrapper, settings, transEndEventName, transformPosition, transformPrefix, trigger;
    settings = {
      direction: "left",
      coverage: "70%",
      menu: "#menu",
      trigger: "#menu-trigger",
      duration: 250,
      container: 'body',
      classes: {
        inner: 'inner-wrapper',
        outer: 'outer-wrapper',
        container: 'off-canvas-menu',
        open: 'menu-open'
      },
      transEndEventNames: {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
      }
    };
    settings = $.extend(settings, options);
    cssSupport = (typeof Zepto === "undefined" || Zepto === null) && (typeof Modernizr !== "undefined" && Modernizr !== null) && Modernizr.csstransforms && Modernizr.csstransitions;
    if (cssSupport) {
      transformPrefix = Modernizr.prefixed('transform').replace(/([A-Z])/g, function(str, m1) {
        return '-' + m1.toLowerCase();
      }).replace(/^ms-/, '-ms-');
      transEndEventName = settings.transEndEventNames[Modernizr.prefixed('transition')];
    }
    head = $('head');
    body = $(settings.container);
    trigger = $(settings.trigger);
    menu = $(settings.menu);
    transformPosition = settings.direction === "left" ? settings.coverage : "-" + settings.coverage;
    menuLeft = settings.direction === "left" ? "-" + settings.coverage : "100%";
    container = settings.container + "." + settings.classes.container;
    inner = container + " ." + settings.classes.inner;
    outer = container + " ." + settings.classes.outer;
    baseCSS = "<style>  " + outer + " {      left: 0;      overflow-x: hidden;      position: absolute;      top: 0;      width: 100%;    }    " + inner + " {      position: relative;      -webkit-backface-visibility: hidden;    }    " + container + " " + settings.menu + " {      display : block;      height  : 0;      left    : " + menuLeft + ";      margin  : 0;      overflow: hidden;      position: absolute;      top     : 0;      width   : " + settings.coverage + ";    }  </style>";
    head.append(baseCSS);
    actions = {
      on: function() {
        if (window.location.hash === settings.menu) {
          window.location.hash = '';
        }
        body.children(':not(script)').wrapAll('<div class="' + settings.classes.outer + '"/>');
        outerWrapper = $("." + settings.classes.outer);
        outerWrapper.wrapInner('<div class="' + settings.classes.inner + '"/>');
        innerWrapper = $("." + settings.classes.inner);
        trigger.find("a").add(trigger).each(function() {
          $(this).data("href", $(this).attr("href"));
          return $(this).attr("href", "");
        });
        body.addClass(settings.classes.container);
        window.oc = true;
      },
      off: function(callback) {
        innerWrapper = $("." + settings.classes.inner);
        outerWrapper = $("." + settings.classes.outer);

        trigger.find("a").add(trigger).each(function() {
          $(this).attr("href", $(this).data("href"));
          return $(this).data("href", "");
        });
        actions.hide();
        setTimeout(function () {
        body.removeClass(settings.classes.container);
        l = innerWrapper.children();
        body.prepend(l);
        outerWrapper.remove();
        body.removeClass(settings.classes.open);
        },250);
        if (callback) { callback(); }
      },
      toggle: function() {
        if (!$(container).length) {
          return false;
        }
        if (body.hasClass(settings.classes.open) === true) {
          return actions.hide();
        } else {
          return actions.show();
        }
      },
      show: function() {
        if (!$(container).length) {
          return false;
        }
        actions.setHeights();
        actions.animate(transformPosition);
        $(window).on("resize", actions.setHeights);
        return body.addClass(settings.classes.open);
      },
      hide: function() {
        if (!$(container).length) {
          return false;
        }
        actions.animate(0);
        //$(window).off("resize");
        //return body.removeClass(settings.classes.open);
      },
      animate: function(position) {
        var animationCallback;
        if (!position) {
          animationCallback = actions.clearHeights;
        }
        if (typeof Zepto !== "undefined" && Zepto !== null) {
          return innerWrapper.animate({
            "translateX": position
          }, settings.duration, "ease", animationCallback);
        } else if (cssSupport) {
          innerWrapper.css({
            transition: transformPrefix + " " + settings.duration + "ms ease",
            transform: "translateX(" + position + ")"
          });
          if (!position) {
            return innerWrapper.on(transEndEventName, function() {
              actions.clearHeights();
              return innerWrapper.off(transEndEventName);
            });
          }
        } else {
          return innerWrapper.animate({
            left: position
          }, settings.duration, animationCallback);
        }
      },
      setHeights: function() {
        var height;
        actions.clearHeights();
        height = Math.max($(window).height(), $(document).height(), body.prop('scrollHeight'));
        outerWrapper.css("height", height);
        if (height > innerWrapper.height()) {
          innerWrapper.css("height", height);
        }
        if (height > menu.height()) {
          return menu.css("height", height);
        }
      },
      clearHeights: function() {
        outerWrapper = $("." + settings.classes.outer);
        return outerWrapper.add(innerWrapper).add(menu).css("height", "");
      },
      pauseClicks: function() {
        body.on("click", function(e) {
          e.preventDefault();
          return e.stopPropagation();
        });
        return setTimeout((function() {
          return body.off("click");
        }), settings.duration * 2);
      }
    };
    return {
      on: actions.on,
      off: actions.off,
      toggle: actions.toggle,
      show: actions.show,
      hide: actions.hide
    };
  };

}).call(this);
