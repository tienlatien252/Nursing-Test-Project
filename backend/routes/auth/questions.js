const { queryPostgres } = require('../../postresql_client');

function shuffle(array) {
    if (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    return array;
}

/*Check the user purchases */
async function getQuestions(req, res, next) {
    try {
        const testId = req.params.testId;
        const limit = req.query.limit || 20;
        const queryString = `SELECT test_id, question_id, description, topic, picture_link, answers FROM questions WHERE test_id = ${testId} ORDER BY random() ${isNaN(limit) ? '' : 'LIMIT ' + limit}`;
        const queryResult = await queryPostgres(queryString);
        const questions = queryResult['rows'].map((question) => {
            return {
                'answers': shuffle(question.answers),
                ...question,
            }
        });
        const response = {
            'questions': questions
        };
        return res.json(response);
    } catch (error) {
        console.log(`Error in function getQuestions: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
}

module.exports = getQuestions;