const router = require('koa-router')();
const isEmpty = require('lodash/isEmpty');
const validator = require('validator');
const sqlFn = require('../mysql');

const validateInput = data => {
	let errors = {};
	if (validator.isEmpty(data.username)) {
		errors.username = '请填写用户名';
	}
	if (!validator.isEmail(data.email)) {
		errors.email = '请填写邮箱';
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
		isValid: isEmpty(errors)
	};
};

// 注册
router.post('/users', async ctx => {
	const data = ctx.request.body;
	// 接受数据库语句
	const sql =
		'INSERT INTO user (username, password, password_digest) VALUES (?,?,?)';
	const arr = [data.username, data.password, data.passwordConfirm];
	const { errors, isValid } = validateInput(data);

	if (isValid) {
		let results = await sqlFn(sql, arr);
		if (results.affectedRows) {
			ctx.body = 'success';
		} else {
			ctx.body = '注册失败';
			ctx.throw(400, '注册失败');
		}
	}else{
		ctx.throw(400, JSON.stringify(errors));
	}
});

// 验证用户名是否已存在
router.get('/users/:username', async ctx => {
	const sql = 'select * from users where `username`=?';
	const arr = [ctx.params.username];
	ctx.body = 'success';
	const results = await sqlFn(sql, arr);
	if (results) {
		ctx.body = results;
	} else {
		ctx.body = {};
	}
});

module.exports = router;