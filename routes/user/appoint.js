var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var FeedbackR = require('../../db/appoint-recruit');

router.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var nickname=req.body.nickname;
    var ordertime=req.body.ordertime;
    var orderseries=req.body.orderseries;
    var username=req.body.username;
    var sex=req.body.sex;
    var age=req.body.age;
    var phone=req.body.phone; 
    var money=req.body.money;

    console.log('nickname:'+nickname);
    console.log('ordertime:'+ordertime);
    console.log('orderseries:'+orderseries);
    console.log('username:'+username);
    console.log('sex:'+sex);
    console.log('age:'+age);
    console.log('phone:'+phone);
    console.log('money:'+money);
  
   
    var newFeedback = new FeedbackR({
      nickname:nickname,
      ordertime:ordertime,
      orderseries:orderseries,
      username: username,
      sex:sex,
      age:age,
      phone:phone,
      money:money
    });
   
    //向数据库存储数据
    if(newFeedback.username!== 'undefined'&&newFeedback.phone!==''){
        newFeedback.save({nickname:newFeedback.nickname,ordertime:newFeedback.ordertime,orderseries:newFeedback.orderseries,username:newFeedback.username,sex:newFeedback.sex,age:newFeedback.age,phone:newFeedback.phone,money:newFeedback.money},function(err,results){    
          if(err){
            res.locals.error = err;
            return;
          }
        })
        //返回响应数据
        res.send('预约成功');
        console.log('预约成功');
      }
      else{
        res.send('预约失败');
      }
  });     
module.exports = router;