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

$(".tl-nav-szkolenia-krok__link").click(function() {
  var idx = $(this).attr("data-slide-index");
  SwiperTimeline.slideTo(idx);
});

SwiperTimeline.on('slideChangeTransitionEnd', function() {
  clear_active_timeline_tabs();
  set_as_active($(this)[0].activeIndex);
});
