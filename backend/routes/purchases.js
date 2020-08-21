const express = require('express');
const getPurchases = require('../controllers/purchases-controller')
const router = express.Router();

/* GET users listing. */
router.get('/', getPurchases)



module.exports = router;