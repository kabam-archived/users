var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , passportLocalMongoose = require('passport-local-mongoose');

/**
 * User Schema
 **/

var UserSchema = new Schema({
  active: false,
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
      type: String
    }],
    photos: [{ value: String }]
  }]
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.index({ username: 1 });

module.exports = mongoose.model('User', UserSchema);
