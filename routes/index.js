var passport = require('passport')
  , mongoose = require('mongoose')
  , User = mongoose.model('User');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
  });

  app.get('/signin', function (req, res) {
    res.render('signin', { title: 'Express', user: req.user });
  });

  app.get('/signup', function (req, res) {
    res.render('signup', { title: 'Express' });
  });

  app.post('/signup', function (req, res) {
    User.register(new User({
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email
    }), req.body.password, function (err, user) {
      if (err) {
        res.render('signup', { user: user });
      }
      res.redirect('/');
    });
  });

  app.get('/dashboard', function (req, res) {
    res.render('dashboard', { title: 'Express' });
  });

  app.get('/users', function (req, res) {
    res.render('users', { title: 'Express' });
  });

};
