var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/mywebclass_dev',
    root: rootPath,
    app: {
      name: 'MyWebClass Development Version'
    }
  },

  test: {
    db: 'mongodb://localhost/mywebclass_test',
    root: rootPath,
    app: {
      name: 'MyWebClass Testing Version'
    }
  },

  production: {
    db: 'mongodb://localhost/mywebclass',
    root: rootPath,
    app: {
      name: 'MyWebClass'
    }
  }
};
