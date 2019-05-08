var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var FeedbackR = require('../../db/judge-recruit');

router.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var nickname=req.body.nickname;
    var judgetime= req.body.judgetime;
    var pic = req.body.pic; 
  var judgecontent = req.body.content;     
   
  console.log(req.body)
    var newFeedback = new FeedbackR({
      nickname: nickname,
      judgetime:judgetime,
      pic:pic,
      judgecontent:judgecontent
    });
   
    //向数据库存储数据
    if(newFeedback.nickname!== 'undefined'&&newFeedback.judgecontent!=='undefined'){
        newFeedback.save({nickname:newFeedback.nickname,judgetime:newFeedback.judgetime,pic:newFeedback.pic,judgecontent:newFeedback.judgecontent},function(err,results){    
          if(err){
            res.locals.error = err;
            return;
          }
        })
        //返回响应数据
        res.send('评价成功！');
        console.log('评价成功');
      }
      else{
        res.send('评价失败！');
        console.log('评价失败');
      }
  });     
module.exports = router;