/**
 * Service Schema
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  code: String,
  serviceName: String,
  realm: String,
  username: String,
  key: String,
  secret: String,
  callbackURL: String,
  active: Boolean
});

var Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
