const stripe = require('stripe')('pk_test_51HHZhMHCXVS0Bcw5gzo4yE1Lhyj6zkvdjcNDL5KlpIDxPUt9tJ6IXsMwwM3R1BfcfDdkyc6UxpIzuEQ1pGffRBQx00wViioYgg');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.post('/', bodyParser.raw({ type: 'application/json' }), (request, response) {
    let event;
    try {
        event = JSON.parse(request.body);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
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
}

module.exports = 






module.exports = router;