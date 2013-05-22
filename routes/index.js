
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.signin = function(req, res){
  res.render('signin', { title: 'Express' });
};
exports.signup = function(req, res){
  res.render('signup', { title: 'Express' });
};
exports.dashboard = function(req, res){
  res.render('dashboard', { title: 'Express' });
};
exports.users = function(req, res){
  res.render('users', { title: 'Express' });
};