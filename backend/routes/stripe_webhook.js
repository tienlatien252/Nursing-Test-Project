const stripe = require('stripe')('pk_test_51HHZhMHCXVS0Bcw5gzo4yE1Lhyj6zkvdjcNDL5KlpIDxPUt9tJ6IXsMwwM3R1BfcfDdkyc6UxpIzuEQ1pGffRBQx00wViioYgg');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const { queryPostgres } = require('../postresql_client');
const moment = require('moment');
require('dotenv').config();

router.post('/', bodyParser.raw({ type: "*/*" }), async function (request, response) {
    let event;
    try {
        //if (request.body.metadata.userId) {
        // event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        event = request.body
        console.log('event: ', event);
        //} else {
        // throw new Error("The payment intent does not have userID");
        //}
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
            const queryString = `INSERT INTO purchases(test_id ,purchase_time, expire_time) VALUES ( 1,'${purchase_time_stamp}','${expire_time_stamp}')`;
            queryPostgres(queryString);
            console.log('PaymentIntent was successful!');
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('PaymentMethod was attached to a Customer!');
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