const client = require('../../postresql_client');
/*Check the user purchases */
async function getQuestions(req, res, next) {
    //console.log(req.query)
    try {
        const testId = req.params.testId;
        const limit = req.query.limit || 20;
        const queryString = `SELECT test_id, description, topic, picture_link, correct_answer, answers FROM questions WHERE test_id = ${testId} ${isNaN(limit)?'':'LIMIT ' + limit}`; 
        const questions = await client.query(queryString);
        //console.log(questions)
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