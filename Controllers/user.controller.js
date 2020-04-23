var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res) => {
	res.render('users/index', {
		users : db.get('users').value()
	});
}

module.exports.create = (req, res) => {
	res.render('users/create');
}

module.exports.postCreate = (req, res) => {
	var newUser = req.body;
	newUser.id = shortid.generate();
	
	db.get('users').push(newUser).write();
	res.redirect('/users');
}