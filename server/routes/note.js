const router = require('koa-router')();
const sqlFn = require('../mysql');

router.post('/note', async ctx=>{
  const sql = '';
  const arr = [];

  const results = await sqlFn(sql, arr);
  ctx.body = '';
})

module.exports = router;