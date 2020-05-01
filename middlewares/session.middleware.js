var db = require('../db.js');
var shortid = require('shortid');

module.exports = (req, res, next) => {
	var sessionId = shortid.generate();

	if(!req.signedCookies.sessionId) {
		res.cookie('sessionId', sessionId, {
			signed : true
		});
		db.get('sessions').push({ id : sessionId }).write();
	}
	
	var cart = db.get('sessions').find({ id : req.signedCookies.sessionId }).get('cart').value();
	res.locals.cart = cart;

	var x = 0;
	for(var i in cart) {
		x += cart[i];
	}

	res.locals.cartNumber = x;

	next();
}