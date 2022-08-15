const scrollToId = (targetId) => {
    const container = $('#main-content');
    const target = $(`#${targetId}`);
    container.scrollTop(
        target.offset().top - container.offset().top + container.scrollTop()
    );
};

$(document).ready(function() {
    const checkMainSection = () => {
        const mainContent = $('#main-content');
        const opacity = mainContent.scrollTop() / $('#mini-bio').height()
        const click = opacity > .5 ? 'all' : 'none'

        $('#header-pfp-wrapper').css('opacity', opacity);
        $('#header-pfp-wrapper').css('pointer-events', click);
        $('#header-nav').css('opacity', opacity);
        $('#header-nav').css('pointer-events', click);
        
    };

    checkMainSection();
    $('#main-content').scroll(checkMainSection);

    $('#navigation-button').click(function() {
        const line1 = $('#navigation-button-line1');
        const line2 = $('#navigation-button-line2');
        const contn = $('#navigation-content');
        const close = contn.width() > 0;

        contn.animate({width: close ? '0vw' : '50vw'});
        line1.animate({top:   close ? '0%'  : '17%' });
        line2.animate({top:   close ? '0%'  : '-17%'});
    });

    $('.project').hover(
        function() {
            $(this).animate(
                {
                    'width': '100%',
                    'height': '100%',
                    'margin': '0%'
                },
                150
            );
        },
        function() {
            $(this).animate(
                {
                    'width': '95%',
                    'height': '95%',
                    'margin': '2.5%'
                },
                150
            );
        }
    );
});
