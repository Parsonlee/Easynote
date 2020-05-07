const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const note = require('./routes/note');
const todo = require('./routes/todo');
const login = require('./routes/login');
const register = require('./routes/register');
const userInfo = require('./routes/userInfo');

// error handler
onerror(app);

// middlewares
app.use(cors());
app.use( bodyparser({ formLimit: '5mb', jsonLimit: '5mb', textLimit: '5mb', }) );
app.use( bodyparser({ enableTypes: ['json', 'form', 'text'], }) );
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
	views(__dirname + '/views', {
		extension: 'pug',
	})
);

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(router.routes()).use(router.allowedMethods());
router.use('/api', note.routes());
router.use('/api', todo.routes());
router.use('/api', login.routes());
router.use('/api', register.routes());
router.use('/api', userInfo.routes());

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx);
});

module.exports = app;
