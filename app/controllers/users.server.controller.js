var User = require('mongoose').model('User'),
passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
			break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
			}
	}
	return message;
};
exports.signup = function(req, res, next) {
	if (!req.user) {
		// console.log(req.body);
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				console.log(req);
				return res.redirect('/signup');
			}
		req.login(user, function(err) {
			if (err) return next(err);
				return res.redirect('/tree');
		});
	});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
    	return res.status(401).send({
      		message: 'User is not logged in'
		});
	}
	next();
};