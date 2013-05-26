

module.exports = function (app, passport) {
  
  var authorization = require('../controlers/authorization'),
      pages = require('../controlers/pages'),
      users = require('../controlers/users'),
      auth = require('../lib/authorization');

  app.get('/', pages.index);
  app.get('/about', pages.about);
  app.get('/signup', authorization.signup);
  app.post('/signup', authorization.newLocalUser);
  app.get('/signin', authorization.signin);
  app.post('/signin', passport.authenticate('local', {
                                    successRedirect: '/', 
                                    failureRedirect: '/signin',
                                    failureFlash: true })
  );
  app.get('/logout', authorization.logout);
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return', passport.authenticate('google', { successRedirect: '/',
                                                                  failureRedirect: '/signin' }));
  app.get('/users', auth.requiresLogin, users.list);

};