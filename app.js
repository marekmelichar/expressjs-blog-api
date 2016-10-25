var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var firebase = require('firebase');
// var fbRef = new Firebase('https://blog-app-b0e25.firebaseapp.com/');
// Initialize Firebase
// todo: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyCktQDPiX0q4sNtIj42cWOXda9ePGFUR00",
  authDomain: "blog-app-b0e25.firebaseapp.com",
  databaseURL: "https://blog-app-b0e25.firebaseio.com",
  storageBucket: "blog-app-b0e25.appspot.com"
};
firebase.initializeApp(config);




// Route Files
var routes = require('./routes/index');
var albums = require('./routes/albums');
var genres = require('./routes/genres');
var users = require('./routes/users');

// Init app
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// logger
app.use(logger('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Handle sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// static public folder
app.use(express.static(path.join(__dirname, 'public')));

// connect flash
app.use(flash());

// global variables
app.use(function(req,res,next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// routes
app.use('/', routes);
app.use('/albums', albums);
app.use('/genres', genres);
app.use('/users', users);

// set port
app.set('port', (process.env.PORT || 3000));

// run server
app.listen(app.get('port'), function(){
  console.log('server started on port: '+app.get('port'));
});
// app.listen(port);
