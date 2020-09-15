var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var testsRouter = require('./routes/tests');
var authRouter = require('./routes/auth');
var stripeWebhook = require('./routes/stripe_webhook');
const cors = require('cors');
const {client} = require('./postresql_client');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('json spaces', 2);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json({
//   // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
//   verify: function (req, res, buf) {
//     var url = req.originalUrl;
//     if (url.startsWith('/stripe-webhooks')) {
//       req.rawBody = buf.toString()
//     }
//   }
// }));

app.use(cors());

app.use('/', indexRouter);
app.use('/tests', testsRouter);
app.use('/auth', authRouter);
app.use('/stripe-webhook', stripeWebhook);
// app.use('/stripe-webhook', bodyParser.raw({ type: "*/*" }));
// app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

client.connect().then(res => app.listen('5000'));
module.exports = app;
