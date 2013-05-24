var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , passportLocalMongoose = require('passport-local-mongoose');

/**
 * User Schema
 **/

var UserSchema = new Schema({
  fullName: String,
  email: String
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
