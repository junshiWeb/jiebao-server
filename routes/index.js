var express = require('express');
var router = express.Router();
var QuerySql = require('../module/querySql')
var jiami = require('../module/jiami')


function isLoginMid(req, res, next) {
  if (req.session.username == undefined) {
    res.send('未登录')
  } else {
    //一登录进入正常页面
    next()
  }
}
router.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");          //允许所有跨域请求
  res.header("Access-Control-Allow-Headers", "*");          //允许所有跨域请求
  next();
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('首页')
});
router.get('/user', async (req, res, next) => {
  if (req.session.username) {
    res.send('已登录，显示首页信息')
  } else {
    res.send('未登录，请先登录')
  }
});
// 登陆请求
router.post('/user', async (req, res, next) => {
  let sqlStr = 'select username,password from user where username= ? and password = ?'
  let username = req.body.user ? req.body.user.trim() : ''
  let password = req.body.pass
  req.session.username = req.body.user
  console.log(req.session);
  let resUser = await QuerySql(sqlStr, [username, jiami(password)])
  if (resUser.length === 1) {
    res.send('登陆成功')
  } else {
    res.send('账号或密码错误')
  }
});

router.get('/userout', async (req, res, next) => {
  req.session.username = ''
  console.log(req.session);
  res.send('退出成功')
})
// 首页权用户信息，权限请求，以及用户单据信息请求
router.post('/manage', async (req, res, next) => {
  // 1.用户信息
  console.log(req.session);
  let sqlUser = 'select * from user where username = ?'
  let result = await QuerySql(sqlUser, ['gxyy01'])
  // console.log(result);
  // 2.用户权限信息 ？ 暂时未做权限，后期补上
  // 3.首页的用户表单数据
  // 3.1申请单
  // 3.2报销单
  // 3.3在途单据
  res.send("请求成功")
})
module.exports = router;
