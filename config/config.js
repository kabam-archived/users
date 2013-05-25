var path = require('path')
  , rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/mywebclass_dev',
    root: rootPath,
    app: {
      name: 'MyWebClass Development Version'
    },
    google: {
      realm: 'http://node.mywebclass.org',
      callbackURL: 'http://node.mywebclass.org/auth/google/return'
    }
  },

  test: {
    db: 'mongodb://localhost/mywebclass_test',
    root: rootPath,
    app: {
      name: 'MyWebClass Testing Version'
    },
    google: {
      realm: 'http://node.mywebclass.org',
      callbackURL: 'http://node.mywebclass.org/auth/google/return'
    }
  },

  production: {
    db: 'mongodb://localhost/mywebclass',
    root: rootPath,
    app: {
      name: 'MyWebClass'
    },
    google: {
      realm: 'http://node.mywebclass.org',
      callbackURL: 'http://node.mywebclass.org/auth/google/return'
    }
  }
};
