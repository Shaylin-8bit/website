require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.use(session({
    secret: process.env.SESSION_TOKEN,
    name: 'uniqueSessionID',
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60},
    resave: false
}));

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render('admin');
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/login', (req, res) => {
    res.render('login', {message: false});
});

router.get('/password', (req, res) => {
    res.render('password', {message: false});
});

router.post('/password', async (req, res) => {
    try {
        const currentHashReq = await req.app.database.query(`SELECT * FROM config WHERE var = 'password';`);
        const currentHash = currentHashReq.rows[0].val;
        const auth = await bcrypt.compare(req.body.currentPassword, currentHash);
        
        if (auth) {
            if (req.body.newPassword !== req.body.confirm) return res.render('password', {message: 'Passwords do no match!'});
            
            const newHash = await bcrypt.hash(req.body.newPassword, 10);
            await req.app.database.query(`UPDATE config SET val = '${newHash}' WHERE var = 'password';`);
            return res.render('password', {message: 'Password change successful!'});
        }
        return res.render('password', {message: 'Invalid current password!'});
    } catch (err) {
        console.error(err);
        return res.render('password', {message: 'Server error... Something went wrong.'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const currentHashReq = await req.app.database.query(`SELECT * FROM config WHERE var = 'password';`);
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

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;
