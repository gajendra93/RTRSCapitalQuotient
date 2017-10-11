const router = require('express').Router();
const customerMongoController = require('./customerMongoController');

/*****************************************
*******      Customer API's       ********
*****************************************/

// Search restaurants by name/location/cuisines
router.get('/searchrestro', function(req, res) {
	res.send('API Hit');
})

// Search table by capacity for a given restaurant
router.get('/searchtable', function(req, res) {
	res.send('API Hit');
})

// Book a table
router.post('/booktable', function(req, res) {
	res.send('API Hit');
})

// Cancel reservation
router.post('/canceltable', function(req, res) {
	res.send('API Hit');
})

// Write a review
router.post('/review', function(req, res) {
	res.send('API Hit');
})

module.exports = router;
