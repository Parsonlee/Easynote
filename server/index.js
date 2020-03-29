const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');

const note = require('./routes/note');
const todo = require('./routes/todo');
const login = require('./routes/login');
const register = require('./routes/register');

const app = new Koa();
app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

router.use('/api', note.routes());
router.use('/api', todo.routes());
router.use('/api', login.routes());
router.use('/api', register.routes());

app.listen(3100, () => {
	console.log('server is running in 3100');
});
