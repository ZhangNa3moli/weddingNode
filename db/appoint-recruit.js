var mysql = require('mysql');
var dbConfig = require('./DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function FeedbackR(admin){
      this.username=admin.username;
      this.ordertime=admin.ordertime;
      this.orderseries=admin.orderseries;
      this.username=admin.username;
      this.sex=admin.sex;
      this.age=admin.age;
      this.phone=admin.phone;
      this.money=admin.money;
};
module.exports =FeedbackR;

pool.getConnection(function(err, connection) {

    //保存数据
    FeedbackR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insert_Sql = "INSERT INTO appoint_tb(nickname,ordertime,orderseries,username,sex,age,phone,money) VALUES(?,?,?,?,?,?,?,?)";

            connection.query(insert_Sql, [admin.username,admin.ordertime,admin.orderseries,admin.username,admin.sex,admin.age,admin.phone,admin.money], function (err, result) {

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