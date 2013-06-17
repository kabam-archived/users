exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/signin');
  }
  return next();
};

exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.redirect('/users/' + req.profile.id);
    }
    return next();
  }
};
