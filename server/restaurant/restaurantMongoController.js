const RestaurantModel = require('../../models/restaurant.js');

let addRestaurant = function(restroObj, successCB, errorCB) {
	let saveRestro = new RestaurantModel(restroObj);
	saveRestro.save(function(err, result) {
		if(err) {
			errorCB(err);
		}
		else {
			successCB(result);
		}
	});
}

let getRestaurants = function (successCB, errorCB) {
	RestaurantModel.find(function (err, result) {
		if (err) {
			errorCB(err);
		}
		successCB(result);
	});
}

let removeRestaurant = function(restro, successCB, errorCB) {
	RestaurantModel.remove(restro, function(err, result) {
		if(err) {
			errorCB(err);
		}
		else {
			successCB(result);
		}
	});
}

module.exports = {
	addRestaurant: addRestaurant,
	getRestaurants: getRestaurants,
	removeRestaurant: removeRestaurant
}
