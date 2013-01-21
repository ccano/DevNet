// DevNet tweaks
$(document).ready(function() {
    // Support details+summary in older browsers
    $('details').details(); 

    // After site search, replace contents with search results
    $('iframe').livequery(function() {
        $('section').hide();
        $('#contents').css('background', '#f1f1f1');
        $('#pb-search-results').show();
    });

    // Offer to inform users about new releases
    $('a.register').click(function() {
        // Already registered
        if($.cookie('devnetreg')) {
          return true;
        }

        // Reset layout
        $('.pb-waiting,.pb-confirm,.pb-error').hide();
        $('.pb-regform').show();

        $.liteDialog({ modal: true, html: $('#pb-dialog').html() });
        $('.pb-regform a').attr('href', $(this).attr('href'));

        // Submit the form
        $('.pb-regform').submit(function() {
          $('.pb-regform').hide();
          $('.pb-waiting').show();
          $.ajax({
            url: $('.pb-regform').attr('action'), 
            type: 'POST',
            crossDomain: true, 
            data: $('#hyLiteDlg .pb-regform').serialize() + '&Register=SUBMIT', 
            success: function(){  
              $('.pb-waiting').hide();
              $('.pb-confirm').show();
              $.cookie('devnetreg', $('#email').val(), { expires: (365*10)}); 
            },
            error: function(err){ 
              $('.pb-waiting').hide();
              $('.pb-confirm').show(); // submission works, jsonp bonks; suppress
              //$('.pb-error').show();
              $.cookie('devnetreg', $('#email').val(), { expires: (365*10)}); 
            }
          });
          return false;
        });

        // Continue without signing up
        $('.pb-signup a').click(function() { 
            $.liteDialog('hide');
        });

        // Cancel on ESC key
        $(document).keyup(function(e) {
          if(e.keyCode === 27) {
            $.liteDialog('hide');
          }
        });

        // Continue to link
        $('.pb-confirm input, .pb-error input').click(function() {
            $.liteDialog('hide');
            window.location = $('.pb-regform a').attr('href');
        });

        return false;
    });
});
