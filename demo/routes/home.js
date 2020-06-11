const Router = require('koa-router');
const route = new Router();

route.get('/home', async (ctx, next) => {
	await ctx.render('home');
});

module.exports = route;
