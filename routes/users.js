var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  let str = 'select * from gtasks'
  let result = QuerySql(str)
  res.send('数据查询结果', result);
});

module.exports = router;
