require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use((req, res, next) => {
    if (req.session.loggedIn) {
        return res.redirect('/admin');
    } else {
        return next();
    }
});

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/admin');
    } else {
        res.render('login', {message: false});
    }
});

router.post('/', async (req, res) => {
    try {
        const currentHashReq = await req.app.database.query('config', {_id: 'password'});
        const currentHash = currentHashReq.rows[0].val;
        const auth = await bcrypt.compare(req.body.password, currentHash);
        
        if (auth) {
            req.session.loggedIn = true;
            return res.redirect('/admin');
        }
        return res.render('login', {message: 'Invalid password!'});
    } catch (err) {
        console.error(err);
        return res.render('login', {message: 'Server error... Something went wrong.'});
    }
});

module.exports = router;
