var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const {Client} = require('pg')
const client = new Client ({
  user: "postgres",
  password: "1234",
  host: "Conghoangtung’s MacBook Pro",
  port: 5432,
  database: "test"
})

client.connect()
.then(() => console.log("Connected sucessfully"))
.catch(e => console.log)
.finally(()=>client.end())

module.exports = router;