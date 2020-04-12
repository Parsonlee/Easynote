const router = require('koa-router')();
const sqlFn = require('../mysql');

// 查询现有的笔记
router.post('/note', async ctx => {
	const { userId }  = ctx.request.body;
	const sql = "SELECT contentId,category,updateTime,title,description,content FROM note WHERE userId=?";
	// const sql = "SELECT contentId,category,DATE_FORMAT(updateTime,'%Y-%m-%d %H:%i'),title,description,content FROM note WHERE userId=?";
	const results = await sqlFn(sql, userId);
	
	if(results){
		ctx.body = results;
	}else{
		ctx.throw(401, '未找到数据');
	}
});

// 增加笔记
router.post('/newnote', async ctx => {
	const data = ctx.request.body;
	const sql = 'INSERT INTO note (userId, content) VALUES (?,?)';
	const arr = [data.userId, data.content];
	const results = await sqlFn(sql, arr);

	if (results.affectedRows) {
		ctx.body = 'success';
	} else {
		ctx.throw(401, '新建失败');
	}
})

module.exports = router;
