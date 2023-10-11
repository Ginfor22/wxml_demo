var express = require('express');
var router = express.Router();
var DbUtils = require('../utils/mysqlUtils');

router.get('/login', function(req, res, next) {
  // 获取请求信息中的用户名和密码
  console.log(req.query)
      // { username: 'haha', password: '1234' }
  console.log(req.query.username)
  console.log(req.query.password)
  var uname = req.query.username;
  var pwd = req.query.password;
  // 操作mysql从用户表查询用户数据，根据用户名查,查到用户就是存在，查不到用户就是不存在
  // 如果用户存在再去比较密码，请求传过来的密码和数据库里的密码是否一致
  //查询字符串要有''
  DbUtils.selectAll("select * from register where username='" + uname + "' and password='" + pwd + "'", function(err, result) {
      if (err) {
          console.log(err);
          res.json({
              code: 2,
              message: '查询错误'
          })
      } else {
          console.log(result)
          if (result.length != 0) {
              res.json({
                  code: 0,
                  message: '登录成功',
                  data: result[0]
              });
          } else {
              res.json({
                  code: 1,
                  message: '用户名或密码不正确'
              });
          }
      }
  });
  return;
});


router.get('/repeat', function(req, res, next) {
  // 获取请求信息中的用户名，看看有没有重名的，有的话显示提示信息

  var uname = req.query.username;

  DbUtils.selectAll("select * from user where username='" + uname + "'", function(err, result) {
      if (err) {
          console.log(err);
          res.json({
              code: 2,
              message: '查询错误'
          })
      } else {
          console.log(result)
          if (result.length == 0) {
              res.json({
                  code: 0,
                  message: '没有重名',
              });
          } else {
              res.json({
                  code: 1,
                  message: '用户名重复，请重新起一个用户名'
              });
          }

      }
  });
});


router.get('/register', function(req, res, next) {
  // 获取请求信息中的图片，用户名和密码
  
  var uname = req.query.username;
  var pwd = req.query.password;

  DbUtils.selectAll("insert into user(username,password) values('" + uname + "','" + pwd +"')",
      function(err, result) {
          if (err) {
              console.log(err);
              res.json({
                  code: 1,
                  message: '查询错误'
              })
          } else {
              res.json({
                  code: 0,
                  message: '注册成功'
              });
          }
      });
  return;
});

//根据用户id查询用户信息
router.get('select', function(req, res, next) {
  // 获取请求信息中的图片，用户名和密码

  var uid = req.query.uid;
  DbUtils.selectAll('select * from user where id=' + uid,
      function(err, result) {
          if (err) {
              console.log(err);
              res.json({
                  code: 1,
                  message: '查询错误'
              })
          } else {
              res.json({
                  code: 0,
                  message: '查询成功',
                  data: result[0]
              });
          }
      });
  return;
});




module.exports = router;
