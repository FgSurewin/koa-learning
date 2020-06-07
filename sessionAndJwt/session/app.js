const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');
const session = require('koa-session');
const app = new Koa();
const route = new Router();

const config = {
	key: 'SESSION_ID',
	maxAge: 10 * 1000,
};

app.use(views(path.join(__dirname, 'views'), { map: { html: 'nunjucks' } }));
app.use(session(config, app));
app.keys = ['admin'];
route
	.get('/', async (ctx, next) => {
		await ctx.render('index', {
			videoAddress: '/video',
			loginAddress: '/login',
		});
	})
	.get('/video', async (ctx, next) => {
		let hasSession = ctx.session.user_id ? true : false;
		await ctx.render('video', {
			isLogin: hasSession,
		});
	})
	.get('/login', async (ctx, next) => {
		ctx.session = {
			user_id: Math.ceil(Math.random() * 10),
			count: 0,
		};
		ctx.redirect('/');
	})
	.get('/checkSession', async (ctx, next) => {
		if (ctx.session.user_id) {
			let { count, user_id } = ctx.session;
			ctx.body = {
				user_id,
				count: ++count,
			};
		} else {
			ctx.body = "You don't have any session here";
		}
	});

app.use(route.routes()).use(route.allowedMethods());
app.listen(3000, () => {
	console.log('Server is running...');
});
