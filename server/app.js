const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const route = new Router();

// const readFile = (address) =>
// 	new Promise((resolve, reject) => {
// 		fs.readFile(address, 'utf-8', (err, result) => {
// 			if (err) reject(new Error('This is a error...'));
// 			resolve(result);
// 		});
// 	}).catch((err) => err);

// Import routes
const home = require('../routes/home.js');
route.use('/api', home.routes(), home.allowedMethods());

app.use(route.routes()).use(route.allowedMethods());

app.listen(3000, () => console.log('Server is running...'));

/**
 * In this lesson, I try to query the data from a static file by using
 * the original "fs" module instead of third part library.
 */
