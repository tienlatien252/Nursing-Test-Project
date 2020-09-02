const client = require('../../postresql_client');

/*Check the user purchases */
async function getQuestions(req, res, next) {
    try {
        const testId = req.params.testId;
        const limit = req.query.limit || 20;
        const queryString = `SELECT test_id, question_id, description, topic, picture_link, answers FROM questions WHERE test_id = ${testId} ORDER BY random() ${isNaN(limit) ? '' : 'LIMIT ' + limit}`; 
        const questions = await client.query(queryString);
        const response = {
            'questions': questions['rows']
        };
        return res.json(response);
    } catch (error) {
        console.log(`Error in function getQuestions: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!'});
    }
}

module.exports = getQuestions;