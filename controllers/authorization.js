var config = require('yaml-config').readConfig(__dirname + '/../config/config.yml'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    email = require('../lib/email'),
    baseEmail = new email.Email();

exports.signin = function (req, res) {
  res.render('signin', {
    title: 'Signin',
    user: req.user,
    message: req.flash('error')
  });
};

exports.newLocalUser = function (req, res) {
  var account = {
    provider: 'local',
    id: req.body.username,
    displayName: req.body.displayName,
    emails: [{value: req.body.email, type: 'default'}]
  };
  User.register(new User({
    active: false,
    username: req.body.username,
    accounts: [account]
  }), req.body.password, function (err, user) {

    if (err) {
      res.render('signup', {user: user});
      res.redirect('/');
    }

    user.generateConfirmationLink(function (err) {
      if (err) {
        throw new Error(err);
      }
      email.AccountRegistration(baseEmail);
      var recipient = req.body.email;

      baseEmail.send(recipient, 'MyWebClass account activation', {
        displayName: req.body.displayName,
        link: config.app.url + '/activate/' + user.confirmation.string
      }, function (err, result) {
        if (err) {
          req.flash('error', 'Something wrong');
          res.redirect('/signup');
        } else if (result) {
          req.flash('info', 'Please check your email to activate your account');
          res.redirect('/');
        }
      });
    });
  });
};

exports.signup = function (req, res) {
  res.render('signup', {title: 'Express'});
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.activate = function (req, res) {

  User.findOne({active: false, 'confirmation.string': req.params.string}, function (err, user) {
    if (err) {
      throw err;
    }
    if (!user) {

      req.flash('info', 'Activate user failed! Make sure you call the correct link!');
      return res.redirect('/');
    }

    user.activateUser(req.params.string, function (err) {
      if (err) {
        req.flash('info', err.message);
      } else {
        req.flash('info', 'Your user account has been activated');
        req.login(user, function (err) {
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
