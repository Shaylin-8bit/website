const e = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('base', {text: 'projects page'});
});

router.get('/:id', async (req, res) => {
    const sql = `SELECT content FROM projects WHERE id = '${req.params.id}' LIMIT 1;`;
    const ans = await req.app.database.query(sql);
    if (ans.rows && ans.rows.length) {
        res.json(JSON.parse(ans.rows[0].content));
    } else {
        return res.status(404);
    }

});

module.exports = router;
