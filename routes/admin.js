const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('base', {text: 'admin page'});
});

module.exports = router;
