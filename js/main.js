;$(document).ready(function() {
    //slider
    $('.slider').slick({
        dots: true,
        arrows: false
    });
});


$(window).scroll(function() {

    if ($(this).scrollTop() >= 1000) {
        $('.back-to-top').fadeIn(200);
    } else {
        $('.back-to-top').fadeOut(200);
    }
});
$('.back-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
});


// block animation

new WOW().init();


