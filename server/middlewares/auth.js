const { jwtSecret } = require('../config');
const jsonwebtoken = require('jsonwebtoken');

const auth = async (ctx, next) => {
	const { authorization = '' } = ctx.request.header; 

	const token = authorization.replace('Bearer ', '');

	try {
		const user = jsonwebtoken.verify(token, jwtSecret);
		ctx.state.user = user;
	} catch (err) {
		ctx.throw(401, '没有权限');
	}

	await next();
};

module.exports = auth;
