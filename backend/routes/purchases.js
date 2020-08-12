var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`Verified request from ${req.email}`);
});

module.exports = router;