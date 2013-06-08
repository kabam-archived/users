
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = module.exports = express()
  , env = process.env.NODE_ENV || 'development'
  , config = require('yaml-config').readConfig(__dirname + '/config/config.yml', env)
  , mongoose = require('mongoose')
  , flash = require('connect-flash')
  , passport = require('passport')
  , mers = require('mers');

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/client/app/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser('mywebclass secret cookie'));
app.use(express.session());
app.use(flash());

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
require('./config/passport')(config, passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// setup routes
require('./config/routes')(app, passport);

// add REST interface
app.use('/rest', mers({mongoose: mongoose}).rest());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
