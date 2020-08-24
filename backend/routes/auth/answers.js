const client = require('../../postresql_client');

async function getCorrectAnswers(submission, testId){
    const userQuestion = submission.map((answer)=>answer.questionId).toString();
    const queryString = `SELECT * FROM questions WHERE test_id='${testId}' AND question_id IN (${userQuestion});`;
    const questions = (await client.query(queryString)).rows;

    const correctAnswers = questions.reduce((questionAnswerMap, question) =>{
        questionAnswerMap[question.question_id]=question.correct_answer;
        return questionAnswerMap;
    }, {})

    return correctAnswers;
}

async function postAnswers(req, res, next) {
    try {
        const userSubmission = req.body.answers;
        const correctAnswers = await getCorrectAnswers(userSubmission, req.params.testId);

        const score = userSubmission.reduce((calculatingScore, userAnswer) => {
            return userAnswer.answer == correctAnswers[userAnswer.questionId] ? calculatingScore+1 : calculatingScore;
        }, 0)*100.0/userSubmission.length;

        const answers = userSubmission.map((answer) => {
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