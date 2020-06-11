const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');
const parser = require('koa-bodyparser');
const path = require('path');

// 常量
const PORT = process.env.PROT || 3002;

// 项目初始化和设置路由
const app = new Koa();
const route = new Router();

// 引入中间件
app.use(views(path.join(__dirname, 'views'), { map: { html: 'nunjucks' } }));
app.use(static(path.join(__dirname, 'static')));
app.use(parser());

// 引入各种路由
// 引入home主页路由
const home = require('./routes/home');
// 引入API理由
const data = require('./routes/data');
// 合并到父级路由
route.use(home.routes(), home.allowedMethods());
route.use('/api', data.routes(), data.allowedMethods());

app.use(route.routes()).use(route.allowedMethods());

// 运行项目:
// 主页: localhost:3002/home
// 展示页: localhost:3002/api/show
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
