const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('base', {text: 'projects page'});
});

module.exports = router;
