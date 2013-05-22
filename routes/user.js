var mongoose = require('mongoose')
  , User = mongoose.model('User');

/*
 * GET users listing.
 */
exports.list = function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
};

/*
 * POST a new user
 */
exports.create = function (req, res) {
  var user = new User({
    username: req.param('username'),
    fullName: req.param('fullName'),
    password: req.param('password'),
    email: req.param('email')
  });
  user.save(function (err, data) {
    if (err) {
      res.json(err);
      return;
    }
    res.json(user);
  });
};
