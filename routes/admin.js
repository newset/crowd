module.exports = function(app){
	var User = require('../models/User');

	/* create users */
	app.route('/admin/create').post(function(req, res, next) {
		// saving
		User.findOne(req.body, function(e, r){
			var user = {};
			if (r) {
				user = r;
			}else{
				user = new User(req.body);
				user.save();
			};

			// user.password = undefined;
			res.send({
				'status' : 200,
				'user' : {
					_id : user._id,
					username : user.username,
					balance : user.balance
				}
			});
		}) 
	});

	app.route('/admin/test').get(function(req, res, next){
		res.json(req.session);
	})
}
