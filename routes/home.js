const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const name    = await req.app.database.query('config', {_id: 'name'});
    const bio     = await req.app.database.query('config', {_id: 'bio'});
    const miniBio = await req.app.database.query('config', {_id: 'miniBio'});
    const quote   = await req.app.database.query('config', {_id: 'quote'});

    const content = {
        name: name[0].val,
        miniBio: miniBio[0].val,
        quote: quote[0].val,
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
        bio: bio[0].val
    }
    res.render('home', content);
});

module.exports = router;
