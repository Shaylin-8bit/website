const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const name    = await req.app.database.query(`SELECT val FROM config WHERE var = 'name' LIMIT 1;`);
    const bio     = await req.app.database.query(`SELECT val FROM config WHERE var = 'bio' LIMIT 1;`);
    const miniBio = await req.app.database.query(`SELECT val FROM config WHERE var = 'miniBio' LIMIT 1;`);
    const quote   = await req.app.database.query(`SELECT val FROM config WHERE var = 'quote' LIMIT 1;`);

    console.log(name.rows);

    const content = {
        name: name.rows[0].val,
        miniBio: miniBio.rows[0].val,
        quote: JSON.parse(quote.rows[0].val),
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
        bio: JSON.parse(bio.rows[0].val)
    }
    res.render('home', content);
});

module.exports = router;
