$(document).ready(function() {
    // $('#fullpage').fullpage({
    //     autoScrolling: false,
    //     scrollOverflow: true,
    //     loopHorizontal: true,
    //     slidesNavigation: true
    // });
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
           console.log(response);
         });
    }




    $(".orderCall .orderCallBtn").click(function(){
        var customerName = $(".orderCall .customerName").val(),
            customerPhone = $(".orderCall .customerPhone").val(),
            msg = customerName + " заказал звонок на номер: " + customerPhone;
        sendEmail(customerName, "Заказ звонка", msg);
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


