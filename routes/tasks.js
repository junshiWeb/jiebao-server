var express = require('express');
var router = express.Router();
var QuerySql = require('../module/querySql')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('tasks')
});
// 请求查询数据

router.get('/gtasks/select', async (req, res, next) => {
  let sqlStrCount = 'select count(*) as num from gtasks'
  let sqlStr = `select * from gtasks where 
  billno_name like ? and 
  billno like ? and create_time like ?
  `
  let countRes = await QuerySql(sqlStrCount)
  let dataRes = await QuerySql(sqlStr, ['%部门%', '%1%', '%%'])
  console.log(dataRes);
  let obj = {
    stetus: 200,
    count: countRes[0].num,
    data: dataRes
  }
  res.json(obj)
})

// 当前页数据
router.get('/gtasks', async (req, res, next) => {
  let limit = [parseInt(req.query.offset), parseInt(req.query.limit)]
  let sqlStr = 'select * from gtasks limit ?,?'
  let result = await QuerySql(sqlStr, limit)
  res.send(result)
})
// 待办总数
router.get('/gtasks/count', async (req, res, next) => {
  let sqlStr = 'select count(*) as num from gtasks'
  let result = await QuerySql(sqlStr)
  res.send(result)
})


module.exports = router;
