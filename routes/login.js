var express = require('express');
var router = express.Router();

var QuerySql = require('../module/querySql')
var jiami = require('../module/jiami')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(`登录界面 username : ${req.session.username}`)
});
// 测试
router.get('/user', async (req, res, next) => {
  let sqlStr = 'select username,password from user where username= ? and password = ?'
  let username = req.query.username ? req.query.username.trim() : ''
  let password = req.query.password
  req.session.username = req.query.username
  console.log(req.session.username);
  let resUser = await QuerySql(sqlStr, [username, jiami(password)])
  if (resUser.length >= 1) {
    let obj = {
      state: '200',
      username: req.query.username
    }
    res.json(obj)
  } else {
    res.send('账号或密码错误')
  }
})
router.post('/user', (req, res) => {
  res.send('请求成功')
})
// 用户信息
router.get('/userinfo', async (req, res, next) => {
  console.log(req.session.username);
  res.send('用户信息')
})
// 退出登陆
router.get('/userout', async (req, res, next) => {
  req.session.username = ''
  console.log(req.session.username);
  res.send('退出成功')
})

module.exports = router;
