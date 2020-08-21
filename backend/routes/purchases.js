const express = require('express');
const client = require('../postresql_client');
const router = express.Router();

/* GET users listing. */
router.get('/', async function getPurchases(req, res, next) {
    const user_id = 'BN5rM3YwOOe7qk0bdqul2XRJZ4I3';
    const purchases = await client.query(`SELECT * FROM purchases WHERE user_id='${user_id}'`);
    const response = {
        'uid': user_id,
        'purchase': purchases.rows
    };
    return res.json(response);
})

module.exports = router;