const e = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('base', {text: 'projects page'});
});

router.get('/:id', async (req, res) => {
    const ans = await req.app.database.query('projects', {_id: parseInt(req.params.id)});
    console.log(ans);
    if (ans.length) {
        console.log(ans);
        res.json(ans[0].content);
    } else {
        return res.status(404);
    }

});

module.exports = router;
