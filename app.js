
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express()
  , env = process.env.NODE_ENV || 'development'
  , config = require('yaml-config').readConfig('../../../config/config.yml', env) // the module weirdly uses relative path from the library
  , mongoose = require('mongoose')
  , flash = require('connect-flash')
  , mail = require('./config/mail')(config)
  , passport = require('passport');

  console.log(mail);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "MyWebClass <mywebclass@webizly.com>", // sender address
    to: "MyWebClass <mywebclass@webizly.com>", // list of receivers
    subject: "Hello ", // Subject line
    text: "Hello world ", // plaintext body
    html: "<b>Hello world </b>" // html body
}

// send mail with defined transport object
mail.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});

// all environments
app.set('port', process.env.PORT || 80);
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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
console.log(app.routes);
