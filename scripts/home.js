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
        
        $('.main-section').each((i, obj) => {
            // hacky scroll fix. Should be updated later.
            //  manditory scroll is often off by one pixel. scrollToId used to fix that
            const point = obj.offsetTop - obj.parentElement.offsetTop;
            const lst = [point-1, point, point+1];
            if (lst.includes(mainContent.scrollTop())) {
                scrollToId(obj.id);
                if (obj.id != 'mini-bio') {
                    $('#header-pfp-wrapper').animate({'opacity': '100%'}, 500);
                    $('#header-pfp-wrapper').css('pointer-events', 'all');
                    $('#header-nav').animate({'opacity': '100%'}, 500);
                    $('#header-nav').css('pointer-events', 'all');
                } else {
                    $('#header-pfp-wrapper').animate({'opacity': '0%'}, 500);
                    $('#header-pfp-wrapper').css('pointer-events', 'none');
                    $('#header-nav').animate({'opacity': '0%'}, 500);
                    $('#header-nav').css('pointer-events', 'none');
                }
            }
        });
    };

    checkMainSection();
    $('#main-content').scroll(checkMainSection);
});
