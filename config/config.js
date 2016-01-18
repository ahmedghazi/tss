var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tss'
    },
    port: 3000,
    db: 'mongodb://localhost/tss-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tss'
    },
    port: 3000,
    db: 'mongodb://localhost/tss-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tss'
    },
    port: 3000,
    db: 'mongodb://localhost/tss-production'
  }
};

module.exports = config[env];
