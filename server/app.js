var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const homeRouter = require('./routes/home');
const mvRouter = require('./routes/mv');
const singerRouter = require('./routes/singer');
const songlistRouter = require('./routes/songlist');
const songRouter = require('./routes/song');
const meRouter = require('./routes/me');
const searchRouter = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './public/dist')));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Credentials',true);
  // res.header("Access-Control-Max-Age", '30000');
  res.header("Access-Control-Allow-Headers","X-Requested-With,content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // res.header("Cache-Control", "max-age=200");
  res.header("Cache-Control", "private");
  res.header('Content-Type','application/json; charset=utf-8');
  if (req.method.toLowerCase() == 'options')
    res.send(200);
  else
    next();
});

app.disable('etag');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', homeRouter);
app.use('/', mvRouter);
app.use('/', singerRouter);
app.use('/', songlistRouter);
app.use('/', songRouter);
app.use('/', meRouter);
app.use('/', searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
