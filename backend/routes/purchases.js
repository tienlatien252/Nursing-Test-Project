const express = require('express');
const client = require('../postresql_client');
const router = express.Router();

/* GET user's purchases. */
router.get('/', async function getPurchases(req, res, next) {
    try {
        const user_id = req.uid;
        const purchases = await client.query(`SELECT * FROM purchases,tests WHERE user_id='${user_id}'`);
        const rows = purchases.rows.map((row) =>{
            delete row.user_id;
            return row;
        });
        const response = {
            'uid': user_id,
            'purchase': rows
        };
        return res.json(response);
    } catch (error) {
        return res.status(500).send({ error: 'Something failed!' });
    }
})

module.exports = router;