const router = require('koa-router')();
const sqlFn = require('../mysql');

router.get('/userInfo', async (ctx) => {
	ctx.body = new Date();
});

router.post('/userInfo', async (ctx) => {
	const { id } = ctx.request.body;
	const sql = 'select * from user where `id`=?';
	const results = await sqlFn(sql, id);

	if (results) {
		ctx.body = results;
	} else {
		ctx.throw(401, '用户未找到');
	}
});

module.exports = router;
