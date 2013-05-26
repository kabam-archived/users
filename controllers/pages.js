exports.index = function (req, res) {
  res.render('index', {
    title: 'Index page',
  })	
}
exports.about = function (req, res) {
  res.render('about', {
    title: 'About page',
  })	
}



//exports.about = function (req, res) {}
//exports.courses = function (req, res) {}
//exports.teachers = function (req, res) {}