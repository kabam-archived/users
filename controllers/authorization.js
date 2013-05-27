var passport = require('passport')
  , mongoose = require('mongoose')
  , User = mongoose.model('User');

exports.signin = function (req, res) {
  res.render('signin', {
    title: 'Signin'
    , user: req.user
    , message: req.flash('error')
  });
};

exports.newLocalUser = function (req, res) {
  var account = {
    provider: 'local',
    id: req.body.username,
    displayName: req.body.displayName,
    emails: [ { value: req.body.email, type: 'default' } ]
  };
  User.register(new User({
    username: req.body.username,
    accounts: [ account ]
  }), req.body.password, function (err, user) {
    if (err) {
      res.render('signup', { user: user });
    }
    res.redirect('/');
  });
};

exports.signup = function (req, res) {
  res.render('signup', { title: 'Express' });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
