const Router = require('koa-router');
const route = new Router();
// 引入配置文件中的模拟数据
let db = require('../config/database');
let count = db.length;
route
	.get('/show', async (ctx, next) => {
		// 每一个点击触发的API最后都会跳转该页面从而实现刷新页面
		await ctx.render('list', {
			fruits: db,
		});
	})
	.get('/getAll', async (ctx, next) => {
		ctx.body = {
			db,
		};
	})
	.post('/push', async (ctx, next) => {
		count++;
		const queryData = ctx.request.body;
		db.push({ id: count, title: queryData.title });
		ctx.body = {
			db,
		};
		// ctx.redirect('/api/show');
	})
	.post('/update', async (ctx, next) => {
		const queryId = ctx.request.body.id;
		const queryData = ctx.request.body.title;
		db.forEach(
			(item) =>
				(item.title = item.id === Number(queryId) ? queryData : item.title)
		);
		// ctx.body = {
		// 	db,
		// 	queryId,
		// 	queryData,
		// };
		ctx.redirect('/api/show');
	})
	.delete('/delete/:id', async (ctx, next) => {
		const queryId = ctx.params.id;
		db = db.filter((item) => item.id !== Number(queryId));
		ctx.body = {
			db,
		};
		//ctx.redirect('/api/show');
	});

module.exports = route;
