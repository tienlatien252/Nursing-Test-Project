const client = require('../../postresql_client');

async function getCorrectAnswers(submittion, testId){
    const userQuestion = submittion.map((answer)=>answer.questionId).toString();
    const queryString = `SELECT * FROM questions WHERE test_id='${testId}' AND question_id IN (${userQuestion});`;
    const questions = (await client.query(queryString)).rows;

    const correctAnswers = questions.reduce((accumulator, question) =>{
        accumulator[question.question_id]=question.correct_answer;
        return accumulator;
    }, {})

    return correctAnswers;
}

async function postAnswers(req, res, next) {
    try {
        const testId = req.params.testId;
        const userSubmition = req.body.answers;
        const correctAnswers = await getCorrectAnswers(userSubmition, testId);

        const score = userSubmition.reduce((calculatingScore, answer) => {
            return answer.answer == correctAnswers[answer.questionId] ? calculatingScore+1 : calculatingScore;
        }, 0)*100.0/userSubmition.length;

        const answers = userSubmition.map((answer) => {
            return {
                'questionId': answer.questionId,
                'userAnswer': answer.answer,
                'correctAnswer': correctAnswers[answer.questionId]
            };
        });
        
        return res.json({
            'score': score,
            'answers': answers
        });
    } catch (error) {
        console.log(`Error in function getPurchases: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
}

module.exports = postAnswers;