var db = require('../db.js');

module.exports = (req, res, next) => {
	// Kiểm tra xem có người dùng đăng nhập không
	if(!req.signedCookies.userId) {
		res.redirect('auth/login');
		return;
	}

	var user = db.get('users').find({ id : req.signedCookies.userId }).value();
	// Kiểm tra có phải người dùng thật không
	if(!user) {
		res.redirect('auth/login');
		return;
	}

	res.locals.user = user;
	next();
};