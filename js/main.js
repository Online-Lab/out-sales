 var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
;$(document).ready(function() {
    //slider
    $('.slider').slick({
        dots: true,
        arrows: false
    });
    if(w<780){
        $('.header').addClass('sm');
    }
});


$(window).scroll(function() {

    if ($(this).scrollTop() >= 1000) {

        $('.back-to-top').fadeIn(200);
    } else {
        $('.back-to-top').fadeOut(200);
    }

    var winPosition = $(window).scrollTop();
   
    if(w>780){
        if(winPosition > 70){
            
            $('.header').addClass('sm');
            
        }
        else{
            $('.header').removeClass('sm');
            
        }
    }else{
        $('.header').addClass('sm');
    }
    
});
$('.back-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
});


// block animation




