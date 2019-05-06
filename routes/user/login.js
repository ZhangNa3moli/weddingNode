var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
// var userSQL = require('../../db/usersql');
var AdminR = require('../../db/user-recruit');

router.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');

    var nickname=req.query.nickname;
    var password=req.query.password;
    // var status = req.query.status;
    // console.log('param:'+status);
    console.log('nickname:'+nickname);
    console.log('userpwd:'+password);

    var newUser = new AdminR({
      nickname: nickname,
      password: password,
      // status: status
    });

    AdminR.getUserNumByName(newUser.nickname, function (err, results) {
        console.log('数量',results[0].num);

        //登录
        // if(newUser.status === 'login'){
          if(results[0]['num'] == 0){
            res.send('用户不存在');
            console.log('用户不存在');
          }
          else{
            //获取用户信息
            AdminR.getUserByUserName(newUser.nickname,function(err,results){
              if(newUser.password === results[0].password){
                res.send('登录成功');
                console.log('登录成功');
              }
              else{
                res.send('密码错误');
                console.log('密码错误');
              }
            });
          }
        // }
    });
});
module.exports = router;