// DevNet tweaks
      
$(document).ready(function() {
    // support details+summary in older browsers
    $('details').details(); 

    // after site search, replace contents with search results
    $('iframe').livequery(function() {
        $('section').hide();
        $('#contents').css('background', '#f1f1f1');
        $('#pb-search-results').show();
    });

    // Offer to inform users about new releases
    $('a.register').click(function() {
        if(!$.cookie('devnetreg')) {
            $.liteDialog({ modal: true, html: $('#pb-dialog').html() });
            $('#pb-signup a').attr('href', $(this).attr('href'));
        }

        // Remember user
        $('#pb-signup input').click(function() {
            //$.cookie('devnetreg', 'true', { expires: (365*10)}); 
            window.location = $('#pb-signup a').click();
        });

        // Close dialog
        $('#pb-signup a').click(function() { 
            $.liteDialog('hide');
        });

        return false;
    });
});
