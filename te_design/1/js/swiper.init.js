var SwiperTimeline = new Swiper ('.swiper-container-timeline', {
  effect: "slide", // slide fade cube coverflow flip
  hashNavigation: false,
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

$(".tl-nav-szkolenia-krok__link").click(function() {
  var items = $(".tl-nav-szkolenia-krok__item");
  for(var it=0;it<items.length;it++) {
    $(items[it]).removeClass("active");
  }
  var idx = $(this).attr("data-slide-index");
  $(this).parent().toggleClass("active");
  SwiperTimeline.slideTo(idx);
});
