const route = require('koa-router')();

route
	.get('/', (ctx, next) => {
		ctx.body = 'This is home page';
	})
	.get('/video', (ctx, next) => {
		ctx.body = 'This is video page';
	});

module.exports = route;
