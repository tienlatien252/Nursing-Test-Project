const express = require('express');
const client = require('../../postresql_client');
const router = express.Router();

async function checkPurchases(req, res, next) {
    try {
        const userId = req.uid;
        const testId = req.params.testId;

        const queryString = `SELECT * FROM purchases WHERE user_id='${userId}' AND test_id=${testId};`;
        const purchases = await client.query(queryString);
        if(purchases.rows.length >0){
            next();
        } else{
            res.status(403).send('Unauthorized! User did not purchase this test!');
        }
    } catch (error) {
        console.log(`Error in function getPurchases: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
}

async function getAnswers(req, res, next) {
    try {
        const testId = req.params.testId;
        const userAnswers = req.body.answers;
        const queryString = `SELECT * FROM questions WHERE test_id='${testId}';`;
        const questions = (await client.query(queryString)).rows;
        
        return res.json(userAnswers);
    } catch (error) {
        console.log(`Error in function getPurchases: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
}

router.post('/:testId/answers', checkPurchases, getAnswers);

module.exports = router;