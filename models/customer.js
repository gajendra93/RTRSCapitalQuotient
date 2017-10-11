var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customer = new Schema({
  name: {type: String},
  mobile: {type: Number},
  email: {type: String},
});

module.exports = mongoose.model('Customer', customer);