const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const content = {
        name: 'Malakai "Shaylin" C.',
        miniBio: 'Self taught computer programmer and full stack web developer, with a passion for expanding my knowledge and applying it.',
        quote: {
            content: '“Happy is the man that findeth wisdom, and the man that getteth understanding.”',
            source: 'Proverbs 3:13 KJV'
        },
        projects: [

        ],
        languages: [
            'C',
            'C++',
            'Python 3',
            'HTML 5',
            'CSS 3',
            'JavaScript',
            'SQL',
            'EJS'
        ],
        tools: [
            'VSCode',
            'Git',
            'Github',
            'Node.js',
            'Express.js',
            'JQuery',
            'Postgresql',
            'Heroku',
            'Raylib'
        ],
        bio: [
            'I am a self taught open source web developer and computer programmer with about two and a half years of experience. I started my journey in early 2020 when I found Codecademy and began diving into programming. Since then I’ve gained experience across a variety of languages including C, C++, Python, and JS.',
            'Shortly after starting my journey, I joined Codecademy’s community forums and began helping other learners there. I joined the volunteer Super User team in March of 2020 and gained more experience working with the volunteer staff there. I eventually joined the Codecademy Discord’s moderation team, and helped to develop the moderation and utility bot used there.',
            'After Skillsoft purchased Codecademy, community goals no longer quite lined up, and myself and several other members of the community team left to form the Project Nu community, an entirely free platform designed as a friendly place for programmers of all levels to share and gain knowledge.',
            'Currently I am continuing to expand my knowledge of the web as I seek to start a career in programming. I also pursue my desire to work at a low level by studying C and x86 assembly, along with the theories behind kernels and operating systems.'
        ]
    }
    res.render('home', content);
});

module.exports = router;
