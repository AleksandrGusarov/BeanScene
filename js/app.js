$(function () {
  /*Nav Toggle on mobile
======================================================*/

  let navToggle = $("#navToggle");
  let nav = $("#nav");

  navToggle.on("click", function (event) {
    event.preventDefault();
    $("body").toggleClass("show-nav");
    $(this).toggleClass("active");
    nav.toggleClass("show");
  });

  $(window).on("resize", function () {
    headerScroll();

    $("body").removeClass("show-nav");
    navToggle.removeClass("active");
    nav.removeClass("show");
  });

  let intro = $("#intro");
  let header = $("#header");
  let introH = intro.innerHeight();
  let headerH = header.innerHeight();
  let scrollTop = $(window).scrollTop();

  /*Header class scroll 
============================*/

  headerScroll();

  $(window).on("scroll resize", function () {
    headerScroll();
  });

  function headerScroll() {
    introH = intro.innerHeight();
    headerH = header.innerHeight();
    console.log(introH - headerH);
    let scrollTop = $(this).scrollTop();

    if (scrollTop >= introH - headerH) {
      header.addClass("header--dark");
    } else {
      header.removeClass("header--dark");
    }
  }

  /*smooth Scroll to section 
============================*/

  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    let scrollEl = $(this).data("scroll");
    let scrollElPos = $(scrollEl).offset().top;

    $("body").removeClass("show-nav");
    navToggle.removeClass("active");
    nav.removeClass("show");

    $("html, body").animate(
      {
        scrollTop: scrollElPos - headerH,
      },
      500
    );
  });

  /*ScrollSpy 
============================*/
  let windowH = $(window).height();
  console.log(windowH);

  scrollspy(scrollTop);

  $(window).on("scroll", function () {
    scrollTop = $(this).scrollTop();

    scrollspy(scrollTop);
  });

  function scrollspy() {
    $("[data-scrollspy]").each(function () {
      let $this = $(this);
      let sectionId = $this.data("scrollspy");
      let sectionOffset = $this.offset().top;
      sectionOffset = sectionOffset - windowH * 0.3333;

      if (scrollTop >= sectionOffset) {
        $("#nav [data-scroll]").removeClass("active");

        $('#nav [data-scroll="' + sectionId + '"]').addClass("active");
      }

      if (scrollTop == 0) {
        $("#nav [data-scroll]").removeClass("active");
      }
    });
  }

  /*Modal 
============================*/

  $("[data-modal]").on("click", function (event) {
    event.preventDefault();
    let modal = $(this).data("modal");

    $("body").addClass("no-scroll");
    $(modal).addClass("show");

    setTimeout(function () {
      $(modal).find(".modal__content").css({
        transform: "scale(1)",
        opacity: "1",
      });
    }, 100);
  });

  $("[data-modal-close]").on("click", function (event) {
    event.preventDefault();
    let modal = $(this).parents(".modal");

    modalClose(modal);
  });

  $(".modal").on("click", function () {
    let modal = $(this);

    modalClose(modal);
  });

  $(".modal__content").on("click", function (event) {
    event.stopPropagation();
  });

  function modalClose(modal) {
    modal.find(".modal__content").css({
      transform: "scale(.5)",
      opacity: "0",
    });

    setTimeout(function () {
      $("body").removeClass("no-scroll");
      modal.removeClass("show");
    }, 200);
  }
});

/*reviews Slider*/

let feedbackSlider = $("#feedbackSlider");

feedbackSlider.slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 1000,
});
