var mysql = require('mysql');
var dbConfig = require('./DBConfig');
var pool = mysql.createPool( dbConfig.mysql );

module.exports = {
   
    UpdateImg:function UpdateImg(nickname,savepath){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var UpdateImg_sql = 'update web_user set pic=? where nickname=?';
                connection.query(UpdateImg_sql,[savepath,nickname],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
  
  
}