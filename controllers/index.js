var getJSON = require('../lib/getJSON.js').getJSON;

module.exports.set = function(app) {
	app.get('/', function(req, res, next) {
		var options = {
		    host: 'trewgear.hubsoft.ws',
		    port: 443,
		    path: '/api/v1/products',
		    method: 'GET',
		    headers: {
		        'Content-Type': 'application/json'
		    }
		};
		getJSON(options,function(statusCode, result){
			res.render('index', {
				title : 'New Project',
				description : "Ambition",
				data : result
			});	
		});
	});
	app.get(/-detail$/, function(req, res) {
		var pathname = require("url").parse(req.url).pathname;
		var options = {
		    host: 'trewgear.hubsoft.ws',
		    port: 443,
		    path: '/api/v1/products?productURL=' + pathname,
		    method: 'GET',
		    headers: {
		        'Content-Type': 'application/json'
		    }
		};
		getJSON(options,function(statusCode, result) {
			var product = result.product;
			options.path = '/api/v1/productColors?productUID=' + product.productUID;
			getJSON(options,function(statusCode, result) {
				res.render('detail', {
					title : product.productName,
					description : product.descriptions[0],
					product : product,
					colors : result
				});	
			});
		});	
	});
	app.post('/email', function (req, res) {
		var email = require('../lib/email.js');
		email.send({
		    from: process.env.EMAIL_FROM,
		    to: "yoogene50@gmail.com",
		    subject: req.body.subject, 
		    html: req.body.html
		}, function(data) {
			res.json(data);
		});
	});
	// 404
	app.use(function(req, res, next){
	  res.status(404);

	  // respond with html page
	  if (req.accepts('html')) {
	    res.render('404', {
			title : '404',
			description: 'The page you requested could not be found'
		});
	    return;
	  }

	  // respond with json
	  if (req.accepts('json')) {
	    res.send({ error: 'Not found' });
	    return;
	  }

	  // default to plain-text. send()
	  res.type('txt').send('Not found');
	});
};