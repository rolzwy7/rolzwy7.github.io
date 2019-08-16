// var TOC_FLAG = true;

// function stick() {
//   // $("#header").removeClass("header-transparent");
//   $("#header").addClass("header-stick");
//   $("body").removeClass("header-shadow");
// }
//
// function unstick() {
//   if(TOC_FLAG != false) {
//     $("#header").removeClass("header-stick");
//     // $("#header").addClass("header-transparent");
//     $("body").removeClass("header-shadow");
//   }
// }
//
// function trigger_header() {
//   var from_top = $(window).scrollTop();
//   var trigger_value = 30;
//   if(from_top >= trigger_value) {
//     console.log("stick");
//       stick()
//   } else {
//       unstick();
//       console.log("unstick");
//   }
// }

// function cloak() {
//   $("#toc").addClass("invisible");
//   $("#toc").removeClass("visible");
// }
//
// function uncloak() {
//   $("#toc").addClass("visible");
//   $("#toc").removeClass("invisible");
// }

// $(window).on("scroll", function() {
// 	trigger_header();
// });
//
// $(window).on("load", function() {
//   trigger_header();
//   uncloak();
// });
//
// $("#toc").on("click", function() {
//   $(this).toggleClass("is-active");
//   if(TOC_FLAG) {
//     TOC_FLAG = false;
//     stick();
//   } else {
//     TOC_FLAG = true;
//     trigger_header();
//   }
// });
