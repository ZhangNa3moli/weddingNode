var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function FeedbackR(admin){
        this.nickname=admin.nickname;
        this.judgetime=admin.judgetime;
        this.pic=admin.pic;
        this.judgecontent=admin.judgecontent;
};
module.exports =FeedbackR;

pool.getConnection(function(err, connection) {

    //保存数据
    FeedbackR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insert_Sql = "INSERT INTO user_evaluate(nickname,judgetime,pic,judgecontent) VALUES(?,?,?,?)";

            connection.query(insert_Sql, [admin.nickname,admin.judgetime,admin.pic,admin.judgecontent], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insert_Sql Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };

 
});