const client = require('../../postresql_client')
const stripe = require('stripe')('pk_test_51HHZhMHCXVS0Bcw5gzo4yE1Lhyj6zkvdjcNDL5KlpIDxPUt9tJ6IXsMwwM3R1BfcfDdkyc6UxpIzuEQ1pGffRBQx00wViioYgg')

async function paymentIntent(id) {
    id = 1
    try {
        const queryString = 'SELECT test_price FROM tests WHERE test_id = ' + id
        const test = await client.query(queryString)
        var amount = test.rows[0].test_price
        return amount
    }
    catch (error) {
        console.log(`Error in function getQuestions: ${error.message}`)
        return res.status(500).send({ error: 'Something went wrong!' })
    }
}

module.exports = paymentIntent