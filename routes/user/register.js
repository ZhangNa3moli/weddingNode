var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
// var userSQL = require('../../db/usersql');
var AdminR = require('../../db/user-recruit');


router.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var pic=req.body.pic;
    var nickname=req.body.nickname;
    var password=req.body.password;
    var status= req.body.status;
    var phone = req.body.phone;
   
    // console.log('param:'+status);
    console.log('pic:'+pic);
    console.log('nickname:'+nickname);
    console.log('phone:'+phone);
    console.log('password:'+password);
    
    var newUser = new AdminR({
      
      pic:pic,
      nickname: nickname,
      password: password,
      phone:phone,
      status: status,
    });

    AdminR.getUserNumByName(newUser.nickname,function(err,results){

      if(newUser.nickname != undefined && newUser.nickname != ''){

        // if(newUser.status === 'register'){
          if(results[0]['num'] == 0){
  
              //向数据库存储数据
              newUser.save({pic:newUser.pic,nickname:newUser.nickname,password:newUser.password,phone:newUser.phone,},function(err,results){
                if(err){
                  res.locals.error = err;
                  return;
                }
              })
              //返回响应数据
              res.send('注册成功');
              console.log('注册成功');
          }
          if(results[0]['num'] > 0){
            res.send('用户名已存在');
            console.log('用户名已存在');
          }
        }

    // }

    });
});

module.exports = router;