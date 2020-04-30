const router = require('koa-router')();
const sqlFn = require('../mysql');

// 查询待办
router.post('/todo', async (ctx) => {
	const { userId } = ctx.request.body;
	const sql = 'SELECT * FROM todo WHERE userId=?';

	const results = await sqlFn(sql, userId);
	if (results) {
		ctx.body = results;
	} else {
		ctx.throw(401, '未找到数据');
	}
});

// 增加待办篇章
router.post('/newtodo', async (ctx) => {
	const { userId } = ctx.request.body;
	const sql = 'INSERT INTO todo (userId) VALUES (?)';
	const results = await sqlFn(sql, userId);

	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '新建失败');
	}
});

// 修改待办标题
router.post('/updatetodotitle', async (ctx) => {
	const data = ctx.request.body;
	const sql = 'UPDATE todo SET title=? WHERE userId=? AND id=?';
	const arr = [data.title, data.userId, data.id];
	const results = await sqlFn(sql, arr);

	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '修改失败');
	}
});

// 修改待办内容
router.post('/updatetodocontent', async (ctx) => {
	const data = ctx.request.body;
	const sql = 'UPDATE todo SET content=?, finished=? WHERE userId=? AND id=?';
	const arr = [data.content, data.finished, data.userId, data.id];
	const results = await sqlFn(sql, arr);

	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '修改失败');
	}
});

// 删除待办
router.post('/deletetodo', async (ctx) => {
	const data = ctx.request.body;
	const sql = 'DELETE FROM todo WHERE userId=? AND id=?';
	const arr = [data.userId, data.id];
	const results = await sqlFn(sql, arr);
	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '删除失败');
	}
});

module.exports = router;
