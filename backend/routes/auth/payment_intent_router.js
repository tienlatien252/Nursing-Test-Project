require('dotenv').config();
const { queryPostgres } = require('../../postresql_client');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

async function amountOrder(purchasingTests) {
    try {
        const queryString = `SELECT test_price FROM tests WHERE test_id IN (${purchasingTests})`;
        const tests = (await queryPostgres(queryString)).rows;

        const amount = tests.reduce((sum, test) =>{
            sum += test.test_price;
            return sum;
        }, 0);

        return amount;
    }
    catch (error) {
        console.log(`Error in function amountOrder: ${error.message}`);
    }
}

router.post('/', async function createPaymentIntent(req, res) {
    try {
        const purchasingTests = req.body.tests.map((test)=>test.testId).toString();
        const test_amount = await amountOrder(purchasingTests);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: test_amount,
            currency: 'usd',
            payment_method_types: ['card'],
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment', userId: req.uid, tests: purchasingTests},
        });
        const response = {
            'client_secret': paymentIntent.client_secret,
        };
        return res.json(response);
    } catch (error) {
        console.log(`Error in function createPaymentIntent: ${error.message}`);
        return res.status(500).send({ error: 'Something went wrong!' });
    }
});

module.exports = router;