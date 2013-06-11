/**
 * Initialize Data
 */
var mongoose = require('mongoose'),
    Application = mongoose.model('Application'),
    NavigationNode = mongoose.model('NavigationNode'),
    Service = mongoose.model('Service'),
    config = require('yaml-config').readConfig(__dirname + '/../config/config.yml');

Application.findOne({name: config.app.name}, function (err, application) {
  if (err) {
    throw new Error(err);
  }
  if (application === null) {
    application = new Application({
      name: config.app.name,
      url: config.app.url,
      slogan: '',
      logoUrl: '',
      description: '',
      copyright: 'Copyright 2013 Webizly'
    });
    application.save();
  }
});

// Home
NavigationNode.findOne({ title: 'Home' }, function (err, nav) {
  if (err) {
    throw new Error(err);
  }
  if (nav === null) {
    nav = new NavigationNode({
      title: 'Home',
      url: '/',
      children: [],
      visible: true,
      anonymousAccess: true
    });
    nav.save();
  }
});

// Sign In
NavigationNode.findOne({ title: 'Sign In' }, function (err, nav) {
  if (err) {
    throw new Error(err);
  }
  if (nav === null) {
    nav = new NavigationNode({
      title: 'Sign In',
      url: '/signin',
      children: [],
      visible: true,
      anonymousAccess: true
    });
    nav.save();
  }
});

// Sign Up
NavigationNode.findOne({ title: 'Sign Up' }, function (err, nav) {
  if (err) {
    throw new Error(err);
  }
  if (nav === null) {
    nav = new NavigationNode({
      title: 'Sign Up',
      url: '/signup',
      children: [],
      visible: true,
      anonymousAccess: true
    });
    nav.save();
  }
});

/**
 * Default Services
 */
// SMTP Email
Service.findOne({ code: 'smtp' }, function (err, service) {
  if (err) {
    throw new Error(err);
  }
  if (service === null) {
    service = new Service({
      code: 'smtp',
      serviceName: 'Email',
      realm: config.smtp.service,
      username: config.smtp.user,
      key: null,
      secret: config.smtp.pass,
      callbackURL: null,
      active: true
    });
    service.save();
  }
});

// Google+ Account
Service.findOne({ code: 'google' }, function (err, service) {
  if (err) {
    throw new Error(err);
  }
  if (service === null) {
    service = new Service({
      code: 'google',
      serviceName: 'Google+',
      realm: config.google.realm,
      username: null,
      key: null,
      secret: null,
      callbackURL: config.google.callbackURL,
      active: true
    });
    service.save();
  }
});
