import express from 'express';
import path from 'path';
import React from 'react';
import renderer from './../utils/renderer';
import logger from 'morgan';

import Loadable from 'react-loadable';

import session from 'express-session';

const ejs = require("ejs").__express;


const url = require('url');


const app = express();
app.disable('x-powered-by');



logger.token('remote-addr', function getRemoteAddress(req){
	let ip = req.ip;
	if (ip.substr(0, 0b111) === "::ffff:") {
  		 return ip.substr(7);
	}
	return ip;
});

logger.token('http_host', function getHttpHost(req){
	return req['headers'].host;
});



// noinspection SpellCheckingInspection
logger.token('realclfdate', function (req, res) {
    	// noinspection SpellCheckingInspection
	const clfmonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const pad2 = function (num) {
		const str = String(num);
		return (str.length === 1 ? '0' : '') + str;
	};
	const dateTime = new Date();
	const date = dateTime.getDate()	;
	const hour = dateTime.getHours();
	const mins = dateTime.getMinutes();
	const secs = dateTime.getSeconds();
	const year = dateTime.getFullYear();
	let timeZoneOffset = dateTime.getTimezoneOffset();
	const sign = timeZoneOffset > 0 ? '-' : '+';
	timeZoneOffset = parseInt(Math.abs(timeZoneOffset)/60);
	const month = clfmonth[dateTime.getUTCMonth()];

	return pad2(date) + '/' + month + '/' + year
	+ ':' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs)
	+ ' '+sign+pad2(timeZoneOffset)+'00';
});

//const loggerFormat = ':remote-addr [:realclfdate] :http_host :response-time ":method :url" :status :res[content-length] :referrer :user-agent :x-request-id :x-transaction-id :device-type';

//var logPath = "/var/log/node/logs/";

// app.use(logger(loggerFormat,
// 	{
// 	      stream: require('file-stream-rotator').getStream({
// 	      filename: path.join(logPath, 'access_%DATE%.log'),
// 	      frequency: 'daily',
// 	      verbose: false,
// 	      date_format: 'YYYYMMDD'
// 	    })
// 	}
// ));

app.use(session({
    secret: 'mnbvcxxxxzlkjhgfdsapoiuytrewq', // just a long random string
    resave: false,
    saveUninitialized: true
}));
app.use('/public/',express.static(path.resolve('public')));


app.set('view engine', 'ejs');
app.engine('.ejs', ejs);


app.get('/manifest.json', (req,res) => {
		res.sendFile(path.join(process.cwd(),'manifest.json'));
});

//var logPerformanceUrl = "/LogPerformance/logPerformace";
//let serverStartTime = '';


app.get('/', (req,res) => {
	res.render('index', renderer(req));
});



app.get('*',function(req,res,next){

	const err = new Error('Not Found');
  	err.status = 404;
  	res.locals.message = err.message;
  	res.locals.error = (process.env.NODE_ENV === 'development') ? err : {};
  	res.status(err.status || 500);
  	res.render('index', renderer(req,true));

 });




// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = (process.env.NODE_ENV === 'development') ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('index', renderer(req,'ErrPage'));


});

Loadable.preloadAll().then(() => {
    app.listen(9000, () => {
    console.log('Running on http://localhost:9000/');
  });
});