const express = require('express');
const client = require('../../postresql_client');
const router = express.Router();

/* GET user's purchases. */
router.get('/', async function getPurchases(req, res, next) {
    try {
        const userId = req.uid;
        const queryString = `SELECT purchases.test_id, purchases.purchase_time, purchases.expire_time, tests.test_name, tests.test_description FROM purchases,tests WHERE user_id='${userId}';`;
        const purchases = await client.query(queryString);
        const response = {
            'uid': userId,
            'purchases': purchases.rows
        };
        return res.json(response);
    } catch (error) {
        console.log(`Error in function getPurchases: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
});

module.exports = router;