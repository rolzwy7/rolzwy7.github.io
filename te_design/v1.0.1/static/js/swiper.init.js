// Swiper timeline
var SwiperTimeline = new Swiper ('.swiper-container-timeline', {
  effect: "slide", // slide fade cube coverflow flip
  hashNavigation: false,
  speed: 200,
  // allowSlidePrev: false,
	// allowSlideNext: false,
  on: {
    init: function () {
        console.log('swiper initialized');
    },
  },
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  loop: false,
  autoplay: false,
	keyboard: false
})

function clear_active_timeline_tabs() {
  var items = $(".tl-nav-szkolenia-krok__item");
  for(var it=0;it<items.length;it++) {
    $(items[it]).removeClass("active");
  }
}

function set_as_active(num) {
  var items = $(".tl-nav-szkolenia-krok__item");
  for(var it=0;it<items.length;it++) {
    var elem = $(items[it])[0];
    if(it === num) {
      $(elem).toggleClass("active");
    }
  }
}

function center_active_blob(num) {
  var scrollbar = $('.tl-szkolenia-krok__header')[0] //.scrollBy(10, 0)
  var window_width = $(window).width();
  var trigger = 1000;
  if(window_width > trigger) {
    console.log("window_width > trigger - return 0");
    return 0;
  }
  if(num == 0) {scrollbar.scrollTo(0, 0);}
  if(num == 1) {scrollbar.scrollTo(120, 0);}
  if(num == 2) {scrollbar.scrollTo(350, 0);}
  if(num == 3) {scrollbar.scrollTo(565, 0);}
  if(num == 4) {scrollbar.scrollTo(800, 0);}
  if(num == 5) {scrollbar.scrollTo(1400, 0);}
}

$(".tl-nav-szkolenia-krok__link").click(function() {
  var idx = $(this).attr("data-slide-index");
  SwiperTimeline.slideTo(idx);
});

$(".tl-nav-szkolenia-krok__blob").click(function() {
  var elem = $(this).parent().children()[1];
  var idx = $(elem).attr("data-slide-index");
  SwiperTimeline.slideTo(idx);
});

SwiperTimeline.on('slideChangeTransitionEnd', function() {
  clear_active_timeline_tabs();
  var to_be_active = $(this)[0].activeIndex;
  set_as_active(to_be_active);
  center_active_blob(to_be_active);
});


// Swiper - brands
var SwiperBrands = new Swiper ('.swiper-container-brands', {
  effect: "slide", // slide fade cube coverflow flip
  hashNavigation: false,
  speed: 200,
  direction: 'horizontal',
  loop: false
})

SwiperBrands.on('slideChangeTransitionEnd', function() {
  console.log("swiped");
  var to_be_active = $(this)[0].activeIndex;
  if(to_be_active == 0) {
    $("#trusted_us_gr1").addClass("is-active");
    $("#trusted_us_gr2").removeClass("is-active");
    $("#trusted_us_gr3").removeClass("is-active");
  }
  if(to_be_active == 1) {
    $("#trusted_us_gr2").addClass("is-active");
    $("#trusted_us_gr1").removeClass("is-active");
    $("#trusted_us_gr3").removeClass("is-active");
  }
  if(to_be_active == 2) {
    $("#trusted_us_gr3").addClass("is-active");
    $("#trusted_us_gr1").removeClass("is-active");
    $("#trusted_us_gr2").removeClass("is-active");
  }
});

$("#trusted_us_gr1").click(function() {
  $(this).addClass("is-active");
  $("#trusted_us_gr2").removeClass("is-active");
  $("#trusted_us_gr3").removeClass("is-active");
  SwiperBrands.slideTo(0);
});
$("#trusted_us_gr2").click(function() {
  $(this).addClass("is-active");
  $("#trusted_us_gr1").removeClass("is-active");
  $("#trusted_us_gr3").removeClass("is-active");
  SwiperBrands.slideTo(1);
});
$("#trusted_us_gr3").click(function() {
  $(this).addClass("is-active");
  $("#trusted_us_gr1").removeClass("is-active");
  $("#trusted_us_gr2").removeClass("is-active");
  SwiperBrands.slideTo(2);
});

// Swiper - testimonials mobile
var SwiperTestimonialsMobile = new Swiper ('.swiper-container-testimonials-mobile', {
  effect: "slide",
  hashNavigation: false,
  speed: 200,
  direction: 'horizontal',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
})

// Swiper - Numbers Squares
var SwiperNumbersSquares = new Swiper ('.swiper-container-numbers-squares', {
  slidesPerView: 1,
  effect: "coverflow",
  hashNavigation: false,
  speed: 200,
  direction: 'horizontal',
  loop: false,
  coverflowEffect: {
    rotate: 40,
    stretch: 0,
    depth: 500,
    modifier: 1.2,
    slideShadows : false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  }
})
