var User = require('../models/User.js');
module.exports = function(app){
	/* GET users listing. */
	app.get('/user/:id', function(req, res, next) {
		// 获取信息
		User.findOne({_id : req.params.id}, function(req, user){
			res.send({
				status : 200,
				data : user
			});
		})
	});

	app.get('/users', function(req, res, next){
		User.find({}, function(err, users){
			res.send({
				status : 200,
				data : users
			});
		});
	});
}
