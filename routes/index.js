var mongoose = require('mongoose')
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

  app.get('/users', function (req, res) {
    User.find({}, function (err, users) {
      res.render('users', { title: 'Express', users: users });
    });
  });

};
