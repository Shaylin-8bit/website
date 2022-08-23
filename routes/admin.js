require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use((req, res, next) => {
    if (!req.session.loggedIn) {
        return res.redirect('/login');
    } else {
        return next();
    }
});

router.get('/', (req, res) => {
    res.render('admin');
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
            if (req.body.newPassword !== req.body.confirm) return res.render('password', {message: 'Passwords do not match!'});
            
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

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
