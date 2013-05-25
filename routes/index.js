var passport = require('passport')
  , mongoose = require('mongoose')
  , User = mongoose.model('User');

module.exports = function (app) {

  app.get('/', function (req, res) {
    console.log(req.flash());
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
    var emails = [];
    emails.push({value: req.body.email,
                 type: 'default'});
    User.register(new User({
      provider: 'local',
      username: req.body.username,
      displayName: req.body.displayName,
      emails: emails
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

  app.get('/dashboard', function (req, res) {
    res.render('dashboard', { title: 'Express' });
  });

  app.get('/users', function (req, res) {
    User.find({}, function (err, users) {
      res.render('users', { title: 'Express', users: users });
    });
  });

};
