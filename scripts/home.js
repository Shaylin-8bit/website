const openNavigationContent = () => {
    $('#navigation-content').animate({width: '50vw'});
    $('#navigation-button-line1').animate({top: '18%'});
    $('#navigation-button-line2').animate({top: '-18%'});
    $('#navigation-button').attr('onclick', 'closeNavigationContent()');
}

const closeNavigationContent = () => {
    $('#navigation-content').animate({width: '0vw'});
    $('#navigation-button-line1').animate({top: '0%'});
    $('#navigation-button-line2').animate({top: '0%'});
    $('#navigation-button').attr('onclick', 'openNavigationContent()');
}

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
});
