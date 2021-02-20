var express = require('express');
var tasksRouter = require('./tasks');
express().use('/tasks', tasksRouter)
var router = express.Router();

var QuerySql = require('../module/querySql')

/* GET users listing. */
router.get('/', function (req, res, next) {
  // let str = 'select * from gtasks'
  // let result = QuerySql(str)
  // res.send('数据查询结果', result);
  // console.log(req.session);
  if (req.session.username) {
    res.send('manage首页内容')
  } else {
    res.send('未登录，请先登录')
  }
  // res.send(`首页：${req.session.username}`)
});

module.exports = router;
