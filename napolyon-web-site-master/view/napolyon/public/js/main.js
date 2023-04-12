

! function($) {
    "use strict"; 
    // Loader 
    $(window).on('load', function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    });

    /* ==== REVOLUTION SLIDER ==== */

    /******************************************
     -  PREPARE PLACEHOLDER FOR SLIDER  -
     ******************************************/

    if ($().revolution) {
        var setREVStartSize = function () {
            var tpopt = new Object();
            tpopt.startwidth = 1170;
            tpopt.startheight = 620;
            tpopt.container = $('#rev1');
            tpopt.fullScreen = "off";
            tpopt.forceFullWidth = "off";

            tpopt.container.closest(".rev_slider_wrapper").css({height: tpopt.container.height()});
            tpopt.width = parseInt(tpopt.container.width(), 0);
            tpopt.height = parseInt(tpopt.container.height(), 0);
            tpopt.bw = tpopt.width / tpopt.startwidth;
            tpopt.bh = tpopt.height / tpopt.startheight;
            if (tpopt.bh > tpopt.bw) {
                tpopt.bh = tpopt.bw;
            }
            if (tpopt.bh < tpopt.bw) {
                tpopt.bw = tpopt.bh;
            }
            if (tpopt.bw < tpopt.bh) {
                tpopt.bh = tpopt.bw;
            }
            if (tpopt.bh > 1) {
                tpopt.bw = 1;
                tpopt.bh = 1
            }
            if (tpopt.bw > 1) {
                tpopt.bw = 1;
                tpopt.bh = 1
            }
            tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
            if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") {
                tpopt.height = tpopt.startheight;
            }
            if (tpopt.fullScreen == "on") {
                tpopt.height = tpopt.bw * tpopt.startheight;
                var cow = tpopt.container.parent().width();
                var coh = $(window).height();
                if (tpopt.fullScreenOffsetContainer != undefined) {
                    try {
                        var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                        $.each(offcontainers, function (e, t) {
                            coh = coh - $(t).outerHeight(true);
                            if (coh < tpopt.minFullScreenHeight) {
                                coh = tpopt.minFullScreenHeight
                            }
                        })
                    } catch (e) {
                    }
                }
                tpopt.container.parent().height(coh);
                tpopt.container.height(coh);
                tpopt.container.closest(".rev_slider_wrapper").height(coh);
                tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
                tpopt.container.css({height: "100%"});
                tpopt.height = coh;
            } else {
                tpopt.container.height(tpopt.height);
                tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
                tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
            }
        };

        /* CALL PLACEHOLDER */
        setREVStartSize();

        var revapi27;

        $(document).ready(function () {

            if ($('#rev2').revolution == undefined) {
                revslider_showDouble$Error('#rev2');
            } else {
                revapi27 = $('#rev2').show().revolution({
                    dottedOverlay: "none", delay: 7000, startwidth: 1170, startheight: 840, hideThumbs: 200,

                    thumbWidth: 100, thumbHeight: 50, thumbAmount: 4,

                    navigationType: "bullet", navigationArrows: "solo", navigationStyle: "preview1",

                    touchenabled: "on", onHoverStop: "on",

                    swipe_velocity: 0.7, swipe_min_touches: 1, swipe_max_touches: 1, drag_block_vertical: false,


                    parallax: "scroll", parallaxBgFreeze: "on", parallaxLevels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

                    keyboardNavigation: "off",

                    navigationHAlign: "center", navigationVAlign: "bottom", navigationHOffset: 0, navigationVOffset: 20,

                    soloArrowLeftHalign: "left", soloArrowLeftValign: "center", soloArrowLeftHOffset: 20, soloArrowLeftVOffset: 0,

                    soloArrowRightHalign: "right", soloArrowRightValign: "center", soloArrowRightHOffset: 20, soloArrowRightVOffset: 0,

                    shadow: 0, fullWidth: "on", fullScreen: "off",

                    spinner: "spinner4",

                    stopLoop: "off", stopAfterLoops: -1, stopAtSlide: -1,

                    shuffle: "off",

                    autoHeight: "off", forceFullWidth: "on",


                    hideThumbsOnMobile: "off", hideNavDelayOnMobile: 1500, hideBulletsOnMobile: "off", hideArrowsOnMobile: "off", hideThumbsUnderResolution: 0,

                    hideSliderAtLimit: 0, hideCaptionAtLimit: 0, hideAllCaptionAtLilmit: 0, startWithSlide: 0
                });

            }


        });
        /*ready*/
    }

    /* ==== FLEXSLIDER ==== */

    if ($().flexslider) {

        if ($(".flexslider").length > 0) {
            $(".flexslider").each(function () {
                var $this = $(this);
                var ctnamespace = validatedata($this.attr("data-namespace"), "flex-");
                var ctselector = validatedata($this.attr("data-selector"), ".slides > li");
                var ctanimation = validatedata($this.attr("data-animation"), "slide");
                var cteasing = validatedata($this.attr("data-easing"), "swing");
                var ctdirection = validatedata($this.attr("data-direction"), "horizontal");
                var ctreverse = parseBoolean($this.attr("data-reverse"), false);
                var ctanimationloop = parseBoolean($this.attr("data-animationloop"), false);
                var ctsmoothheight = parseBoolean($this.attr("data-smoothheight"), false);
                var ctstartat = parseInt(validatedata($this.attr("data-startat"), 0));
                var ctslideshow = parseBoolean($this.attr("data-slideshow"), true);
                var ctslideshowspeed = parseInt(validatedata($this.attr("data-slideshowspeed"), 7000));
                var ctanimationspeed = parseInt(validatedata($this.attr("data-animationspeed"), 600));
                var ctinitdelay = parseInt(validatedata($this.attr("data-initdelay"), 0));
                var ctrandomize = parseBoolean($this.attr("data-randomize"), false);
                var ctthumbcaptions = parseBoolean($this.attr("data-thumbcaptions"), false);

                var ctpauseonaction = parseBoolean($this.attr("data-pauseonaction"), true);
                var ctpauseonhover = parseBoolean($this.attr("data-pauseonhover"), false);
                var ctpauseinvisible = parseBoolean($this.attr("data-pauseinvisible"), true);
                var ctusecss = parseBoolean($this.attr("data-usecss"), true);
                var cttouch = parseBoolean($this.attr("data-touch"), true);
                if (device.mobile()) {
                    cttouch = false;
                }
                var ctvideo = parseBoolean($this.attr("data-video"), false);
                var ctcontrolnav = parseBoolean($this.attr("data-controlnav"), true);
                if (ctcontrolnav == false) {
                    $this.addClass("no-margin");
                }
                var ctdirectionnav = parseBoolean($this.attr("data-directionnav"), false);
                var ctprevtext = validatedata($this.attr("data-prevtext"), "Previous");
                var ctnexttext = validatedata($this.attr("data-nexttext"), "Next");

                var ctkeyboard = validatedata(parseBoolean($this.attr("data-keyboard")), true);
                var ctmultiplekeyboard = parseBoolean($this.attr("data-multiplekeyboard"), false);
                var ctmousewheel = parseBoolean($this.attr("data-mousewheel"), false);
                var ctpauseplay = parseBoolean($this.attr("data-pauseplay"), false);
                var ctpausetext = validatedata($this.attr("data-pausetext"), "Pause");
                var ctplaytext = validatedata($this.attr("data-playtext"), "Play");
                var ctitemwidth = parseInt(validatedata($this.attr("data-itemwidth"), 0));
                var ctitemmargin = parseInt(validatedata($this.attr("data-itemmargin"), 0));
                var ctminitems = parseInt(validatedata($this.attr("data-minitems"), 0));
                var ctmaxitems = parseInt(validatedata($this.attr("data-maxitems"), 0));
                var ctmove = parseInt(validatedata($this.attr("data-move"), 0));
                var ctallowoneslide = parseBoolean($this.attr("data-allowoneslide"), false);

                var ctcontrolscontainer = validatedata($this.attr("data-controlscontainer"), "");
                var ctmanualcontrols = validatedata($this.attr("data-manualcontrols"), "");

                var ctsync = validatedata($this.attr("data-sync"), "");
                var ctasnavfor = validatedata($this.attr("data-asnavfor"), "");

                $this.flexslider({
                    namespace: ctnamespace,             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
                    selector: ctselector,       //{NEW} Selector: Must match a simple pattern. "{container} > {slide}" -- Ignore pattern at your own peril
                    animation: ctanimation,              //String: Select your animation type, "fade" or "slide"
                    easing: cteasing,                //{NEW} String: Determines the easing method used in $ transitions. $ easing plugin is supported!
                    direction: ctdirection,        //String: Select the sliding direction, "horizontal" or "vertical"
                    reverse: ctreverse,                 //{NEW} Boolean: Reverse the animation direction
                    animationLoop: ctanimationloop,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
                    smoothHeight: ctsmoothheight,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
                    startAt: ctstartat,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
                    slideshow: ctslideshow,                //Boolean: Animate slider automatically
                    slideshowSpeed: ctslideshowspeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
                    animationSpeed: ctanimationspeed,            //Integer: Set the speed of animations, in milliseconds
                    initDelay: ctinitdelay,                   //{NEW} Integer: Set an initialization delay, in milliseconds
                    randomize: ctrandomize,               //Boolean: Randomize slide order
                    thumbCaptions: ctthumbcaptions,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

                    // Usability features


                    pauseOnAction: ctpauseonaction,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
                    pauseOnHover: ctpauseonhover,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                    pauseInvisible: ctpauseinvisible,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
                    useCSS: ctusecss,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
                    touch: cttouch,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
                    video: ctvideo,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

                    // Primary Controls


                    controlNav: ctcontrolnav,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
                    directionNav: ctdirectionnav,             //Boolean: Create navigation for previous/next navigation? (true/false)
                    prevText: ctprevtext,           //String: Set the text for the "previous" directionNav item
                    nextText: ctnexttext,               //String: Set the text for the "next" directionNav item

                    // Secondary Navigation


                    keyboard: ctkeyboard,                 //Boolean: Allow slider navigating via keyboard left/right keys
                    multipleKeyboard: ctmultiplekeyboard,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
                    mousewheel: ctmousewheel,              //{UPDATED} Boolean: Requires $.mousewheel.js (https://github.com/brandonaaron/$-mousewheel) - Allows slider navigating via mousewheel
                    pausePlay: ctpauseplay,               //Boolean: Create pause/play dynamic element
                    pauseText: ctpausetext,             //String: Set the text for the "pause" pausePlay item
                    playText: ctplaytext,               //String: Set the text for the "play" pausePlay item

                    // Special properties
                    controlsContainer: ctcontrolscontainer,          //{UPDATED} $ Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
                    manualControls: ctmanualcontrols,             //{UPDATED} $ Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
                    sync: ctsync,                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
                    asNavFor: ctasnavfor,                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

                    // Carousel Options


                    itemWidth: ctitemwidth,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
                    itemMargin: ctitemmargin,                  //{NEW} Integer: Margin between carousel items.
                    minItems: ctminitems,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
                    maxItems: ctmaxitems,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
                    move: ctmove,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
                    allowOneSlide: ctallowoneslide           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide
                })
            })
        }
    }

    if ($().appear) {

        if (device.mobile() || device.tablet()) {
            // disable animation on mobile
            $("body").removeClass("withAnimation");
        } else {

            $('.withAnimation .animated').appear(function () {
                var $this = $(this);

                $this.each(function () {
                    if ($this.data('time') != undefined) {
                        setTimeout(function () {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }, $this.data('time'));
                    } else {
                        $this.addClass('activate');
                        $this.addClass($this.data('fx'));
                    }
                });
            }, {accX: 50, accY: -150});
        }
    }



    $('#confirm_poll').click(function (){
        Swal.fire({
            icon: 'success',
            title: 'Tebrikler',
            text: '100 nap puan kazandınız!',
            confirmButtonText: 'Üye Ol',
            confirmButtonColor: '#00b6a6',
            footer: '<a href>Kazandığım puanları nasıl kullanırım?</a>'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "uye-ol.html"
            }
        })
    })

    // Menu
    $('.navbar-toggle').on('click', function (event) {
        $(this).toggleClass('open');
        $('#navigation').slideToggle(400);
    });
    
    $('.navigation-menu>li').slice(-1).addClass('last-elements');
    
    $('.menu-arrow,.submenu-arrow').on('click', function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
        }
    });
    
    $(".navigation-menu a").each(function () {
        if (this.href == window.location.href) {
            $(this).parent().addClass("active"); 
            $(this).parent().parent().parent().addClass("active"); 
            $(this).parent().parent().parent().parent().parent().addClass("active"); 
        }
    });

    // Clickable Menu
    $(".has-submenu a").click(function() {
        if(window.innerWidth < 992){
            if($(this).parent().hasClass('open')){
                $(this).siblings('.submenu').removeClass('open');
                $(this).parent().removeClass('open');
            } else {
                $(this).siblings('.submenu').addClass('open');
                $(this).parent().addClass('open');
            }
        }
    });

    $(".dd-menu").on('click', function(e) { 
        e.stopPropagation();
    });

    $('.mouse-down').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 72
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    //Sticky
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".sticky").addClass("nav-sticky");
        } else {
            $(".sticky").removeClass("nav-sticky");
        }
    });

    // Back to top
    $(window).scroll(function(){
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    }); 
    $('.back-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 3000);
        return false;
    });

    //Tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    //Popover
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    if($('*').is('.dg-animation') || $('*').is('.dg-animation1')) {
        $('.dg-animation').on('scrollSpy:enter', function() {
            $('.dg-animation').each(function(index,item) {
               var animation_type =   $('.dg-animation').eq(index).attr('data-dg');
                $('.dg-animation').eq(index).addClass('animate__animated');
                $('.dg-animation').eq(index).addClass('animate__' + animation_type);

            });
        });

        $('.dg-animation1').on('scrollSpy:enter', function() {
            $('.dg-animation1').each(function(index,item) {
                var animation_type =   $('.dg-animation1').eq(index).attr('data-dg');
                $('.dg-animation1').eq(index).addClass('animate__animated');
                $('.dg-animation1').eq(index).addClass('animate__' + animation_type);

            });
        })
        setTimeout(() => {
            $('.dg-animation, .dg-animation1').scrollSpy();
            }, 1000);
    }

    if($('*').is('.main-timeline5')) {
        $('.timeline').on('scrollSpy:enter', function(e,a) {
            console.log(e);
            if(e.currentTarget){
                var index = e.currentTarget.attributes[1].nodeValue;
                var animation_type =   $('.timeline').eq(index).attr('data-dg');
                $('.timeline-content').eq(index).addClass('animate__animated');
                $('.timeline-content').eq(index).addClass('animate__' + animation_type);

            }
        });
        $('.main-timeline5 .timeline').scrollSpy();

    }


    function validatedata($attr, $defaultValue) {
        if ($attr !== undefined) {
            return $attr
        }
        return $defaultValue;
    }

    $('.progress-icons').each(function () {
        var $this = $(this);
        var $total = $this.attr("data-total");
        var $icon = $this.attr("data-icon");
        var htmldata = "";

        $this.css("font-size", ($this.attr("data-font-size") + "px"));

        var i;
        for (i = 0; i < $total; i++) {
            htmldata += '<i class="fa ' + $icon + '"></i> ';
        }

        $this.html(htmldata);

        if (($().appear)) {
            $('.progress-icons').appear(function () {
                var $this = $(this);
                var $active = $this.attr("data-active");
                var $icons = $this.find('i:lt(' + $active + ')');
                var $delay = parseInt(validatedata($this.attr("data-delay"), 20));
                var delay = $delay;
                for (i = 0; i < $icons.length; i++) {
                    setTimeout((function (i) {
                        return function () {
                            i.style.color = $this.attr("data-icon-color");
                        }
                    })($icons[i]), delay);
                    delay += $delay;
                }
            }, {accY: -100});
        } else {
            $this.each(function () {
                var $active = $this.attr("data-active");
                var $icons = $this.find('i:lt(' + $active + ')');
                $icons.css('color', $this.attr("data-icon-color"))
            });
        }
    })

    $('.square-icon-hover').each(function (index,item){
        var src = $('.square-icon-hover').eq(index).find('.icons').attr('src');
        $('.square-icon-hover').eq(index).hover(function(){
            var hover_img_path = $('.square-icon-hover').eq(index).find('.icons').data('hover');
            $('.square-icon-hover').eq(index).find('.icons').attr('src',hover_img_path);
        }, function() {
            $('.square-icon-hover').eq(index).find('.icons').attr('src',src);
        })
    });

    $('.help-form').click(function() {
        $('#iletisim-formu').css('display','block');
        $('html, body').animate({
            scrollTop: $("#iletisim-formu").offset().top
        }, 1000);
    });

    $('.question-yes').click(function(e) {
        $(this).parents('.question-wizard').fadeOut( "slow", function() {
            $(this).parents('.question-wizard').hide();
        });
    });

    if ($('*').hasClass('.tabs-vertical')){
        $('.tabs-vertical .nav li.active a').click();

        $('.tabs-vertical li a').click(function (e){

            if (!$(this).hasClass('active')){
                $(this).parents('ul').children('li').removeClass('active');
                $(this).parent('li').addClass('active');
            }
        });
    }

    $('.tab ul.tab-menu li').on('click', function (g) {
        var tab = $(this).closest('.tab'),
            index = $(this).closest('li').index();
        tab.find('li').siblings('li').removeClass('active');
        $(this).closest('li').addClass('active');
        tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').hide();
        tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').fadeIn("fast");
        g.preventDefault();
    });

    $('.testimonial-slider').owlCarousel({
        loop:true,
        nav:false,
        dots: false,
        items:1,
        autoplay:true,
        autoplayTimeout:2500,
        autoplayHoverPause:true,
        margin: 0,
        mouseDrag: false,
        touchDrag: true,
    });
    var owlBela = $('.testimonial-slider');
    owlBela.owlCarousel();
    // Go to the next item
    $('.testi-next').on('click', function() {
        owlBela.trigger('prev.owl.carousel');
    })
    // Go to the previous item
    $('.testi-prev').on('click', function() {
        owlBela.trigger('next.owl.carousel', [300]);
    })



    $('#comments').keyup(function () {
        var max = 500;
        var len = $(this).val().length;
        $('.textarea-count-box').html(max-len);
        if (len >= max) {
            alert('Maksimum karakter sınırını aştınız.');
        }
    });

    if($('*').is('.bg_img')){
        var img = $('.bg_img');
        img.css('background-image', function () {
            var bg = ('url(' + $(this).data('background') + ')');
            return bg;
        });
    }

    if($('*').is('#n1')){
        $("[data-paroller-factor]").paroller();
    }

    if($('*').is('.scrolldown')){
        setInterval(function() {
            $("a.scrolldown").toggleClass('active');
        }, 1000);
    }



}(jQuery)