const Koa = require('koa');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const PORT = process.env.PORT || 4000;
const address = path.join(path.dirname(__dirname), './static');
console.log(address);
app.use(static(address));
// app.use(async (ctx, next) => {
// 	const device = ctx.header['user-agent'].toLowerCase();
// 	const reg = /(iphone|ipad|android)/g;
// 	console.log(reg.test(device));
// 	ctx.body = 'hello, world';
// });

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}...`);
});
