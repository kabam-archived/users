var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.list = function (req, res) {
  User.find({}, function (err, users) {
    res.render('users', { title: 'Express', users: users, user: req.user });
  });
};
