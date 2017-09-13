$(document).ready(function(){
    // On Scroll
    $(window).on("scroll", function() {
        var cscroll_top = $(window).scrollTop();
        // ScrollTop
        if(cscroll_top < 900) {
            $("#scrollTop").removeClass("scrolltop-show");
            $("#scrollTop").addClass("scrolltop-hide");
        } else {
            $("#scrollTop").removeClass("scrolltop-hide");
            $("#scrollTop").addClass("scrolltop-show");
        }
    });

    // Click
    $(".scrollTop").on("click", function(){
        $('html,body').animate({ scrollTop: 0 }, 'fast');
        return false;
    });

    $("#showSearch").on("click", function(){
        var icon_ = $($(this)[0].children);
        $(".search-li").toggleClass("c-show");
        if( $(".search-li").hasClass("c-show") ) {
            $("#search-input").focus();
            icon_.removeClass("fa-search");
            icon_.addClass("fa-times");
        } else {
            $("#search-input").val("");
            icon_.removeClass("fa-times");
            icon_.addClass("fa-search");
        }
    });
    $("#select-lang").on("click", function(){
        $(".lang-selection-container").toggleClass("hidden");
    });
    $(".select-lang").on("click", function(){
        $(".lang-selection-container").toggleClass("hidden");
        $('html,body').animate({ scrollTop: 0 }, 'fast');
        return false;
    });
    $("#toc").on("click", function(){
        if($(".hide-in").hasClass("hidden")) {
            setTimeout(function(){
                $(".hide-in").toggleClass("hidden");
            }, 500);
        } else {
            $(".hide-in").toggleClass("hidden");
        }
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
