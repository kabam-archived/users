var mongoose = require('mongoose'),
    GoogleStrategy = require('passport-google').Strategy;

module.exports = function (config, passport) {
  var User = mongoose.model('User');
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  passport.use(new GoogleStrategy({
    returnURL: config.google.callbackURL,
    realm: config.google.realm
  }, function (identifier, profile, done) {
    User.findOne({ 'accounts.id': identifier }, function (err, user) {
      if (user === null) {
        var account = {
          id: identifier,
          provider: 'google',
          displayName: profile.displayName,
          emails: profile.emails,
          name: profile.name
        };
        user = new User({
          username: profile.emails[0].value,
          accounts: [ account ]
        });
        user.save(function (err, data) {
          return done(err, data);
        });
      }
      console.log(user);
      return done(err, user);
    });
  }));

};
