/// some script

// jquery ready start
$(document).ready(function () {
  // jQuery code

  //////////////////////// Prevent closing from click inside dropdown
  $(document).on('click', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });


}); // jquery end
/* sản phẩm yêu thích*/
$('.carousel.carousel-multi-item.v-2 .carousel-item').each(function () {
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < 3; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});


//---------------------------------------------
// Scroll Up 
//---------------------------------------------

$(window).scroll(function () {
  if ($(this).scrollTop() > 600) {
    $('.scrollup').fadeIn('slow');
  } else {
    $('.scrollup').fadeOut('slow');
  }
});
$('.scrollup').click(function () {
  $("html, body").animate({ scrollTop: 0 }, 1000);
  return false;
});


// Toggle Search

// $("#searchne").each(function () {
//   $("li.search > a", this).on("click", function (e) {
//     e.preventDefault();
//     $(".top-search").slideToggle();
//   });

// });
// $(".input-group-addon.close-search").on("click", function () {
//   $(".top-search").slideUp();
// });

// jquery ready start
$(document).ready(function () {
  // jQuery code

  // add padding top to show content behind navbar
  $('body').css('padding-top', $('.navbar').outerHeight() + 'px')

  //////////////////////// detect scroll top or down
  if ($('.smart-scroll').length > 0) { // check if element exists
    var last_scroll_top = 0;
    $(window).on('scroll', function () {
      scroll_top = $(this).scrollTop();
      if (scroll_top < last_scroll_top) {
        $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
      }
      else {
        $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
      }
      last_scroll_top = scroll_top;
    });
  }


}); // jquery end

// $(document).ready(function() {
//   var inputBox = document.getElementById("inputBox");

//   var invalidChars = [
//     "-",
//     "+",
//     "e",
//   ];
  
//   inputBox.addEventListener("keydown", function(e) {
//     if (invalidChars.includes(e.key)) {
//       e.preventDefault();
//     }
//   });
// })