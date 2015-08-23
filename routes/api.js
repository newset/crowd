var request = require('request'),
    crypto = require('crypto'),
    config = require('../config/config.js');

module.exports = function(app) {
    app.get('/api', function(req, res, next) {
        res.render('api', {
            _setting: {
                login: req.session.login,
                uid: req.session.uid,
                role: req.session.role,
                username: req.session.username,
                balance: req.session.balance
            }
        });
    });

    app.post('/api', function(req, res, next) {
        var form = {}
        form.payload = req.body;
        secret = '1234567890QWERTY';
        // 加密

        function sign(string, secret){
        	return crypto.createHmac('sha1', config.crowd.secret).update(string).digest('hex');
        }

        function sendConversion(body, payload, cb) {
        	payload.job_title = 'The title of the last job they completed - '+ body;
        	payload.conversion_id = body;

        	request.post({
        		url : 'http://localhost:3000/confirm', 
        		'form' : {
        			'payload' : payload,
        			'signature' : sign(JSON.stringify(payload))
        		}
        	},
        	function(err, httpRes, body) {
	        	if (cb) {
	        		cb();
	        	};
            });
        }

        var hash = sign(JSON.stringify(form.payload));
        form.signature = hash;

        request.post({url : 'http://localhost:3000/complete', 'form' : form}, 
        function(err, httpRes, body) {
        	if (httpRes.statusCode == 200) {
                sendConversion(body, form.payload, function(){
                	res.send('ok');
                });
        	};
        });
    });
}
