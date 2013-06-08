/**
 * Core Application Schema definitions
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Application Schema
 */
var ApplicationSchema = new Schema({
  name: String,
  url: String,
  slogan: String,
  logoUrl: String,
  description: String,
  copyright: String
});

var Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
