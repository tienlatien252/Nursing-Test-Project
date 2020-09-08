const stripe = require('stripe')('pk_test_51HHZhMHCXVS0Bcw5gzo4yE1Lhyj6zkvdjcNDL5KlpIDxPUt9tJ6IXsMwwM3R1BfcfDdkyc6UxpIzuEQ1pGffRBQx00wViioYgg');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const endpointSecret = 'whsec_DFvXlyhOHqHyu79fEi69H52CtT6gCTrV';
const client = require('../../postresql_client');

router.post('/', bodyParser.raw({ type: 'application/json' }), async function (request, response) {
    const sig = request.headers['stripe-signature'];
    let event;
    console.log(request.body);
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log("test event: ",event);
    }
    catch (err) {
        console.log({ message: err.message, Error: err });
        response.status(400).send(`Webhook Error: ${err.message}`)
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const queryString = `INSERT INTO purchases(purchase_time, expire_time) VALUES (TO_TIMESTAMP(${event.data.object.created},'YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP(${event.data.object.created} + 378432000,'YYYY-MM-DD HH:MI:SS') )`;
            
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