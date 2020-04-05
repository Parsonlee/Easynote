const router = require('koa-router')();
const isEmpty = require('lodash/isEmpty');
const validator = require('validator');
const sqlFn = require('../mysql');

const validateInput = (data) => {
	let errors = {};
	if (validator.isEmpty(data.username)) {
		errors.username = '请填写用户名';
	}
	if (validator.isEmpty(data.password)) {
		errors.password = '请填写密码';
	}
	if (validator.isEmpty(data.passwordConfirm)) {
		errors.passwordConfirm = '请确认密码';
	}
	if (!validator.equals(data.password, data.passwordConfirm)) {
		errors.passwordConfirm = '两次密码不相同';
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};

// 注册
router.post('/users', async (ctx) => {
	const data = ctx.request.body;
	// 设置默认头像的base64编码
	const avatar =
		'data:image/jpeg;base64,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';
	// 接受数据库语句
	const sql =
		'INSERT INTO user (username, password, password_digest, avatar) VALUES (?,?,?,?)';
	const arr = [data.username, data.password, data.passwordConfirm, avatar];
	const { errors, isValid } = validateInput(data);

	if (isValid) {
		let results = await sqlFn(sql, arr);
		if (results.affectedRows) {
			ctx.body = 'success';
		} else {
			ctx.throw(400, '注册失败');
		}
	} else {
		ctx.throw(400, JSON.stringify(errors));
	}
});

// 验证用户名是否已存在
router.get('/users/:username', async (ctx) => {
	const sql = 'select * from user where `username`=?';
	const arr = [ctx.params.username];
	const results = await sqlFn(sql, arr);

	if (results) {
		ctx.body = results;
	} else {
		ctx.body = {};
	}
});

module.exports = router;
