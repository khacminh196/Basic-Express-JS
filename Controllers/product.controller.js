var db = require('../db.js');
var shortid = require('shortid');

var products = db.get('products').value();

module.exports.index = (req, res) => {
	var page = parseInt(req.query.page) || 1;		// n
	var perPage = 8;								// x
	var start = (page-1)*perPage; 				// (n-1)*x
	var end = page*perPage;						// n*x
	var numberPage = Math.ceil(products.length/perPage);

	var pageMax = page + 2;
	if(pageMax > numberPage) {
		pageMax = page;
	}

	var results = products.slice(start, end);

	res.render('products/index', {
		products : results,
		number : page
	});
}

module.exports.search = (req, res) => {
	var query = req.query.q;
	var result = products.filter((product) => {
		return products.name.indexOf(query) !== -1;
	});

	res.render('products', {
		products : result
	});
}

module.exports.create = (req, res) => {
	res.render('products/create');
}

module.exports.postCreate = (req, res) => {
	var newProduct = req.body;
	newProduct.id = shortid.generate();
	db.get('products').push(newProduct).write();

	res.redirect('/products');
}

module.exports.delete = (req, res) => {
	var id = req.params.id;
	db.get('products').remove({ id : id }).write();

	res.redirect('/products');
}

module.exports.view = (req, res) => {
	var id = req.params.id;
	res.render('products/view', {
		product : db.get('products').find({ id : id }).value()
	});
}