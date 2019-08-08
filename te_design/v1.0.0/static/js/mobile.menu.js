$("#toc").on("click", function() {
  $("#mobile-menu").toggleClass("is-active");
  $(this).toggleClass("is-active");
  $("#mobile-menu__shadow-overlay").toggleClass("d-none");
});

$("#mobile-menu__shadow-overlay").on("click", function() {
  $("#mobile-menu").removeClass("is-active");
  $("#toc").removeClass("is-active");
  $(this).toggleClass("d-none");
});

// options
function expanded_menu_set_state() {
  $("#mobile-menu").addClass("is-expanded");
  $("#toc").addClass("d-none");
  $("#toc_expanded").removeClass("d-none");
  $("#toc_expanded").addClass("is-active");
}
function expanded_menu_unset_state() {
  $("#mobile-menu").removeClass("is-expanded");
  $("#toc").removeClass("d-none");
  $("#toc_expanded").addClass("d-none");
  $("#toc_expanded").removeClass("is-active");
}

$("#mobile_menu__szkolenia__link").on("click", function() {
  expanded_menu_set_state();
  $("#mobile_menu__szkolenia__submenu").toggleClass("is-expanded");
});

$("#toc_expanded").on("click", function() {
  // wszystkie submenu
  $("#mobile_menu__szkolenia__submenu").removeClass("is-expanded");
  // wszystkie submenu End
  expanded_menu_unset_state();
});
