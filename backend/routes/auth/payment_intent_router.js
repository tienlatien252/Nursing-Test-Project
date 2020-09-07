require('dotenv').config();
const client = require('../../postresql_client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

async function amountOrder() {
    try {
        const queryString = "SELECT test_price FROM tests WHERE test_id = 1";
        const test = await client.query(queryString);
        var amount = test.rows[0].test_price;
        return amount;
    }
    catch (error) {
        console.log(`Error in function getQuestions: ${error.message}`);
    }
}

router.get('/', async function createPaymentIntent(req, res, next) {
    try {
        let test_amount = await amountOrder();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: test_amount,
            currency: 'usd',
            payment_method_types: ['card'],
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
        });
        console.log(paymentIntent)
        const response = {
            'client_secret': paymentIntent.client_secret,
        };
        return res.json(response);
    } catch (error) {
        console.log(`Error in function createPaymentIntent: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
})

module.exports = router;