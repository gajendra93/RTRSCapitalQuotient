var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var restaurant = new Schema({
  name: { type: String, unique: true },
  location: { type: String },
  cuisines: [ { type: String } ],
  tables: [
  	{
  		capacity: { type: Number },
      total: { type: Number },
  		reserved: { type: Number }
  	}
  ],
  reviews: [
  	{
  		name: { type: String },
      rating: { type: Number },
  		review: { type: String }
  	}
  ]
});

module.exports = mongoose.model('Restaurant', restaurant);