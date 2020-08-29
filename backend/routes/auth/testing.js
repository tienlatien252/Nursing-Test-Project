const express = require('express');
const client = require('../../postresql_client');
const postAnswers = require('./answers');
const getQuestions = require('./questions');
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
        console.log(`Error in function checkPurchases: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
}

router.post('/:testId/answers', checkPurchases, postAnswers);
router.get('/:testId/questions', checkPurchases, getQuestions);

module.exports = router;