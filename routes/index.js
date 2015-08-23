var admin = require('./admin.js'),
	users = require('./users.js'),
	api = require('./api.js'),
	config = require('../config/config.js'),
	User = require('../models/User.js');
	Conversion = require('../models/Conversion.js');

var CryptoJS = require('crypto-js'); 
var crypto = require('crypto'); 

module.exports = function(app){
	
	/* GET home page. */
	app.get('/', function(req, res, next){
	    res.render('index', { 
	        title: 'CrowdFlower Tasks', 
	        _setting : {
	            login : req.session.login,
	            uid : req.session.uid,
	            role : req.session.role,
	            username : req.session.username,
	            balance : req.session.balance
	        }   
	    });
	});

	app.post('/login', function(req, res, next) {
		function login(user, admin) {
			var hour = 3600000
			req.session.cookie.expires = new Date(Date.now() + hour)
			req.session.cookie.maxAge = hour;

			req.session.role = admin ? 'admin' : 'user';
			req.session.login = true;
			req.session.uid = user.id;
			req.session.username = user.username;
			req.session.balance = user.balance;
		}

		var load = req.body,
			obj = {status : 200};

		if (load.isAdmin) {
			if (load.username == 'admin' && load.password == '123456') {
				load.id = obj.id = 0;
				login(load, load.isAdmin);
				res.json(obj);
			};
		}else{
			// query database
			var user = User.findOne({username : load.username, password : load.password}, function(e, r){
				if (r) {
					load.id = obj.id = r._id;
					load.balance = r.balance;
					login(load, load.isAdmin);
					res.json(obj);
				}else{
					res.status(400).send({
						status : 400,
						data : load
					})
				};
			});
		};
	});

	app.get('/logout', function(req, res, next){
		req.session.destroy();
		res.redirect('/');
	});

	app.post('/complete', function(req, res, next){
		var body = req.body,
			payload = body.payload;

		console.log('body', body);

		payload.amount = parseInt(payload.amount);
		payload.adjusted_amount = parseFloat(payload.adjusted_amount);

		var	string = JSON.stringify(payload);

		var key = config.crowd.secret;  
		var sign = CryptoJS.HmacSHA1(string, key).toString(); 
		
		if (sign == body.signature) {
			// create conversion
			var con = new Conversion(payload);
			con.save(function(err, item){
				res.status(200).send(item.id);
			});
		}else{
			res.status(403).send('signature error');
		};

	});

	app.post('/confirm', function(req, res, next){
		var body = req.body,
			payload = body.payload,
			id = payload.conversion_id;

		payload.amount = parseInt(payload.amount);
		payload.adjusted_amount = parseFloat(payload.adjusted_amount);

		var string = JSON.stringify(payload),
			sign = CryptoJS.HmacSHA1(string, config.crowd.secret).toString(); 

		if (sign == body.signature) {
			Conversion.findOne({_id : payload.conversion_id}, function(err, con){
				if (err) return ;
				con.job_title = payload.job_title;
				con.save();
			});

			// 更新 balance
			User.findOne({_id : payload.uid}, function(err, user){
				if (err) return ;
				user.balance += payload.adjusted_amount;
				user.save();
			});

			res.status(200).send('ok');
		}else{
			res.status(403).send('signature error');
		};
	})

	//  其他路由
	admin(app);
	users(app);
	api(app);
}


