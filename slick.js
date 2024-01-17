/*** Slick Version: 1.6.0 */
!function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            a.extend(e, e.initials),
            e.activeBreakpoint = null,
            e.animType = null,
            e.animProp = null,
            e.breakpoints = [],
            e.breakpointSettings = [],
            e.cssTransitions = !1,
            e.focussed = !1,
            e.interrupted = !1,
            e.hidden = "hidden",
            e.paused = !0,
            e.positionProp = null,
            e.respondTo = null,
            e.rowCount = 1,
            e.shouldClick = !0,
            e.$slider = a(c),
            e.$slidesCache = null,
            e.transformType = null,
            e.transitionType = null,
            e.visibilityChange = "visibilitychange",
            e.windowWidth = 0,
            e.windowTimer = null,
            f = a(c).data("slick") || {},
            e.options = a.extend({}, e.defaults, d, f),
            e.currentSlide = e.options.initialSlide,
            e.originalSettings = e.options,
            "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden",
            e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden",
            e.visibilityChange = "webkitvisibilitychange"),
            e.autoPlay = a.proxy(e.autoPlay, e),
            e.autoPlayClear = a.proxy(e.autoPlayClear, e),
            e.autoPlayIterator = a.proxy(e.autoPlayIterator, e),
            e.changeSlide = a.proxy(e.changeSlide, e),
            e.clickHandler = a.proxy(e.clickHandler, e),
            e.selectHandler = a.proxy(e.selectHandler, e),
            e.setPosition = a.proxy(e.setPosition, e),
            e.swipeHandler = a.proxy(e.swipeHandler, e),
            e.dragHandler = a.proxy(e.dragHandler, e),
            e.keyHandler = a.proxy(e.keyHandler, e),
            e.instanceUid = b++,
            e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            e.registerBreakpoints(),
            e.init(!0)
        }
        var b = 0;
        return c
    }(),
    b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c)
            d = c,
            c = null;
        else if (0 > c || c >= e.slideCount)
            return !1;
        e.unload(),
        "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack),
        e.$slides = e.$slideTrack.children(this.options.slide),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slideTrack.append(e.$slides),
        e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }),
        e.$slidesCache = e.$slides,
        e.reinit()
    }
    ,
    b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }
    ,
    b.prototype.animateSlide = function(b, c) {
        var d = {}
          , e = this;
        e.animateHeight(),
        e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
        e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
        a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a),
                e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)",
                e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)",
                e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(),
        b = Math.ceil(b),
        e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)",
        e.$slideTrack.css(d),
        c && setTimeout(function() {
            e.disableTransition(),
            c.call()
        }, e.options.speed))
    }
    ,
    b.prototype.getNavTarget = function() {
        var b = this
          , c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)),
        c
    }
    ,
    b.prototype.asNavFor = function(b) {
        var c = this
          , d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }
    ,
    b.prototype.applyTransition = function(a) {
        var b = this
          , c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase,
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }
    ,
    b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(),
        a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }
    ,
    b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }
    ,
    b.prototype.autoPlayIterator = function() {
        var a = this
          , b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll,
        a.currentSlide - 1 === 0 && (a.direction = 1))),
        a.slideHandler(b))
    }
    ,
    b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"),
        b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"),
        b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows),
        b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
        b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"),
            d = a("<ul />").addClass(b.options.dotsClass),
            c = 0; c <= b.getDotCount(); c += 1)
                d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots),
            b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        b.slideCount = b.$slides.length,
        b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }),
        b.$slider.addClass("slick-slider"),
        b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(),
        b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        b.$slideTrack.css("opacity", 0),
        (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1),
        a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
        b.setupInfinite(),
        b.buildArrows(),
        b.buildDots(),
        b.updateDots(),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.options.draggable === !0 && b.$list.addClass("draggable")
    }
    ,
    b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(),
        g = a.$slider.children(),
        a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows,
            f = Math.ceil(g.length / h),
            b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)),
        d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints)
                d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f,
            "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b)),
            h = f) : (d.activeBreakpoint = f,
            "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b)),
            h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null,
            d.options = d.originalSettings,
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b),
            h = f),
            b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }
    ,
    b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this, e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(),
        e.is("li") || (e = e.closest("li")),
        h = d.slideCount % d.options.slidesToScroll !== 0,
        f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll,
        b.data.message) {
        case "previous":
            g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f,
            d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
            break;
        case "next":
            g = 0 === f ? d.options.slidesToScroll : f,
            d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
            break;
        case "index":
            var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
            d.slideHandler(d.checkNavigable(i), !1, c),
            e.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(),
        d = 0,
        a > c[c.length - 1])
            a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }
    ,
    b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
        b.$slider.off("focus.slick blur.slick"),
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
        b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
        b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
        b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
        b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
        b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
        b.$list.off("click.slick", b.clickHandler),
        a(document).off(b.visibilityChange, b.visibility),
        b.cleanUpSlideEvents(),
        b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler),
        a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange),
        a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
        a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault),
        a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }
    ,
    b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }
    ,
    b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(),
        b.removeAttr("style"),
        a.$slider.empty().append(b))
    }
    ,
    b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(),
        a.stopPropagation(),
        a.preventDefault())
    }
    ,
    b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(),
        c.touchObject = {},
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }),
        c.$slideTrack.children(this.options.slide).detach(),
        c.$slideTrack.detach(),
        c.$list.detach(),
        c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.$slider.removeClass("slick-dotted"),
        c.unslicked = !0,
        b || c.$slider.trigger("destroy", [c])
    }
    ,
    b.prototype.disableTransition = function(a) {
        var b = this
          , c = {};
        c[b.transitionType] = "",
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }
    ,
    b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }),
        c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a),
        c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }),
        b && setTimeout(function() {
            c.disableTransition(a),
            b.call()
        }, c.options.speed))
    }
    ,
    b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a),
        b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }
    ,
    b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides,
        b.unload(),
        b.$slideTrack.children(this.options.slide).detach(),
        b.$slidesCache.filter(a).appendTo(b.$slideTrack),
        b.reinit())
    }
    ,
    b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"),
                b.autoPlay())
            }, 0)
        })
    }
    ,
    b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }
    ,
    b.prototype.getDotCount = function() {
        var a = this
          , b = 0
          , c = 0
          , d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount; )
                ++d,
                b = c + a.options.slidesToScroll,
                c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0)
            d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount; )
                ++d,
                b = c + a.options.slidesToScroll,
                c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else
            d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }
    ,
    b.prototype.getLeft = function(a) {
        var c, d, f, b = this, e = 0;
        return b.slideOffset = 0,
        d = b.$slides.first().outerHeight(!0),
        b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1,
        e = d * b.options.slidesToShow * -1),
        b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1,
        e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1,
        e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth,
        e = (a + b.options.slidesToShow - b.slideCount) * d),
        b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0,
        e = 0),
        b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0,
        b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)),
        c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e,
        b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow),
        c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0,
        b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1),
        c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0,
        c += (b.$list.width() - f.outerWidth()) / 2)),
        c
    }
    ,
    b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }
    ,
    b.prototype.getNavigableIndexes = function() {
        var e, a = this, b = 0, c = 0, d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll,
        c = -1 * a.options.slidesToScroll,
        e = 2 * a.slideCount); e > b; )
            d.push(b),
            b = c + a.options.slidesToScroll,
            c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }
    ,
    b.prototype.getSlick = function() {
        return this
    }
    ,
    b.prototype.getSlideCount = function() {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0,
        b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f,
            !1) : void 0
        }),
        c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }
    ,
    b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }
    ,
    b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots(),
        c.checkResponsive(!0),
        c.focusHandler()),
        b && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA(),
        c.options.autoplay && (c.paused = !1,
        c.autoPlay())
    }
    ,
    b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        b.$slideTrack.attr("role", "listbox"),
        b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }),
        null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        b.activateADA()
    }
    ,
    b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide),
        a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }
    ,
    b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide),
        b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }
    ,
    b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }
    ,
    b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(),
        b.initDotEvents(),
        b.initSlideEvents(),
        b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler),
        b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler),
        b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler),
        b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler),
        b.$list.on("click.slick", b.clickHandler),
        a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
        b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)),
        a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)),
        a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
        a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }
    ,
    b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(),
        a.$nextArrow.show()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }
    ,
    b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }
    ,
    b.prototype.lazyLoad = function() {
        function g(c) {
            a("img[data-lazy]", c).each(function() {
                var c = a(this)
                  , d = a(this).attr("data-lazy")
                  , e = document.createElement("img");
                e.onload = function() {
                    c.animate({
                        opacity: 0
                    }, 100, function() {
                        c.attr("src", d).animate({
                            opacity: 1
                        }, 200, function() {
                            c.removeAttr("data-lazy").removeClass("slick-loading")
                        }),
                        b.$slider.trigger("lazyLoaded", [b, c, d])
                    })
                }
                ,
                e.onerror = function() {
                    c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    b.$slider.trigger("lazyLoadError", [b, c, d])
                }
                ,
                e.src = d
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1),
        f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)),
        f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide,
        f = Math.ceil(e + b.options.slidesToShow),
        b.options.fade === !0 && (e > 0 && e--,
        f <= b.slideCount && f++)),
        c = b.$slider.find(".slick-slide").slice(e, f),
        g(c),
        b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"),
        g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow),
        g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow),
        g(d))
    }
    ,
    b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(),
        a.$slideTrack.css({
            opacity: 1
        }),
        a.$slider.removeClass("slick-loading"),
        a.initUI(),
        "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }
    ,
    b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(),
        a.setPosition()
    }
    ,
    b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(),
        a.paused = !0
    }
    ,
    b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(),
        a.options.autoplay = !0,
        a.paused = !1,
        a.focussed = !1,
        a.interrupted = !1
    }
    ,
    b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]),
        b.animating = !1,
        b.setPosition(),
        b.swipeLeft = null,
        b.options.autoplay && b.autoPlay(),
        b.options.accessibility === !0 && b.initADA())
    }
    ,
    b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }
    ,
    b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var e, f, g, c = this, d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(),
        f = e.attr("data-lazy"),
        g = document.createElement("img"),
        g.onload = function() {
            e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"),
            c.options.adaptiveHeight === !0 && c.setPosition(),
            c.$slider.trigger("lazyLoaded", [c, e, f]),
            c.progressiveLazyLoad()
        }
        ,
        g.onerror = function() {
            3 > b ? setTimeout(function() {
                c.progressiveLazyLoad(b + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            c.$slider.trigger("lazyLoadError", [c, e, f]),
            c.progressiveLazyLoad())
        }
        ,
        g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }
    ,
    b.prototype.refresh = function(b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow,
        !c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
        c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
        d = c.currentSlide,
        c.destroy(!0),
        a.extend(c, c.initials, {
            currentSlide: d
        }),
        c.init(),
        b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }
    ,
    b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this, f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1,
                d = f[c].breakpoint,
                f.hasOwnProperty(c)) {
                    for (; e >= 0; )
                        b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1),
                        e--;
                    b.breakpoints.push(d),
                    b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }
    ,
    b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"),
        b.slideCount = b.$slides.length,
        b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
        b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
        b.registerBreakpoints(),
        b.setProps(),
        b.setupInfinite(),
        b.buildArrows(),
        b.updateArrows(),
        b.initArrowEvents(),
        b.buildDots(),
        b.updateDots(),
        b.initDotEvents(),
        b.cleanUpSlideEvents(),
        b.initSlideEvents(),
        b.checkResponsive(!1, !0),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.setPosition(),
        b.focusHandler(),
        b.paused = !b.options.autoplay,
        b.autoPlay(),
        b.$slider.trigger("reInit", [b])
    }
    ,
    b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay),
        b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(),
            b.checkResponsive(),
            b.unslicked || b.setPosition()
        }, 50))
    }
    ,
    b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a,
        a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a,
        d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(),
        c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(),
        d.$slides = d.$slideTrack.children(this.options.slide),
        d.$slideTrack.children(this.options.slide).detach(),
        d.$slideTrack.append(d.$slides),
        d.$slidesCache = d.$slides,
        void d.reinit())
    }
    ,
    b.prototype.setCSS = function(a) {
        var d, e, b = this, c = {};
        b.options.rtl === !0 && (a = -a),
        d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px",
        e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px",
        c[b.positionProp] = a,
        b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {},
        b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")",
        b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)",
        b.$slideTrack.css(c)))
    }
    ,
    b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow),
        a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })),
        a.listWidth = a.$list.width(),
        a.listHeight = a.$list.height(),
        a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow),
        a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth),
        a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }
    ,
    b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) {
            c = b.slideWidth * d * -1,
            b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            })
        }),
        b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }
    ,
    b.prototype.setOption = b.prototype.slickSetOption = function() {
        var c, d, e, f, h, b = this, g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0],
        g = arguments[1],
        h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0],
        f = arguments[1],
        g = arguments[2],
        "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")),
        "single" === h)
            b.options[e] = f;
        else if ("multiple" === h)
            a.each(e, function(a, c) {
                b.options[a] = c
            });
        else if ("responsive" === h)
            for (d in f)
                if ("array" !== a.type(b.options.responsive))
                    b.options.responsive = [f[d]];
                else {
                    for (c = b.options.responsive.length - 1; c >= 0; )
                        b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1),
                        c--;
                    b.options.responsive.push(f[d])
                }
        g && (b.unload(),
        b.reinit())
    }
    ,
    b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(),
        a.setHeight(),
        a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(),
        a.$slider.trigger("setPosition", [a])
    }
    ,
    b.prototype.setProps = function() {
        var a = this
          , b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left",
        "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"),
        (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0),
        a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex),
        void 0 !== b.OTransform && (a.animType = "OTransform",
        a.transformType = "-o-transform",
        a.transitionType = "OTransition",
        void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.MozTransform && (a.animType = "MozTransform",
        a.transformType = "-moz-transform",
        a.transitionType = "MozTransition",
        void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
        void 0 !== b.webkitTransform && (a.animType = "webkitTransform",
        a.transformType = "-webkit-transform",
        a.transitionType = "webkitTransition",
        void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.msTransform && (a.animType = "msTransform",
        a.transformType = "-ms-transform",
        a.transitionType = "msTransition",
        void 0 === b.msTransform && (a.animType = !1)),
        void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform",
        a.transformType = "transform",
        a.transitionType = "transition"),
        a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }
    ,
    b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        b.$slides.eq(a).addClass("slick-current"),
        b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2),
        b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
        d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")),
        b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow,
        e = b.options.infinite === !0 ? b.options.slidesToShow + a : a,
        b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }
    ,
    b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1),
        b.options.infinite === !0 && b.options.fade === !1 && (d = null,
        b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow,
            c = b.slideCount; c > b.slideCount - e; c -= 1)
                d = c - 1,
                a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1)
                d = c,
                a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }
    ,
    b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(),
        b.interrupted = a
    }
    ,
    b.prototype.selectHandler = function(b) {
        var c = this
          , d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide")
          , e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0),
        c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e),
        void c.asNavFor(e)) : void c.slideHandler(e)
    }
    ,
    b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, j, h = null, i = this;
        return b = b || !1,
        i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a),
        d = a,
        h = i.getLeft(d),
        g = i.getLeft(i.currentSlide),
        i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft,
        i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide,
        c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide,
        c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer),
        e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d,
        i.animating = !0,
        i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
        f = i.currentSlide,
        i.currentSlide = e,
        i.setSlideClasses(i.currentSlide),
        i.options.asNavFor && (j = i.getNavTarget(),
        j = j.slick("getSlick"),
        j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)),
        i.updateDots(),
        i.updateArrows(),
        i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f),
        i.fadeSlide(e, function() {
            i.postSlide(e)
        })) : i.postSlide(e),
        void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function() {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }
    ,
    b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(),
        a.$nextArrow.hide()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
        a.$slider.addClass("slick-loading")
    }
    ,
    b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX,
        b = e.touchObject.startY - e.touchObject.curY,
        c = Math.atan2(b, a),
        d = Math.round(180 * c / Math.PI),
        0 > d && (d = 360 - Math.abs(d)),
        45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }
    ,
    b.prototype.swipeEnd = function(a) {
        var c, d, b = this;
        if (b.dragging = !1,
        b.interrupted = !1,
        b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0,
        void 0 === b.touchObject.curX)
            return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]),
        b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
            case "left":
            case "down":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(),
                b.currentDirection = 0;
                break;
            case "right":
            case "up":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(),
                b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c),
            b.touchObject = {},
            b.$slider.trigger("swipe", [b, d]))
        } else
            b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide),
            b.touchObject = {})
    }
    ,
    b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend"in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse")))
            switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1,
            b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold,
            b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
            a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
            }
    }
    ,
    b.prototype.swipeMove = function(a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null,
        !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide),
        b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX,
        b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY,
        b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))),
        b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))),
        e = b.swipeDirection(),
        "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(),
        g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1),
        b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
        f = b.touchObject.swipeLength,
        b.touchObject.edgeHit = !1,
        b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction,
        b.touchObject.edgeHit = !0),
        b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g,
        b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
        b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null,
        !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }
    ,
    b.prototype.swipeStart = function(a) {
        var c, b = this;
        return b.interrupted = !0,
        1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {},
        !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]),
        b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX,
        b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY,
        void (b.dragging = !0))
    }
    ,
    b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(),
        a.$slideTrack.children(this.options.slide).detach(),
        a.$slidesCache.appendTo(a.$slideTrack),
        a.reinit())
    }
    ,
    b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(),
        b.$dots && b.$dots.remove(),
        b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
        b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
        b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]),
        b.destroy()
    }
    ,
    b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2),
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }
    ,
    b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }
    ,
    a.fn.slick = function() {
        var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length;
        for (f = 0; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f],c) : g = a[f].slick[c].apply(a[f].slick, d),
            "undefined" != typeof g)
                return g;
        return a
    }
});
/*** Rellax */
!function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? module.exports = t() : e.Rellax = t()
}("undefined" != typeof window ? window : global, function() {
    var e = function(t, o) {
        var n = Object.create(e.prototype)
          , r = 0
          , i = 0
          , a = 0
          , l = 0
          , s = []
          , p = !0
          , d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(e) {
            return setTimeout(e, 1e3 / 60)
        }
          , c = null
          , m = !1;
        try {
            var u = Object.defineProperty({}, "passive", {
                get: function() {
                    m = !0
                }
            });
            window.addEventListener("testPassive", null, u),
            window.removeEventListener("testPassive", null, u)
        } catch (e) {}
        var w = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout
          , f = window.transformProp || function() {
            var e = document.createElement("div");
            if (null === e.style.transform) {
                var t, o = ["Webkit", "Moz", "ms"];
                for (t in o)
                    if (void 0 !== e.style[o[t] + "Transform"])
                        return o[t] + "Transform"
            }
            return "transform"
        }();
        if (n.options = {
            speed: -2,
            verticalSpeed: null,
            horizontalSpeed: null,
            breakpoints: [576, 768, 1201],
            center: !1,
            wrapper: null,
            relativeToWrapper: !1,
            round: !0,
            vertical: !0,
            horizontal: !1,
            verticalScrollAxis: "y",
            horizontalScrollAxis: "x",
            callback: function() {}
        },
        o && Object.keys(o).forEach(function(e) {
            n.options[e] = o[e]
        }),
        o && o.breakpoints && function() {
            if (3 === n.options.breakpoints.length && Array.isArray(n.options.breakpoints)) {
                var e, t = !0, o = !0;
                if (n.options.breakpoints.forEach(function(n) {
                    "number" != typeof n && (o = !1),
                    null !== e && n < e && (t = !1),
                    e = n
                }),
                t && o)
                    return
            }
            n.options.breakpoints = [576, 768, 1201],
            console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted")
        }(),
        t || (t = ".rellax"),
        0 < (u = "string" == typeof t ? document.querySelectorAll(t) : [t]).length) {
            if (n.elems = u,
            n.options.wrapper && !n.options.wrapper.nodeType) {
                if (!(u = document.querySelector(n.options.wrapper)))
                    return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
                n.options.wrapper = u
            }
            var x, v = function() {
                for (var e = 0; e < s.length; e++)
                    n.elems[e].style.cssText = s[e].style;
                for (s = [],
                i = window.innerHeight,
                l = window.innerWidth,
                e = n.options.breakpoints,
                x = l < e[0] ? "xs" : l >= e[0] && l < e[1] ? "sm" : l >= e[1] && l < e[2] ? "md" : "lg",
                h(),
                e = 0; e < n.elems.length; e++) {
                    var t = void 0
                      , o = n.elems[e]
                      , r = o.getAttribute("data-rellax-percentage")
                      , a = o.getAttribute("data-rellax-speed")
                      , d = o.getAttribute("data-rellax-xs-speed")
                      , c = o.getAttribute("data-rellax-mobile-speed")
                      , m = o.getAttribute("data-rellax-tablet-speed")
                      , u = o.getAttribute("data-rellax-desktop-speed")
                      , w = o.getAttribute("data-rellax-vertical-speed")
                      , f = o.getAttribute("data-rellax-horizontal-speed")
                      , g = o.getAttribute("data-rellax-vertical-scroll-axis")
                      , z = o.getAttribute("data-rellax-horizontal-scroll-axis")
                      , T = o.getAttribute("data-rellax-zindex") || 0
                      , E = o.getAttribute("data-rellax-min")
                      , L = o.getAttribute("data-rellax-max")
                      , S = o.getAttribute("data-rellax-min-x")
                      , Y = o.getAttribute("data-rellax-max-x")
                      , k = o.getAttribute("data-rellax-min-y")
                      , O = o.getAttribute("data-rellax-max-y")
                      , X = !0;
                    d || c || m || u ? t = {
                        xs: d,
                        sm: c,
                        md: m,
                        lg: u
                    } : X = !1,
                    d = n.options.wrapper ? n.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                    n.options.relativeToWrapper && (d = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - n.options.wrapper.offsetTop);
                    var R = n.options.vertical && (r || n.options.center) ? d : 0
                      , W = n.options.horizontal && (r || n.options.center) ? n.options.wrapper ? n.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0;
                    d = R + o.getBoundingClientRect().top,
                    c = o.clientHeight || o.offsetHeight || o.scrollHeight,
                    m = W + o.getBoundingClientRect().left,
                    u = o.clientWidth || o.offsetWidth || o.scrollWidth,
                    R = r || (R - d + i) / (c + i),
                    r = r || (W - m + l) / (u + l),
                    n.options.center && (R = r = .5),
                    t = X && null !== t[x] ? Number(t[x]) : a || n.options.speed,
                    w = w || n.options.verticalSpeed,
                    f = f || n.options.horizontalSpeed,
                    g = g || n.options.verticalScrollAxis,
                    z = z || n.options.horizontalScrollAxis,
                    a = b(r, R, t, w, f),
                    o = o.style.cssText,
                    X = "",
                    (r = /transform\s*:/i.exec(o)) && (X = (r = (X = o.slice(r.index)).indexOf(";")) ? " " + X.slice(11, r).replace(/\s/g, "") : " " + X.slice(11).replace(/\s/g, "")),
                    s.push({
                        baseX: a.x,
                        baseY: a.y,
                        top: d,
                        left: m,
                        height: c,
                        width: u,
                        speed: t,
                        verticalSpeed: w,
                        horizontalSpeed: f,
                        verticalScrollAxis: g,
                        horizontalScrollAxis: z,
                        style: o,
                        transform: X,
                        zindex: T,
                        min: E,
                        max: L,
                        minX: S,
                        maxX: Y,
                        minY: k,
                        maxY: O
                    })
                }
                A(),
                p && (window.addEventListener("resize", v),
                p = !1,
                y())
            }, h = function() {
                var e = r
                  , t = a;
                return r = n.options.wrapper ? n.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset,
                a = n.options.wrapper ? n.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset,
                n.options.relativeToWrapper && (r = ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - n.options.wrapper.offsetTop),
                !!(e != r && n.options.vertical || t != a && n.options.horizontal)
            }, b = function(e, t, o, r, i) {
                var a = {};
                return e = 100 * (i || o) * (1 - e),
                t = 100 * (r || o) * (1 - t),
                a.x = n.options.round ? Math.round(e) : Math.round(100 * e) / 100,
                a.y = n.options.round ? Math.round(t) : Math.round(100 * t) / 100,
                a
            }, g = function() {
                window.removeEventListener("resize", g),
                window.removeEventListener("orientationchange", g),
                (n.options.wrapper ? n.options.wrapper : window).removeEventListener("scroll", g),
                (n.options.wrapper ? n.options.wrapper : document).removeEventListener("touchmove", g),
                c = d(y)
            }, y = function() {
                h() && !1 === p ? (A(),
                c = d(y)) : (c = null,
                window.addEventListener("resize", g),
                window.addEventListener("orientationchange", g),
                (n.options.wrapper ? n.options.wrapper : window).addEventListener("scroll", g, !!m && {
                    passive: !0
                }),
                (n.options.wrapper ? n.options.wrapper : document).addEventListener("touchmove", g, !!m && {
                    passive: !0
                }))
            }, A = function() {
                for (var e, t = 0; t < n.elems.length; t++) {
                    var o = s[t].verticalScrollAxis.toLowerCase()
                      , p = s[t].horizontalScrollAxis.toLowerCase();
                    e = -1 != o.indexOf("x") ? r : 0,
                    o = -1 != o.indexOf("y") ? r : 0;
                    var d = -1 != p.indexOf("x") ? a : 0;
                    p = -1 != p.indexOf("y") ? a : 0,
                    p = (e = b((e + d - s[t].left + l) / (s[t].width + l), (o + p - s[t].top + i) / (s[t].height + i), s[t].speed, s[t].verticalSpeed, s[t].horizontalSpeed)).y - s[t].baseY,
                    o = e.x - s[t].baseX,
                    null !== s[t].min && (n.options.vertical && !n.options.horizontal && (p = p <= s[t].min ? s[t].min : p),
                    n.options.horizontal && !n.options.vertical && (o = o <= s[t].min ? s[t].min : o)),
                    null != s[t].minY && (p = p <= s[t].minY ? s[t].minY : p),
                    null != s[t].minX && (o = o <= s[t].minX ? s[t].minX : o),
                    null !== s[t].max && (n.options.vertical && !n.options.horizontal && (p = p >= s[t].max ? s[t].max : p),
                    n.options.horizontal && !n.options.vertical && (o = o >= s[t].max ? s[t].max : o)),
                    null != s[t].maxY && (p = p >= s[t].maxY ? s[t].maxY : p),
                    null != s[t].maxX && (o = o >= s[t].maxX ? s[t].maxX : o),
                    n.elems[t].style[f] = "translate3d(" + (n.options.horizontal ? o : "0") + "px," + (n.options.vertical ? p : "0") + "px," + s[t].zindex + "px) " + s[t].transform
                }
                n.options.callback(e)
            };
            return n.destroy = function() {
                for (var e = 0; e < n.elems.length; e++)
                    n.elems[e].style.cssText = s[e].style;
                p || (window.removeEventListener("resize", v),
                p = !0),
                w(c),
                c = null
            }
            ,
            v(),
            n.refresh = v,
            n
        }
        console.warn("Rellax: The elements you're trying to select don't exist.")
    };
    return e
});
/*! sly 1.6.1 - 8th Aug 2015 | https://github.com/darsain/sly */
!function(a, b, c) {
    "use strict";
    function d(b, p, q) {
        function K(c) {
            var d = 0
              , e = Gb.length;
            if (yb.old = a.extend({}, yb),
            wb = tb ? 0 : ub[rb.horizontal ? "width" : "height"](),
            Bb = zb[rb.horizontal ? "width" : "height"](),
            xb = tb ? b : vb[rb.horizontal ? "outerWidth" : "outerHeight"](),
            Gb.length = 0,
            yb.start = 0,
            yb.end = H(xb - wb, 0),
            Rb) {
                d = Ib.length,
                Hb = vb.children(rb.itemSelector),
                Ib.length = 0;
                var f, g = j(vb, rb.horizontal ? "paddingLeft" : "paddingTop"), h = j(vb, rb.horizontal ? "paddingRight" : "paddingBottom"), i = "border-box" === a(Hb).css("boxSizing"), l = "none" !== Hb.css("float"), m = 0, n = Hb.length - 1;
                xb = 0,
                Hb.each(function(b, c) {
                    var d = a(c)
                      , e = c.getBoundingClientRect()
                      , i = G(rb.horizontal ? e.width || e.right - e.left : e.height || e.bottom - e.top)
                      , k = j(d, rb.horizontal ? "marginLeft" : "marginTop")
                      , o = j(d, rb.horizontal ? "marginRight" : "marginBottom")
                      , p = i + k + o
                      , q = !k || !o
                      , r = {};
                    r.el = c,
                    r.size = q ? i : p,
                    r.half = r.size / 2,
                    r.start = xb + (q ? k : 0),
                    r.center = r.start - G(wb / 2 - r.size / 2),
                    r.end = r.start - wb + r.size,
                    b || (xb += g),
                    xb += p,
                    rb.horizontal || l || o && k && b > 0 && (xb -= I(k, o)),
                    b === n && (r.end += h,
                    xb += h,
                    m = q ? o : 0),
                    Ib.push(r),
                    f = r
                }),
                vb[0].style[rb.horizontal ? "width" : "height"] = (i ? xb : xb - g - h) + "px",
                xb -= m,
                Ib.length ? (yb.start = Ib[0][Pb ? "center" : "start"],
                yb.end = Pb ? f.center : xb > wb ? f.end : yb.start) : yb.start = yb.end = 0
            }
            if (yb.center = G(yb.end / 2 + yb.start / 2),
            V(),
            Ab.length && Bb > 0 && (rb.dynamicHandle ? (Cb = yb.start === yb.end ? Bb : G(Bb * wb / xb),
            Cb = k(Cb, rb.minHandleSize, Bb),
            Ab[0].style[rb.horizontal ? "width" : "height"] = Cb + "px") : Cb = Ab[rb.horizontal ? "outerWidth" : "outerHeight"](),
            Db.end = Bb - Cb,
            ec || N()),
            !tb && wb > 0) {
                var o = yb.start
                  , p = "";
                if (Rb)
                    a.each(Ib, function(a, b) {
                        Pb ? Gb.push(b.center) : b.start + b.size > o && o <= yb.end && (o = b.start,
                        Gb.push(o),
                        o += wb,
                        o > yb.end && o < yb.end + wb && Gb.push(yb.end))
                    });
                else
                    for (; o - wb < yb.end; )
                        Gb.push(o),
                        o += wb;
                if (Eb[0] && e !== Gb.length) {
                    for (var q = 0; q < Gb.length; q++)
                        p += rb.pageBuilder.call(sb, q);
                    Fb = Eb.html(p).children(),
                    Fb.eq(Jb.activePage).addClass(rb.activeClass)
                }
            }
            if (Jb.slideeSize = xb,
            Jb.frameSize = wb,
            Jb.sbSize = Bb,
            Jb.handleSize = Cb,
            Rb) {
                c && null != rb.startAt && (T(rb.startAt),
                sb[Qb ? "toCenter" : "toStart"](rb.startAt));
                var r = Ib[Jb.activeItem];
                L(Qb && r ? r.center : k(yb.dest, yb.start, yb.end))
            } else
                c ? null != rb.startAt && L(rb.startAt, 1) : L(k(yb.dest, yb.start, yb.end));
            ob("load")
        }
        function L(a, b, c) {
            if (Rb && cc.released && !c) {
                var d = U(a)
                  , e = a > yb.start && a < yb.end;
                Qb ? (e && (a = Ib[d.centerItem].center),
                Pb && rb.activateMiddle && T(d.centerItem)) : e && (a = Ib[d.firstItem].start)
            }
            cc.init && cc.slidee && rb.elasticBounds ? a > yb.end ? a = yb.end + (a - yb.end) / 6 : a < yb.start && (a = yb.start + (a - yb.start) / 6) : a = k(a, yb.start, yb.end),
            ac.start = +new Date,
            ac.time = 0,
            ac.from = yb.cur,
            ac.to = a,
            ac.delta = a - yb.cur,
            ac.tweesing = cc.tweese || cc.init && !cc.slidee,
            ac.immediate = !ac.tweesing && (b || cc.init && cc.slidee || !rb.speed),
            cc.tweese = 0,
            a !== yb.dest && (yb.dest = a,
            ob("change"),
            ec || M()),
            Z(),
            V(),
            W(),
            O()
        }
        function M() {
            if (sb.initialized) {
                if (!ec)
                    return ec = t(M),
                    void (cc.released && ob("moveStart"));
                ac.immediate ? yb.cur = ac.to : ac.tweesing ? (ac.tweeseDelta = ac.to - yb.cur,
                D(ac.tweeseDelta) < .1 ? yb.cur = ac.to : yb.cur += ac.tweeseDelta * (cc.released ? rb.swingSpeed : rb.syncSpeed)) : (ac.time = I(+new Date - ac.start, rb.speed),
                yb.cur = ac.from + ac.delta * a.easing[rb.easing](ac.time / rb.speed, ac.time, 0, 1, rb.speed)),
                ac.to === yb.cur ? (yb.cur = ac.to,
                cc.tweese = ec = 0) : ec = t(M),
                ob("move"),
                tb || (m ? vb[0].style[m] = n + (rb.horizontal ? "translateX" : "translateY") + "(" + -yb.cur + "px)" : vb[0].style[rb.horizontal ? "left" : "top"] = -G(yb.cur) + "px"),
                !ec && cc.released && ob("moveEnd"),
                N()
            }
        }
        function N() {
            Ab.length && (Db.cur = yb.start === yb.end ? 0 : ((cc.init && !cc.slidee ? yb.dest : yb.cur) - yb.start) / (yb.end - yb.start) * Db.end,
            Db.cur = k(G(Db.cur), Db.start, Db.end),
            _b.hPos !== Db.cur && (_b.hPos = Db.cur,
            m ? Ab[0].style[m] = n + (rb.horizontal ? "translateX" : "translateY") + "(" + Db.cur + "px)" : Ab[0].style[rb.horizontal ? "left" : "top"] = Db.cur + "px"))
        }
        function O() {
            Fb[0] && _b.page !== Jb.activePage && (_b.page = Jb.activePage,
            Fb.removeClass(rb.activeClass).eq(Jb.activePage).addClass(rb.activeClass),
            ob("activePage", _b.page))
        }
        function P() {
            bc.speed && yb.cur !== (bc.speed > 0 ? yb.end : yb.start) || sb.stop(),
            hc = cc.init ? t(P) : 0,
            bc.now = +new Date,
            bc.pos = yb.cur + (bc.now - bc.lastTime) / 1e3 * bc.speed,
            L(cc.init ? bc.pos : G(bc.pos)),
            cc.init || yb.cur !== yb.dest || ob("moveEnd"),
            bc.lastTime = bc.now
        }
        function Q(a, b, d) {
            if ("boolean" === e(b) && (d = b,
            b = c),
            b === c)
                L(yb[a], d);
            else {
                if (Qb && "center" !== a)
                    return;
                var f = sb.getPos(b);
                f && L(f[a], d, !Qb)
            }
        }
        function R(a) {
            return null != a ? i(a) ? a >= 0 && a < Ib.length ? a : -1 : Hb.index(a) : -1
        }
        function S(a) {
            return R(i(a) && 0 > a ? a + Ib.length : a)
        }
        function T(a, b) {
            var c = R(a);
            return !Rb || 0 > c ? !1 : ((_b.active !== c || b) && (Hb.eq(Jb.activeItem).removeClass(rb.activeClass),
            Hb.eq(c).addClass(rb.activeClass),
            _b.active = Jb.activeItem = c,
            W(),
            ob("active", c)),
            c)
        }
        function U(a) {
            a = k(i(a) ? a : yb.dest, yb.start, yb.end);
            var b = {}
              , c = Pb ? 0 : wb / 2;
            if (!tb)
                for (var d = 0, e = Gb.length; e > d; d++) {
                    if (a >= yb.end || d === Gb.length - 1) {
                        b.activePage = Gb.length - 1;
                        break
                    }
                    if (a <= Gb[d] + c) {
                        b.activePage = d;
                        break
                    }
                }
            if (Rb) {
                for (var f = !1, g = !1, h = !1, j = 0, l = Ib.length; l > j; j++)
                    if (f === !1 && a <= Ib[j].start + Ib[j].half && (f = j),
                    h === !1 && a <= Ib[j].center + Ib[j].half && (h = j),
                    j === l - 1 || a <= Ib[j].end + Ib[j].half) {
                        g = j;
                        break
                    }
                b.firstItem = i(f) ? f : 0,
                b.centerItem = i(h) ? h : b.firstItem,
                b.lastItem = i(g) ? g : b.centerItem
            }
            return b
        }
        function V(b) {
            a.extend(Jb, U(b))
        }
        function W() {
            var a = yb.dest <= yb.start
              , b = yb.dest >= yb.end
              , c = (a ? 1 : 0) | (b ? 2 : 0);
            if (_b.slideePosState !== c && (_b.slideePosState = c,
            Yb.is("button,input") && Yb.prop("disabled", a),
            Zb.is("button,input") && Zb.prop("disabled", b),
            Yb.add(Vb)[a ? "addClass" : "removeClass"](rb.disabledClass),
            Zb.add(Ub)[b ? "addClass" : "removeClass"](rb.disabledClass)),
            _b.fwdbwdState !== c && cc.released && (_b.fwdbwdState = c,
            Vb.is("button,input") && Vb.prop("disabled", a),
            Ub.is("button,input") && Ub.prop("disabled", b)),
            Rb && null != Jb.activeItem) {
                var d = 0 === Jb.activeItem
                  , e = Jb.activeItem >= Ib.length - 1
                  , f = (d ? 1 : 0) | (e ? 2 : 0);
                _b.itemsButtonState !== f && (_b.itemsButtonState = f,
                Wb.is("button,input") && Wb.prop("disabled", d),
                Xb.is("button,input") && Xb.prop("disabled", e),
                Wb[d ? "addClass" : "removeClass"](rb.disabledClass),
                Xb[e ? "addClass" : "removeClass"](rb.disabledClass))
            }
        }
        function X(a, b, c) {
            if (a = S(a),
            b = S(b),
            a > -1 && b > -1 && a !== b && (!c || b !== a - 1) && (c || b !== a + 1)) {
                Hb.eq(a)[c ? "insertAfter" : "insertBefore"](Ib[b].el);
                var d = b > a ? a : c ? b : b - 1
                  , e = a > b ? a : c ? b + 1 : b
                  , f = a > b;
                null != Jb.activeItem && (a === Jb.activeItem ? _b.active = Jb.activeItem = c ? f ? b + 1 : b : f ? b : b - 1 : Jb.activeItem > d && Jb.activeItem < e && (_b.active = Jb.activeItem += f ? 1 : -1)),
                K()
            }
        }
        function Y(a, b) {
            for (var c = 0, d = $b[a].length; d > c; c++)
                if ($b[a][c] === b)
                    return c;
            return -1
        }
        function Z() {
            cc.released && !sb.isPaused && sb.resume()
        }
        function $(a) {
            return G(k(a, Db.start, Db.end) / Db.end * (yb.end - yb.start)) + yb.start
        }
        function _() {
            cc.history[0] = cc.history[1],
            cc.history[1] = cc.history[2],
            cc.history[2] = cc.history[3],
            cc.history[3] = cc.delta
        }
        function ab(a) {
            cc.released = 0,
            cc.source = a,
            cc.slidee = "slidee" === a
        }
        function bb(b) {
            var c = "touchstart" === b.type
              , d = b.data.source
              , e = "slidee" === d;
            cc.init || !c && eb(b.target) || ("handle" !== d || rb.dragHandle && Db.start !== Db.end) && (!e || (c ? rb.touchDragging : rb.mouseDragging && b.which < 2)) && (c || f(b),
            ab(d),
            cc.init = 0,
            cc.$source = a(b.target),
            cc.touch = c,
            cc.pointer = c ? b.originalEvent.touches[0] : b,
            cc.initX = cc.pointer.pageX,
            cc.initY = cc.pointer.pageY,
            cc.initPos = e ? yb.cur : Db.cur,
            cc.start = +new Date,
            cc.time = 0,
            cc.path = 0,
            cc.delta = 0,
            cc.locked = 0,
            cc.history = [0, 0, 0, 0],
            cc.pathToLock = e ? c ? 30 : 10 : 0,
            u.on(c ? x : w, cb),
            sb.pause(1),
            (e ? vb : Ab).addClass(rb.draggedClass),
            ob("moveStart"),
            e && (fc = setInterval(_, 10)))
        }
        function cb(a) {
            if (cc.released = "mouseup" === a.type || "touchend" === a.type,
            cc.pointer = cc.touch ? a.originalEvent[cc.released ? "changedTouches" : "touches"][0] : a,
            cc.pathX = cc.pointer.pageX - cc.initX,
            cc.pathY = cc.pointer.pageY - cc.initY,
            cc.path = E(F(cc.pathX, 2) + F(cc.pathY, 2)),
            cc.delta = rb.horizontal ? cc.pathX : cc.pathY,
            cc.released || !(cc.path < 1)) {
                if (!cc.init) {
                    if (cc.path < rb.dragThreshold)
                        return cc.released ? db() : c;
                    if (!(rb.horizontal ? D(cc.pathX) > D(cc.pathY) : D(cc.pathX) < D(cc.pathY)))
                        return db();
                    cc.init = 1
                }
                f(a),
                !cc.locked && cc.path > cc.pathToLock && cc.slidee && (cc.locked = 1,
                cc.$source.on(z, g)),
                cc.released && (db(),
                rb.releaseSwing && cc.slidee && (cc.swing = (cc.delta - cc.history[0]) / 40 * 300,
                cc.delta += cc.swing,
                cc.tweese = D(cc.swing) > 10)),
                L(cc.slidee ? G(cc.initPos - cc.delta) : $(cc.initPos + cc.delta))
            }
        }
        function db() {
            clearInterval(fc),
            cc.released = !0,
            u.off(cc.touch ? x : w, cb),
            (cc.slidee ? vb : Ab).removeClass(rb.draggedClass),
            setTimeout(function() {
                cc.$source.off(z, g)
            }),
            yb.cur === yb.dest && cc.init && ob("moveEnd"),
            sb.resume(1),
            cc.init = 0
        }
        function eb(b) {
            return ~a.inArray(b.nodeName, B) || a(b).is(rb.interactive)
        }
        function fb() {
            sb.stop(),
            u.off("mouseup", fb)
        }
        function gb(a) {
            switch (f(a),
            this) {
            case Ub[0]:
            case Vb[0]:
                sb.moveBy(Ub.is(this) ? rb.moveBy : -rb.moveBy),
                u.on("mouseup", fb);
                break;
            case Wb[0]:
                sb.prev();
                break;
            case Xb[0]:
                sb.next();
                break;
            case Yb[0]:
                sb.prevPage();
                break;
            case Zb[0]:
                sb.nextPage()
            }
        }
        function hb(a) {
            return dc.curDelta = (rb.horizontal ? a.deltaY || a.deltaX : a.deltaY) || -a.wheelDelta,
            dc.curDelta /= 1 === a.deltaMode ? 3 : 100,
            Rb ? (o = +new Date,
            dc.last < o - dc.resetTime && (dc.delta = 0),
            dc.last = o,
            dc.delta += dc.curDelta,
            D(dc.delta) < 1 ? dc.finalDelta = 0 : (dc.finalDelta = G(dc.delta / 1),
            dc.delta %= 1),
            dc.finalDelta) : dc.curDelta
        }
        function ib(a) {
            a.originalEvent[r] = sb;
            var b = +new Date;
            if (J + rb.scrollHijack > b && Sb[0] !== document && Sb[0] !== window)
                return void (J = b);
            if (rb.scrollBy && yb.start !== yb.end) {
                var c = hb(a.originalEvent);
                (rb.scrollTrap || c > 0 && yb.dest < yb.end || 0 > c && yb.dest > yb.start) && f(a, 1),
                sb.slideBy(rb.scrollBy * c)
            }
        }
        function jb(a) {
            rb.clickBar && a.target === zb[0] && (f(a),
            L($((rb.horizontal ? a.pageX - zb.offset().left : a.pageY - zb.offset().top) - Cb / 2)))
        }
        function kb(a) {
            if (rb.keyboardNavBy)
                switch (a.which) {
                case rb.horizontal ? 37 : 38:
                    f(a),
                    sb["pages" === rb.keyboardNavBy ? "prevPage" : "prev"]();
                    break;
                case rb.horizontal ? 39 : 40:
                    f(a),
                    sb["pages" === rb.keyboardNavBy ? "nextPage" : "next"]()
                }
        }
        function lb(a) {
            return eb(this) ? void (a.originalEvent[r + "ignore"] = !0) : void (this.parentNode !== vb[0] || a.originalEvent[r + "ignore"] || sb.activate(this))
        }
        function mb() {
            this.parentNode === Eb[0] && sb.activatePage(Fb.index(this))
        }
        function nb(a) {
            rb.pauseOnHover && sb["mouseenter" === a.type ? "pause" : "resume"](2)
        }
        function ob(a, b) {
            if ($b[a]) {
                for (qb = $b[a].length,
                C.length = 0,
                pb = 0; qb > pb; pb++)
                    C.push($b[a][pb]);
                for (pb = 0; qb > pb; pb++)
                    C[pb].call(sb, a, b)
            }
        }
        if (!(this instanceof d))
            return new d(b,p,q);
        var pb, qb, rb = a.extend({}, d.defaults, p), sb = this, tb = i(b), ub = a(b), vb = rb.slidee ? a(rb.slidee).eq(0) : ub.children().eq(0), wb = 0, xb = 0, yb = {
            start: 0,
            center: 0,
            end: 0,
            cur: 0,
            dest: 0
        }, zb = a(rb.scrollBar).eq(0), Ab = zb.children().eq(0), Bb = 0, Cb = 0, Db = {
            start: 0,
            end: 0,
            cur: 0
        }, Eb = a(rb.pagesBar), Fb = 0, Gb = [], Hb = 0, Ib = [], Jb = {
            firstItem: 0,
            lastItem: 0,
            centerItem: 0,
            activeItem: null,
            activePage: 0
        }, Kb = new l(ub[0]), Lb = new l(vb[0]), Mb = new l(zb[0]), Nb = new l(Ab[0]), Ob = "basic" === rb.itemNav, Pb = "forceCentered" === rb.itemNav, Qb = "centered" === rb.itemNav || Pb, Rb = !tb && (Ob || Qb || Pb), Sb = rb.scrollSource ? a(rb.scrollSource) : ub, Tb = rb.dragSource ? a(rb.dragSource) : ub, Ub = a(rb.forward), Vb = a(rb.backward), Wb = a(rb.prev), Xb = a(rb.next), Yb = a(rb.prevPage), Zb = a(rb.nextPage), $b = {}, _b = {}, ac = {}, bc = {}, cc = {
            released: 1
        }, dc = {
            last: 0,
            delta: 0,
            resetTime: 200
        }, ec = 0, fc = 0, gc = 0, hc = 0;
        tb || (b = ub[0]),
        sb.initialized = 0,
        sb.frame = b,
        sb.slidee = vb[0],
        sb.pos = yb,
        sb.rel = Jb,
        sb.items = Ib,
        sb.pages = Gb,
        sb.isPaused = 0,
        sb.options = rb,
        sb.dragging = cc,
        sb.reload = function() {
            K()
        }
        ,
        sb.getPos = function(a) {
            if (Rb) {
                var b = R(a);
                return -1 !== b ? Ib[b] : !1
            }
            var c = vb.find(a).eq(0);
            if (c[0]) {
                var d = rb.horizontal ? c.offset().left - vb.offset().left : c.offset().top - vb.offset().top
                  , e = c[rb.horizontal ? "outerWidth" : "outerHeight"]();
                return {
                    start: d,
                    center: d - wb / 2 + e / 2,
                    end: d - wb + e,
                    size: e
                }
            }
            return !1
        }
        ,
        sb.moveBy = function(a) {
            bc.speed = a,
            !cc.init && bc.speed && yb.cur !== (bc.speed > 0 ? yb.end : yb.start) && (bc.lastTime = +new Date,
            bc.startPos = yb.cur,
            ab("button"),
            cc.init = 1,
            ob("moveStart"),
            s(hc),
            P())
        }
        ,
        sb.stop = function() {
            "button" === cc.source && (cc.init = 0,
            cc.released = 1)
        }
        ,
        sb.prev = function() {
            sb.activate(null == Jb.activeItem ? 0 : Jb.activeItem - 1)
        }
        ,
        sb.next = function() {
            sb.activate(null == Jb.activeItem ? 0 : Jb.activeItem + 1)
        }
        ,
        sb.prevPage = function() {
            sb.activatePage(Jb.activePage - 1)
        }
        ,
        sb.nextPage = function() {
            sb.activatePage(Jb.activePage + 1)
        }
        ,
        sb.slideBy = function(a, b) {
            a && (Rb ? sb[Qb ? "toCenter" : "toStart"](k((Qb ? Jb.centerItem : Jb.firstItem) + rb.scrollBy * a, 0, Ib.length)) : L(yb.dest + a, b))
        }
        ,
        sb.slideTo = function(a, b) {
            L(a, b)
        }
        ,
        sb.toStart = function(a, b) {
            Q("start", a, b)
        }
        ,
        sb.toEnd = function(a, b) {
            Q("end", a, b)
        }
        ,
        sb.toCenter = function(a, b) {
            Q("center", a, b)
        }
        ,
        sb.getIndex = R,
        sb.activate = function(a, b) {
            var c = T(a);
            rb.smart && c !== !1 && (Qb ? sb.toCenter(c, b) : c >= Jb.lastItem ? sb.toStart(c, b) : c <= Jb.firstItem ? sb.toEnd(c, b) : Z())
        }
        ,
        sb.activatePage = function(a, b) {
            i(a) && L(Gb[k(a, 0, Gb.length - 1)], b)
        }
        ,
        sb.resume = function(a) {
            rb.cycleBy && rb.cycleInterval && ("items" !== rb.cycleBy || Ib[0] && null != Jb.activeItem) && !(a < sb.isPaused) && (sb.isPaused = 0,
            gc ? gc = clearTimeout(gc) : ob("resume"),
            gc = setTimeout(function() {
                switch (ob("cycle"),
                rb.cycleBy) {
                case "items":
                    sb.activate(Jb.activeItem >= Ib.length - 1 ? 0 : Jb.activeItem + 1);
                    break;
                case "pages":
                    sb.activatePage(Jb.activePage >= Gb.length - 1 ? 0 : Jb.activePage + 1)
                }
            }, rb.cycleInterval))
        }
        ,
        sb.pause = function(a) {
            a < sb.isPaused || (sb.isPaused = a || 100,
            gc && (gc = clearTimeout(gc),
            ob("pause")))
        }
        ,
        sb.toggle = function() {
            sb[gc ? "pause" : "resume"]()
        }
        ,
        sb.set = function(b, c) {
            a.isPlainObject(b) ? a.extend(rb, b) : rb.hasOwnProperty(b) && (rb[b] = c)
        }
        ,
        sb.add = function(b, c) {
            var d = a(b);
            Rb ? (null == c || !Ib[0] || c >= Ib.length ? d.appendTo(vb) : Ib.length && d.insertBefore(Ib[c].el),
            null != Jb.activeItem && c <= Jb.activeItem && (_b.active = Jb.activeItem += d.length)) : vb.append(d),
            K()
        }
        ,
        sb.remove = function(b) {
            if (Rb) {
                var c = S(b);
                if (c > -1) {
                    Hb.eq(c).remove();
                    var d = c === Jb.activeItem;
                    null != Jb.activeItem && c < Jb.activeItem && (_b.active = --Jb.activeItem),
                    K(),
                    d && (_b.active = null,
                    sb.activate(Jb.activeItem))
                }
            } else
                a(b).remove(),
                K()
        }
        ,
        sb.moveAfter = function(a, b) {
            X(a, b, 1)
        }
        ,
        sb.moveBefore = function(a, b) {
            X(a, b)
        }
        ,
        sb.on = function(a, b) {
            if ("object" === e(a))
                for (var c in a)
                    a.hasOwnProperty(c) && sb.on(c, a[c]);
            else if ("function" === e(b))
                for (var d = a.split(" "), f = 0, g = d.length; g > f; f++)
                    $b[d[f]] = $b[d[f]] || [],
                    -1 === Y(d[f], b) && $b[d[f]].push(b);
            else if ("array" === e(b))
                for (var h = 0, i = b.length; i > h; h++)
                    sb.on(a, b[h])
        }
        ,
        sb.one = function(a, b) {
            function c() {
                b.apply(sb, arguments),
                sb.off(a, c)
            }
            sb.on(a, c)
        }
        ,
        sb.off = function(a, b) {
            if (b instanceof Array)
                for (var c = 0, d = b.length; d > c; c++)
                    sb.off(a, b[c]);
            else
                for (var e = a.split(" "), f = 0, g = e.length; g > f; f++)
                    if ($b[e[f]] = $b[e[f]] || [],
                    null == b)
                        $b[e[f]].length = 0;
                    else {
                        var h = Y(e[f], b);
                        -1 !== h && $b[e[f]].splice(h, 1)
                    }
        }
        ,
        sb.destroy = function() {
            return d.removeInstance(b),
            Sb.add(Ab).add(zb).add(Eb).add(Ub).add(Vb).add(Wb).add(Xb).add(Yb).add(Zb).off("." + r),
            u.off("keydown", kb),
            Wb.add(Xb).add(Yb).add(Zb).removeClass(rb.disabledClass),
            Hb && null != Jb.activeItem && Hb.eq(Jb.activeItem).removeClass(rb.activeClass),
            Eb.empty(),
            tb || (ub.off("." + r),
            Kb.restore(),
            Lb.restore(),
            Mb.restore(),
            Nb.restore(),
            a.removeData(b, r)),
            Ib.length = Gb.length = 0,
            _b = {},
            sb.initialized = 0,
            sb
        }
        ,
        sb.init = function() {
            if (!sb.initialized) {
                if (d.getInstance(b))
                    throw new Error("There is already a Sly instance on this element");
                d.storeInstance(b, sb),
                sb.on(q);
                var a = ["overflow", "position"]
                  , c = ["position", "webkitTransform", "msTransform", "transform", "left", "top", "width", "height"];
                Kb.save.apply(Kb, a),
                Mb.save.apply(Mb, a),
                Lb.save.apply(Lb, c),
                Nb.save.apply(Nb, c);
                var e = Ab;
                return tb || (e = e.add(vb),
                ub.css("overflow", "hidden"),
                m || "static" !== ub.css("position") || ub.css("position", "relative")),
                m ? n && e.css(m, n) : ("static" === zb.css("position") && zb.css("position", "relative"),
                e.css({
                    position: "absolute"
                })),
                rb.forward && Ub.on(A, gb),
                rb.backward && Vb.on(A, gb),
                rb.prev && Wb.on(z, gb),
                rb.next && Xb.on(z, gb),
                rb.prevPage && Yb.on(z, gb),
                rb.nextPage && Zb.on(z, gb),
                Sb.on(y, ib),
                zb[0] && zb.on(z, jb),
                Rb && rb.activateOn && ub.on(rb.activateOn + "." + r, "*", lb),
                Eb[0] && rb.activatePageOn && Eb.on(rb.activatePageOn + "." + r, "*", mb),
                Tb.on(v, {
                    source: "slidee"
                }, bb),
                Ab && Ab.on(v, {
                    source: "handle"
                }, bb),
                u.on("keydown", kb),
                tb || (ub.on("mouseenter." + r + " mouseleave." + r, nb),
                ub.on("scroll." + r, h)),
                sb.initialized = 1,
                K(!0),
                rb.cycleBy && !tb && sb[rb.startPaused ? "pause" : "resume"](),
                sb
            }
        }
    }
    function e(a) {
        return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof a
    }
    function f(a, b) {
        a.preventDefault(),
        b && a.stopPropagation()
    }
    function g(b) {
        f(b, 1),
        a(this).off(b.type, g)
    }
    function h() {
        this.scrollLeft = 0,
        this.scrollTop = 0
    }
    function i(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }
    function j(a, b) {
        return 0 | G(String(a.css(b)).replace(/[^\-0-9.]/g, ""))
    }
    function k(a, b, c) {
        return b > a ? b : a > c ? c : a
    }
    function l(a) {
        var b = {};
        return b.style = {},
        b.save = function() {
            if (a && a.nodeType) {
                for (var c = 0; c < arguments.length; c++)
                    b.style[arguments[c]] = a.style[arguments[c]];
                return b
            }
        }
        ,
        b.restore = function() {
            if (a && a.nodeType) {
                for (var c in b.style)
                    b.style.hasOwnProperty(c) && (a.style[c] = b.style[c]);
                return b
            }
        }
        ,
        b
    }
    var m, n, o, p = "sly", q = "Sly", r = p, s = b.cancelAnimationFrame || b.cancelRequestAnimationFrame, t = b.requestAnimationFrame, u = a(document), v = "touchstart." + r + " mousedown." + r, w = "mousemove." + r + " mouseup." + r, x = "touchmove." + r + " touchend." + r, y = (document.implementation.hasFeature("Event.wheel", "3.0") ? "wheel." : "mousewheel.") + r, z = "click." + r, A = "mousedown." + r, B = ["INPUT", "SELECT", "BUTTON", "TEXTAREA"], C = [], D = Math.abs, E = Math.sqrt, F = Math.pow, G = Math.round, H = Math.max, I = Math.min, J = 0;
    u.on(y, function(a) {
        var b = a.originalEvent[r]
          , c = +new Date;
        (!b || b.options.scrollHijack < c - J) && (J = c)
    }),
    d.getInstance = function(b) {
        return a.data(b, r)
    }
    ,
    d.storeInstance = function(b, c) {
        return a.data(b, r, c)
    }
    ,
    d.removeInstance = function(b) {
        return a.removeData(b, r)
    }
    ,
    function(a) {
        function b(a) {
            var b = (new Date).getTime()
              , d = Math.max(0, 16 - (b - c))
              , e = setTimeout(a, d);
            return c = b,
            e
        }
        t = a.requestAnimationFrame || a.webkitRequestAnimationFrame || b;
        var c = (new Date).getTime()
          , d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.clearTimeout;
        s = function(b) {
            d.call(a, b)
        }
    }(window),
    function() {
        function a(a) {
            for (var d = 0, e = b.length; e > d; d++) {
                var f = b[d] ? b[d] + a.charAt(0).toUpperCase() + a.slice(1) : a;
                if (null != c.style[f])
                    return f
            }
        }
        var b = ["", "Webkit", "Moz", "ms", "O"]
          , c = document.createElement("div");
        m = a("transform"),
        n = a("perspective") ? "translateZ(0) " : ""
    }(),
    b[q] = d,
    a.fn[p] = function(b, c) {
        var f, g;
        return a.isPlainObject(b) || (("string" === e(b) || b === !1) && (f = b === !1 ? "destroy" : b,
        g = Array.prototype.slice.call(arguments, 1)),
        b = {}),
        this.each(function(a, e) {
            var h = d.getInstance(e);
            h || f ? h && f && h[f] && h[f].apply(h, g) : h = new d(e,b,c).init()
        })
    }
    ,
    d.defaults = {
        slidee: null,
        horizontal: !1,
        itemNav: null,
        itemSelector: null,
        smart: !1,
        activateOn: null,
        activateMiddle: !1,
        scrollSource: null,
        scrollBy: 0,
        scrollHijack: 300,
        scrollTrap: !1,
        dragSource: null,
        mouseDragging: !1,
        touchDragging: !1,
        releaseSwing: !1,
        swingSpeed: .2,
        elasticBounds: !1,
        dragThreshold: 3,
        interactive: null,
        scrollBar: null,
        dragHandle: !1,
        dynamicHandle: !1,
        minHandleSize: 50,
        clickBar: !1,
        syncSpeed: .5,
        pagesBar: null,
        activatePageOn: null,
        pageBuilder: function(a) {
            return "<li>" + (a + 1) + "</li>"
        },
        forward: null,
        backward: null,
        prev: null,
        next: null,
        prevPage: null,
        nextPage: null,
        cycleBy: null,
        cycleInterval: 5e3,
        pauseOnHover: !1,
        startPaused: !1,
        moveBy: 300,
        speed: 0,
        easing: "swing",
        startAt: null,
        keyboardNavBy: null,
        draggedClass: "dragged",
        activeClass: "active",
        disabledClass: "disabled"
    }
}(jQuery, window);
