var db = require('../db.js');

module.exports = (req, res, next) => {
	// Kiểm tra xem có người dùng đăng nhập không
	if(!req.cookies.userId) {
		res.redirect('auth/login');
		return;
	}

	var user = db.get('users').find({ id : req.cookies.userId }).value();
	// Kiểm tra có phải người dùng thật không
	if(!user) {
		res.redirect('auth/login');
		return;
	}

	next();
};