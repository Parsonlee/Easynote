const router = require('koa-router')();
const sqlFn = require('../mysql');
const { jwtSecret } = require('../config');
const jsonwebtoken = require('jsonwebtoken');
const auth = require('../middlewares/auth')

// 查询现有的笔记
router.post('/note', auth, async (ctx) => {
	const { userId } = ctx.request.body;
	const sql = 'SELECT id,category,updateTime,content FROM note WHERE userId=?';
	const results = await sqlFn(sql, userId);
	if (results) {
		ctx.body = results;
	} else {
		ctx.throw(401, '未找到数据');
	}
});

// 增加笔记
router.post('/newnote', auth, async (ctx) => {
	const data = ctx.request.body;
	const sql = 'INSERT INTO note (userId) VALUES (?)';
	const arr = [data.userId, data.content];
	const results = await sqlFn(sql, arr);
	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '新建失败');
	}
});

// 修改笔记
router.post('/updatenote', auth, async (ctx) => {
	const data = ctx.request.body;
	const sql = 'UPDATE note SET content=? WHERE userId=? AND id=?';
	const arr = [data.content, data.userId, data.id];
	const results = await sqlFn(sql, arr);
	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '修改失败');
	}
});

// 删除笔记
router.post('/deletenote', auth, async (ctx) => {
	const data = ctx.request.body;
	const sql = 'DELETE FROM note WHERE userId=? AND id=?';
	const arr = [data.userId, data.id];
	const results = await sqlFn(sql, arr);
	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '删除失败');
	}
});

module.exports = router;
