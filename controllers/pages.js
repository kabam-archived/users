exports.index = function (req, res) {
  res.render('index', {
    title: 'Index page',
    user: req.user,
    message: req.flash('info')
  });
};

exports.about = function (req, res) {
  res.render('about', {
    title: 'About page',
    user: req.user
  });
};

//exports.about = function (req, res) {}
//exports.courses = function (req, res) {}
//exports.teachers = function (req, res) {}
