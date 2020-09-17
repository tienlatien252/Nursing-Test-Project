const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const { queryPostgres } = require('../postresql_client');
const moment = require('moment');
require('dotenv').config();

async function addPurchaseInfoToDatabase(paymentIntent) {
    try {
        const userId = paymentIntent.metadata.userId;
        const purchase_time_stamp = moment(paymentIntent.created * 1000).format("YYYY-MM-DD HH:mm:ss");
        const expire_time_stamp = moment(paymentIntent.created * 1000).add(12, 'month').format("YYYY-MM-DD HH:mm:ss");
        const queryString = `INSERT INTO purchases(test_id , user_id, purchase_time, expire_time) VALUES ( 1, '${userId}' , '${purchase_time_stamp}','${expire_time_stamp}')`;

        await queryPostgres(queryString);
        console.log('PaymentIntent was successful!');
    } catch (error) {
        console.log(`Error when insert purchase to database : ${error.message}`);
        throw Error(`Error when insert purchase to database : ${error.message}`);
    }
}

async function testPaymentIntent(paymentSecret) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentSecret
    );
    return paymentIntent;
}

router.post('/', bodyParser.raw({ type: 'application/json' }), async function (request, response) {
    const event = request.body;
    console.log('EVENT BODY : ',event);
    //event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    try {
        if (!event.data.object) {
            return response.status('Event does not have correct data').end();
        }

        const paymentIntent = event.data.object;
        
        if (!paymentIntent.metadata || !paymentIntent.metadata.userId) {
            return response.status('Payment Intent does not have userID').end();
        }
        console.log('Payment Intent: ',paymentIntent)
        switch (event.type) {
            case 'payment_intent.succeeded':
                await addPurchaseInfoToDatabase(paymentIntent);
                break;
            case 'payment_method.attached':
                console.log('PaymentMethod was attached to a Customer!');
                break;
            default:
                return response.status(400).status('Event type does not match').end();
        }

        response.json({ received: true });
    }
    catch (err) {
        console.log({ message: err.message, Error: err });
        return response.status('Webhook does not work').end();
    }
})

module.exports = router;

