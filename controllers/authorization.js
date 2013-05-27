var config = require('yaml-config').readConfig(__dirname + '/../config/config.yml')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , User = mongoose.model('User')
  , email = require('../lib/email');

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
    active: false,
    username: req.body.username,
    accounts: [ account ]
  }), req.body.password, function (err, user) {
    if (err) {
      res.render('signup', { user: user });
    }
    user.generateConfirmationLink(function (err, data) {
      email.sendMail('account_activation',
                     req.body.displayName + ' <' + req.body.email + '>',
                     'MyWebClass account activation',
                     { displayName: req.body.displayName,
                       link: config.app.url + '/activate/' + user.confirmation.string }
                    );
    });
    req.flash('info', 'Please check your email to activate your account');
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

exports.activate = function (req, res) {
  console.log(req.params.string);
  User.findOne({ active: false, 'confirmation.string': req.params.string }, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log(user);
      req.flash('info', 'Activate user failed! Make sure you call the correct link!');
      return res.redirect('/');
    }
    console.log(user);
    user.activateUser(req.params.string, function (err) {
      if (err) {
        req.flash('info', err.message);
      } else {
        req.flash('info', 'Your user account has been activated');
        req.login(user, function(err) {
          if (err) {
            req.flash('info', err.message);
          }
          return res.redirect('/');
        });
      }
      return res.redirect('/');
    });

  });
};
