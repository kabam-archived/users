var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * User Schema
 **/

var UserSchema = new Schema({
  username: String,
  fullName: String,
  email: String,
  password: String
});

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
mongoose.model('User', UserSchema);
