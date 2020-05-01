var db = require('../db.js');

module.exports.addToCart = (req, res) => {
	var idProduct = req.params.idProduct;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId) {
		res.redirect('/products');
		return;
	}
	
	var count = db.get('sessions')
		.find({ id : sessionId })
		.get('cart.' + idProduct, 0)
		.value()

	db.get('sessions')
		.find({ id : sessionId })
		.set('cart.' + idProduct, count + 1)
		.write();

	res.redirect('/products');
}

module.exports.viewCart = (req, res) => {
	var cart = res.locals.cart;
	res.render('cart/index', {
		mycart : cart
	});
}