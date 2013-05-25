var passport = require('passport')
  , mongoose = require('mongoose')
  , User = mongoose.model('User');

module.exports = function (app) {

  app.get('/', function (req, res) {
    console.log(req.user);
    res.render('index', { title: 'Express', user: req.user, message: req.flash('info') });
  });

  app.get('/signin', function (req, res) {
    res.render('signin', { title: 'Express', user: req.user, message: req.flash('error') });
  });

  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin',
                                                     failureFlash: true }), function (req, res) {
    res.redirect('/');
  });

  app.get('/signup', function (req, res) {
    res.render('signup', { title: 'Express' });
  });

  app.post('/signup', function (req, res) {
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
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // External sign-in
  app.get('/auth/google', passport.authenticate('google'));

  app.get('/auth/google/return', passport.authenticate('google', { successRedirect: '/',
                                                                  failureRedirect: '/signin' }));

  app.get('/dashboard', function (req, res) {
    res.render('dashboard', { title: 'Express' });
  });

  app.get('/users', function (req, res) {
    User.find({}, function (err, users) {
      res.render('users', { title: 'Express', users: users });
    });
  });

};
