/**
 * NavigationNode Schema
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NavigationNodeSchema = new Schema({
  title: String,
  url: String,
  children: [NavigationNodeSchema],
  visible: Boolean,
  anonymousAccess: Boolean
});

var NavigationNode = mongoose.model('NavigationNode', NavigationNodeSchema);

module.exports = NavigationNode;
