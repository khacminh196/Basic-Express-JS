var md5 = require('md5');

var db = require('../db.js');

module.exports.login = (req, res) => {
	res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
	var email = req.body.email;
	var password = md5(req.body.password);

	var user = db.get('users').find({ email : email }).value();
	if(!user) {
		res.render('auth/login', {
			errors : ["User does not exist !"],
			values : user
		});
		return;
	};

	if(user.password !== password) {
		res.render('auth/login', {
			errors : ["Wrong password !"],
			values : user
		});
		return;
	}

	res.cookie('userId', user.id, {
		signed : true
	});

	res.redirect('/users');
};