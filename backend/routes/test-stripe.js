const express = require('express');
const { queryPostgres } = require('../../postresql_client');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/* GET user's purchases. */
router.get('/', function confirmPaymentIntent(req, res, next) {
    const elements = stripe.elements()
    const card = elements.card()
    stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: ,
            billing_details: {
                name: 'Jenny Rosen'
            }
        }
    }).then(function (result) {
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
})

module.exports = router;