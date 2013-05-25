var passport = require('passport')
  , mongoose = require('mongoose')
  , authorization = require('../lib/authorization')
  , User = mongoose.model('User');

module.exports = function (app) {

  // auth-related router
  require('./auth')(app);

  // index
  app.get('/', function (req, res) {
    res.render('index', { title: 'Express', user: req.user, message: req.flash('info') });
  });

  app.get('/dashboard', function (req, res) {
    res.render('dashboard', { title: 'Express' });
  });

  app.get('/users', authorization.requiresLogin, function (req, res) {
    User.find({}, function (err, users) {
      res.render('users', { title: 'Express', users: users, user: req.user });
    });
  });

};
