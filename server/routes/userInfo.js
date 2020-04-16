const router = require('koa-router')();
const sqlFn = require('../mysql');
const auth = require('../middlewares/auth');

// 查看用户信息
router.post('/userInfo',  async (ctx) => {
	const { id } = ctx.request.body;
	const sql = 'select * from user where `id`=?';
	const results = await sqlFn(sql, id);

	if (results) {
		ctx.body = results;
	} else {
		ctx.throw(401, '用户未找到');
	}
});

// 上传用户头像
router.post('/userAvatar', auth, async (ctx) => {
	const { id, avatar } = ctx.request.body;
	const sql = 'UPDATE user SET avatar=? WHERE id=?;';
	const arr = [avatar, id];
	const results = await sqlFn(sql, arr);

	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(400, '修改失败');
	}
});

module.exports = router;
