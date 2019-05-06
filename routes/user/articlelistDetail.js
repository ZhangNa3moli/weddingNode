var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );

router.post('/', function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'content-type');
         // 从连接池获取连接 
     console.log(req.body);
         
        pool.getConnection(function(err, connection) { 
             var artical_sql = `select * from article_center where articleid = ${req.body.id} order by articleid asc`;
            connection.query(artical_sql,  function(err, result) {
                    if(result) {      
                         console.log(result);                         
                         res.send(result[0]); 
                    }     
                 // 释放连接  
                  connection.release();  

             });
        });
 });

module.exports = router;