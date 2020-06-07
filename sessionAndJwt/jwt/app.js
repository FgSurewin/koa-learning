const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new Koa();
const route = new Router();

//  Set secret key
const secretKey = 'secret';

//  Mock data
const user = {
	email: 'jacky@yahoo.com',
	password: '123456',
};

// Import middleware
const verifyToken = require('./middleware/verifyToken');

route
	.get('/', async (ctx, next) => {
		ctx.body = 'hello world';
	})
	.get('/video', verifyToken, async (ctx, next) => {
		const authToken = ctx.token;
		jwt.verify(authToken, secretKey, (err, token) => {
			if (err) throw err;
			ctx.body = {
				message: 'This is video content',
				token,
			};
		});
	})
	.get('/getToken', async (ctx, next) => {
		jwt.sign(user, secretKey, (err, token) => {
			if (err) throw err;
			ctx.body = {
				token,
			};
		});
	});

app.use(route.routes()).use(route.allowedMethods());

app.listen(5001, () => console.log('Server is running ...'));
