var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require('./engine');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//
const fileUpload = require('express-fileupload');
//đăng nhập mới cho sửa bài viết
var expressSession = require('express-session')
var MongoStore = require('connect-mongo')

var app = express();
app.engine('html',engine);
app.set('views', './public/views') // specify the views directory
app.set('view engine', 'html') // register the template engine
// view engine setup
// app.set('views', path.join(__dirname, 'public/views'));
// app.set('view engine', 'ejs');

//đăng nhập mới cho sửa bài viết
app.use(expressSession({
  secret: 'secret',
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/quanao' }),
  resave: true,
  saveUninitialized: true
}))

//upload ảnh
app.use(fileUpload());
//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
