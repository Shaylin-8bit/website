const scrollToId = (targetId) => {
    const container = $('#main-content');
    const target = $(`#${targetId}`);
    container.scrollTop(
        target.offset().top - container.offset().top + container.scrollTop()
    );
};

$(document).ready(async function() {
    let numProjects = await $.getJSON('/projects/length');
    numProjects = numProjects.length;

    const checkMainSection = () => {
        const mainContent = $('#main-content');
        const opacity = mainContent.scrollTop() / $('#mini-bio').height()
        const click = opacity > .5 ? 'all' : 'none'

        $('#header-pfp-wrapper').css('opacity', opacity);
        $('#header-pfp-wrapper').css('pointer-events', click);
        $('#header-nav').css('opacity', opacity);
        $('#header-nav').css('pointer-events', click);
        
    };

    const loadProjects = () => {
        const projectSubset = $('#active-project-subset');
        const position = $(projectSubset).index();

        const projects = $(projectSubset).children();
        for (let i = 0; i < 4; i++) {
            const projectId = position * 4 + i;
            const child = $($(projects[i]).children().first());

            if (!child.hasClass('loaded')) {
                $.getJSON(`/projects/${projectId}`).then(
                    function(res) {
                        child.html(`<img src="/images/${res.image}"><h3>${res.name}</h3>`);
                        child.attr("href", res.link);
                        child.addClass('loaded');
                    },
                    function(err) {
                        const child = $($(projects[i]).children().first());
                        child.html('Failed to load...');
                        console.error('error while fetching project: ', err);
                    }
                );
            }
        }
    }

    $('.left-button').click(
        function() {
            const projectSubset = $('#active-project-subset');
            const position = $(projectSubset).index();
            if (position) {
                $('#subset-wrapper').animate(
                    {
                        scrollLeft: `-=${$(projectSubset).width()}px`
                    },
                    'fast'
                );
                $(projectSubset).removeAttr('id');
                $($(projectSubset).parent().children()[position-1]).attr('id', 'active-project-subset');
            }
        }
    );

    $('.right-button').click(
        function() {
            const scrollRight = (projectSubset) => {
                $('#subset-wrapper').animate(
                    {
                        scrollLeft: `+=${$(projectSubset).width()}px`
                    },
                    'fast'
                );
            }

            const currentSubset = $('#active-project-subset');
            const position = $(currentSubset).index();
            const numSubsets = $(currentSubset).parent().children().length;

            if (position + 1 >= numSubsets) {
                console.log('one');
                const newSubset = $(currentSubset).clone(true);
                const child = newSubset.children().children();
                child.html('Loading...');
                child.attr('href', '#');
                child.removeAttr('target');
                child.removeClass('loaded');
                newSubset.attr('id', 'active-project-subset');
                $(currentSubset).parent().append(newSubset);
            } else {
                console.log('two')
                $($(currentSubset).parent().children()[position+1]).attr('id', 'active-project-subset');
            }
            console.log('three');
            $(currentSubset).removeAttr('id');
            scrollRight(currentSubset);
            loadProjects();
        }
    );

    $('#main-content').scroll(checkMainSection);

    $('#navigation-button').click(function() {
        const line1 = $('#navigation-button-line1');
        const line2 = $('#navigation-button-line2');
        const contn = $('#navigation-content');
        
        const close = contn.width() > 0;

        contn.animate({width: close ? '0vw' :  '100vw'}, 750);
        line1.animate({top:   close ? '0%'  :  '17%'  }, 750);
        line2.animate({top:   close ? '0%'  : '-17%'  }, 750);
    });

    $('.project').hover(
        function() {
            $(this).animate(
                {
                    'width': '100%',
                    'height': '100%',
                    'margin-left': '0%',
                    'margin-right': '0%'
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

    checkMainSection();
    loadProjects();
});
