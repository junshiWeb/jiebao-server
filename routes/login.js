var express = require('express');
var router = express.Router();

// var QuerySql = require('../common/querySql')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('登录')
});

router.get('/user', (req, res, next) => {
  req.session.username = 'xiaoxiao'
  console.log(req.session);
  res.send('登录成功+<form action>')
})

router.get('/home', (req, res, next) => {
  console.log(req.session);
  if (req.session.username) {
    res.send('已登录，显示首页信息')
  } else {
    res.send('未登录，请先登录')
  }
})

module.exports = router;
