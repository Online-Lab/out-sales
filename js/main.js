;$(document).ready(function() {
    // form validation 
    $.validate({
        showHelpOnFocus: false
    });
    //slider
    $('.slider').slick({
        dots: true,
        arrows: false
    });
    // mandrilla send email function
    var sendEmail = function(emailTo, theme, msg){
        $.ajax({
          "type": "POST",
          "url": "https://mandrillapp.com/api/1.0/messages/send.json",
          "data": {
            "key": "NHi8r1hU9Nla-gHjnit-jg",
            "message": {
              "from_email": "site@example.com",
              "to": [
                  {
                    "email": "info@out-sales.ru",
                    "name": "" + emailTo,
                    "type": "to"
                  }
                ],
              "autotext": true,
              "subject": theme + "",
              "html": msg + ""
            }
          }
         }).done(function(response) {
           alert("Ваша заявка принята");
         });
    }

    $(".phone").mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});


    $(".orderCall .orderCallBtn").click(function(){
        var customerName = $(".orderCall .name").val(),
            phone = $(".orderCall .phone").val(),
            msg = name + " заказал звонок на номер: " + phone;
        sendEmail(name, "Заказ звонка", msg);
    });


    $(".leaveApplication .leaveApplicationBtn").click(function(){
        var name = $(".leaveApplication .name").val(),
            phone = $(".leaveApplication .phone").val(),
            email = $(".leaveApplication .email").val(),
            msg = name + " подал заявку. Контактные данные: " + phone + " "+ email;
        sendEmail(name, "Заявка", msg);
    });

    $(".question .questionBtn").click(function(){
        var name = $(".question .name").val(),
            phone = $(".question .phone").val(),
            email = $(".question .email").val(),
            comment = $(".question .comment").val(),

            msg = name + " задал вопрос. Контактные данные: телефон " + phone + ", емаил "+ email+". Вопрос: "+comment  ;
        sendEmail(name, "Вопрос", msg);
    });


// input form animation

    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    })();
    
});

// block animation

new WOW().init();


// popup animation

(function() {
    var docElem = window.document.documentElement, didScroll, scrollPosition;

    // trick to prevent scrolling when opening/closing button
    function noScrollFn() {
        window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
    }

    function noScroll() {
        window.removeEventListener( 'scroll', scrollHandler );
        window.addEventListener( 'scroll', noScrollFn );
    }

    function scrollFn() {
        window.addEventListener( 'scroll', scrollHandler );
    }

    function canScroll() {
        window.removeEventListener( 'scroll', noScrollFn );
        scrollFn();
    }

    function scrollHandler() {
        if( !didScroll ) {
            didScroll = true;
            setTimeout( function() { scrollPage(); }, 60 );
        }
    };

    function scrollPage() {
        scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
        didScroll = false;
    };

    scrollFn();

    [].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
        new UIMorphingButton( bttn, {
            closeEl : '.icon-close',
            onBeforeOpen : function() {
                // don't allow to scroll
                noScroll();
            },
            onAfterOpen : function() {
                // can scroll again
                canScroll();
            },
            onBeforeClose : function() {
                // don't allow to scroll
                noScroll();
            },
            onAfterClose : function() {
                // can scroll again
                canScroll();
            }
        } );
    } );

    // for demo purposes only
    [].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) { 
        bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
    });
})();


