const router = require('express').Router();
const restaurantMongoController = require('./restaurantMongoController');

/*****************************************
*******     Restaurant API's      ********
*****************************************/

// Adding a new restaurant
router.post('/addrestro', function(req, res) {
	try {
		restaurantMongoController.addRestaurant(req.body, function(result) {
			res.send(result);
		}, function(err) {
			res.status(500).json({error: 'Cannot add restaurant in db...!'});
		})
	} catch(err) {
		res.status(500).json({
      error: 'Internal error occurred, please report...!'
    });
	}
})

// Show all restaurants
router.get('/restros', function(req, res) {
	try {
		restaurantMongoController.getRestaurants(function(result) {
			res.send(result);
		}, function(err) {
			res.status(500).json({error: 'Cannot find restaurants in db...!'});
		})
	} catch(err) {
		res.status(500).json({
      error: 'Internal error occurred, please report...!'
    });
	}
})

// Edit restaurant
router.post('/editrestro', function(req, res) {
	try {
		restaurantMongoController.editRestaurant(req.body, function(result) {
			res.send(result);
		}, function(err) {
			res.status(500).json({error: 'Cannot remove restaurant in db...!'});
		})
	} catch(err) {
		res.status(500).json({
      error: 'Internal error occurred, please report...!'
    });
	}
})

// Removing a restaurant
router.delete('/removerestro', function(req, res) {
	try {
		restaurantMongoController.removeRestaurant(req.body, function(result) {
			res.send(result);
		}, function(err) {
			res.status(500).json({error: 'Cannot remove restaurant in db...!'});
		})
	} catch(err) {
		res.status(500).json({
      error: 'Internal error occurred, please report...!'
    });
	}
})

// Adding a table to restaurant
router.post('/addtable', function(req, res) {
	res.send('API Hit');
})

// Removing a table to restaurant
router.delete('/removetable', function(req, res) {
	res.send('API Hit');
})

// Update capacity/availability for table
router.post('/updatetable', function(req, res) {
	res.send('API Hit');
})




module.exports = router;
