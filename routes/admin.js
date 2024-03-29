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
        const currentHashReq = await req.app.database.query('config', {'_id': 'password'});
        const currentHash = currentHashReq[0].val;
        const auth = await bcrypt.compare(req.body.currentPassword, currentHash);
        
        if (auth) {
            if (req.body.newPassword !== req.body.confirm) return res.render('password', {message: 'Passwords do not match!'});
            
            const newHash = await bcrypt.hash(req.body.newPassword, 10);
            await req.app.database.update('config', {_id: 'password'}, {val: newHash});
            return res.render('password', {message: 'Password change successful!'});
        }
        return res.render('password', {message: 'Invalid current password!'});
    } catch (err) {
        console.error(err);
        return res.render('password', {message: 'Server error... Something went wrong.'});
    }
});

router.get('/projects', (req, res) => {
    res.render('projects');
});

router.post('/newProject', (req, res) => {
    console.log(req.body.content);
    res.redirect('/admin/projects');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
