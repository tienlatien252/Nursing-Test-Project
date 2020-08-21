const express = require('express');
const client = require('../postresql_client');
const router = express.Router();

/* GET all tests. */
router.get('/', async function getTests(req, res, next) {
    try {
        const queryString = `SELECT tests.test_id, tests.test_name, tests.test_description FROM tests;`;
        const tests = await client.query(queryString);
        const response = {
            'tests': tests.rows
        };
        return res.json(response);
    } catch (error) {
        console.log(`Error in function getTests: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
});

module.exports = router;