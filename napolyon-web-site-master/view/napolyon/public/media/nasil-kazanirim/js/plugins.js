//Prevent console errors in browsers without consoles
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


var s; 

$(function(){
    var windowHeight; 
    init(); 
    
    $( window ).resize(function() {
        init(); 
    });
    
    $('button.btn-popover').popover({ html:true });

    $('button.btn-popover').on('click', function (e) {
        $('button.btn-popover').not(this).popover('hide');
    });
    
    $(window).scroll(function(e) {
        $('button.btn-popover').popover('hide');
        var winTop = $(window).scrollTop();
        var allSlides = $('.app-wrap > .slide'); 

        activeSlide = Math.round(winTop / 1000);
        
        if (activeSlide > -1) {
            $('.app-nav li').removeClass('active').eq(activeSlide).addClass('active');
        }
    });
    
    $('.scroll-arrow').click( function () {
        $('html, body').animate({scrollTop: $('.decade2010').offset().top});
        $('.scroll-arrow').hide(); 
    }); 
    
    $('.js .app-nav a, a.next-slide, a.start-again').on('click', function (e) {
        $('html, body').stop().animate({
            'scrollTop': $(this).attr('data-position')
        }, 900, 'swing');
    });
    
    function init() {

        var ww = $(window).width();
        var wh = $(window).height();
        var isLandscape = (ww > wh);

        var sq = (isLandscape) ? Math.ceil(ww * 1.5) : Math.ceil(wh * 1.5);
        var leftOffset = Math.ceil(((sq - ww ) / 2)*-1);
        var topOffset = Math.ceil(((sq - wh ) / 2)*-1);

        var aboutHeight = $(".skrollr-wrapper .slide.slide-1 .about").height();
        var iw = $('.img-wrap').width(); 
        var newImgH = wh - aboutHeight;

        if ($(window).width() < 950 || $('html').hasClass('lt-ie9') ) {
            if ( typeof s !== "undefined" && s) {
                s.destroy(); 
            }
            $('html').removeClass('js').addClass('no-js no-js-mode'); 

            $('.front-page .introduction').css({ 'top': '0px' }); 

            $('.app-wrap').css({ 'height': ''});
            $('.slide > .container').css({ 'height': '' });
            $('.slide .img-wrap').css({ 'width': '' });

            $('.skrollr-wrapper').css({
                'height': '',
                'width': '', 
                'left': 0,
                'top': 0
            });
            $('.app-wrap').css({
                'height': '',
                'width': '', 
                'left': 0,
                'top': 0
            });

        } else { /*We're dealing with an OK browser and the screen's big enough! */
            $('html').removeClass('no-js').removeClass('no-js-mode').addClass('js'); 
            
            if ( ($('.front-page').height()-$('.front-page .introduction').height())/2 > 0) {
                $('.front-page .introduction').css({ top: ($('.front-page').height()-$('.front-page .introduction').height())/2 + 'px' });
            }



            $('.skrollr .slide > .container').height(wh);

            s = skrollr.init();
            $('.app-wrap').height($(window).height());
            $('.skrollr .slide .img-wrap').width(1.35 * newImgH); 

            $('.skrollr-wrapper').width(sq).height(sq).css({
                'left': leftOffset,
                'top': topOffset
            });
            $('.app-wrap').width(sq).height(sq).css({
                'left': leftOffset,
                'top': topOffset
            });
            
            var navOffset = ( wh - $('.app-nav > ul').height() ) /2; 
            $('.app-nav > ul').css('top', navOffset + 'px'); 

        }
        return;
    }
});