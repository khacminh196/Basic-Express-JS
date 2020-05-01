var md5 = require('md5');

var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res) => {
	console.log(res.locals.user);
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
	newUser.password = md5(newUser.password);
	newUser.avatar = req.file.path.split('\\').slice(1).join('\\');      // Dường dẫn đến file ảnh vừa xử lý

	db.get('users').push(newUser).write();
	res.redirect('/users');
}

module.exports.view = (req, res) => {
	var id = req.params.id;
	console.log(id);
	res.render('users/view', {
		user : db.get('users').find({ id : id }).value()
	});
};

module.exports.search =(req, res) => {
	var query = req.query.q;
	var users = db.get('users').value();
	var result = users.filter((user) => {
		return user.name.indexOf(query) !== -1;
	});

	res.render('users', {
		users : result,
		qSearch : query
	});
};