const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3100, () => {
	console.log('server is running in 3100');
});
