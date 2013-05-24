
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')
  , passport = require('passport');

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/client/app/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'client/app')));

// Bootstrap db connection
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

// Configure user authentication
var User = mongoose.model('User');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// setup routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
