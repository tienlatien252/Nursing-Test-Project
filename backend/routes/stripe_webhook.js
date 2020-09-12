const stripe = require('stripe')('pk_test_51HHZhMHCXVS0Bcw5gzo4yE1Lhyj6zkvdjcNDL5KlpIDxPUt9tJ6IXsMwwM3R1BfcfDdkyc6UxpIzuEQ1pGffRBQx00wViioYgg');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const endpointSecret = 'whsec_DFvXlyhOHqHyu79fEi69H52CtT6gCTrV';
const {queryPostgres} = require('../postresql_client');
const moment = require('moment');
require('dotenv').config();
router.post('/', bodyParser.raw({ type: 'application/json' }), async function (request, response) {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
    // event = stripe.webhooks.constructEvent(request.rawBody.body, sig, endpointSecret);
         event = request.body
        console.log(event)
    }
    catch (err) {
        console.log({ message: err.message, Error: err });
        response.status(400).send(`Webhook Error: ${err.message}`)
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;//2323236
            let purchase_time_stamp = moment(event.data.object.created * 1000).format("YYYY-MM-DD HH:mm:ss");
            let expire_time_stamp = moment(event.data.object.created * 1000).add(12, 'month').format("YYYY-MM-DD HH:mm:ss");
            const queryString = `INSERT INTO purchases(purchase_time, expire_time) VALUES ('${purchase_time_stamp}','${expire_time_stamp}')`;
            queryPostgres(queryString);
            console.log('PaymentIntent was successful!');
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('PaymentMethod was attached to a Customer!');
            break;
        case 'payment_intent.created':
            async function amountOrder() {
                try {
                    const queryString = "SELECT test_price FROM tests WHERE test_id = 1";
                    const test = await queryPostgres(queryString);
                    var amount = test.rows[0].test_price;
                    return amount;
                }
                catch (error) {
                    console.log(`Error in function amountOrder: ${error.message}`);
                }
            }

            router.get('/', async function createPaymentIntent(req, res, next) {
                try {
                    let test_amount = await amountOrder();
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: test_amount,
                        currency: 'usd',
                        payment_method_types: ['card'],
                        
                        // customer: 1234,
                        // Verify your integration in this guide by including this parameter
                        metadata: { integration_check: 'accept_a_payment' },
                    })
                    console.log(paymentIntent);
                    const response = {
                        'client_secret': paymentIntent.client_secret,
                    };
                    return res.json(response);
                } catch (error) {
                    console.log(`Error in function createPaymentIntent: ${error.message}`);
                    return res.status(500).send({ error: 'Something went wrong!' });
                }
            })
            console.log('PaymentIntent Creation was successful!');
            break;
        // ... handle other event types
        default:
            // Unexpected event type
            return response.status(400).end();
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({ received: true });
})

module.exports = router;