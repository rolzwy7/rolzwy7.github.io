var toc_flag = true;

function stick() {
  $("#header").removeClass("header-transparent");
  $("#header").addClass("header-stick");

  $("#header").addClass("shadow");
}

function unstick() {
  if(toc_flag != false) {
    $("#header").removeClass("header-stick");
    $("#header").addClass("header-transparent");
    $("#header").removeClass("shadow");
  }
}

function trigger_header() {
  var from_top = $(window).scrollTop();
  var trigger_value = 30;
  if(from_top >= trigger_value) {
      stick()
  } else {
      unstick();
  }
}

function cloak() {
  $("#toc").addClass("invisible");
  $("#toc").removeClass("visible");
}

function uncloak() {
  $("#toc").addClass("visible");
  $("#toc").removeClass("invisible");
}

$(window).on("scroll", function() {
	trigger_header();
});

$(window).on("load", function() {
  trigger_header();
  uncloak();
});

$("#toc").on("click", function() {
  $(this).toggleClass("is-active");
  if(toc_flag) {
    toc_flag = false;
    stick();
  } else {
    toc_flag = true;
    trigger_header();
  }
});
