/**
 * User Schema
 **/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    moment = require('moment'),
    config = require('yaml-config').readConfig(__dirname + '/../config/config.yml');

var UserSchema = new Schema({
  active: Boolean,
  activeDate: Date,
  accounts: [{
    provider: String,
    id: String,
    displayName: String,
    name: {
      familyName: String,
      givenName: String,
      middleName: String
    },
    emails: [{
      value: String,
      type: {type: String}
    }],
    phoneNumbers: [{
      value: String,
      type: {type: String}
    }],
    photos: [{ value: String }]
  }],
  confirmation: {
    string: String,
    date: Date
  }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.index({ username: 1 });

UserSchema.methods.generateConfirmationLink = function (callback) {
  var rand = require('generate-key');
  this.confirmation.string = rand.generateKey();
  this.confirmation.date = new Date();
  this.save(callback);
};

UserSchema.methods.activateUser = function (confirmationString, callback) {
  var err;
  if (typeof confirmationString !== 'undefined') {
    if (confirmationString !== this.confirmation.string) {
      err = new Error('Confirmation Strings don\'t match');
      callback(err);
    }
    var originalDate = moment(this.confirmation.date),
        now = moment(),
        expired = (typeof config.confirmationLinkExpire === 'undefined') ? 1 : config.confirmationLinkExpire;

    if (now.isAfter(originalDate.add('hours', expired))) {
      err = new Error('The link has expired.');
      callback(err);
    }
  }
  this.confirmation = null;
  this.activeDate = new Date();
  this.active = true;
  this.save(callback);
};

module.exports = mongoose.model('User', UserSchema);
