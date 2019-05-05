var mysql = require('mysql');
var dbConfig = require('./DBConfig');
var pool = mysql.createPool( dbConfig.mysql );
var DB_NAME = dbConfig.name;
console.log(DB_NAME);
pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  


function AdminR(admin){
    this.nickname = admin.nickname;
    this.pic=admin.pic;
    this.password = admin.password;
    // this.status = admin.status;
    this.phone = admin.phone;
};
module.exports = AdminR;

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed');
    });

    //保存数据
    AdminR.prototype.save = function save(admin,callback) {
        pool.getConnection(function (err, connection) {

            var insertUser_Sql = "INSERT INTO web_user(nickname,password,phone) VALUES(?,?,?)";

            connection.query(insertUser_Sql, [admin.nickname,admin.password,admin.phone], function (err, result) {

                connection.release();
                if (err) {
                    console.log("insertUser_Sql Error: " + err.message);
                    return;
                }

                console.log("invoked[save]");
                callback(err, result);
            });
        });
    };
 

    //修改密码
    AdminR.prototype.updatePwd = function updatePwd(nickname,data,callback){
        pool.getConnection(function(err,connection){
            
            var updatePwd_Sql = "UPDATE web_user SET password = ? where nickname =?";

            connection.query(updatePwd_Sql,[data.password,nickname],function (err, result) {
              
                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);  
                      return;
                }            
               console.log('UPDATE affectedRows',result.affectedRows);
               callback(err,result);
            });
        });
    };

    //根据用户昵称得到用户数量
    AdminR.getUserNumByName = function getUserNumByName(nickname, callback) {

        pool.getConnection(function (err, connection) {
            var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM web_user WHERE nickname = ?";

            connection.query(getUserNumByName_Sql, [nickname], function (err, result) {

                connection.release();
                if (err) {
                    console.log("getUserNumByName Error: " + err.message);
                    return;
                }
                callback(err, result);
            });
        });
    };

    //根据用户名得到用户信息
    AdminR.getUserByUserName = function getUserByUserName(nickname, callback) {
        
        pool.getConnection(function (err, connection) {
            var getUserByUserName_Sql = "SELECT * FROM web_user WHERE nickname = ?";
            var getUserByUserName_Sql1 = "SELECT * FROM web_user";

            //如果nickname存在，则返回相关用户信息
            if(nickname != undefined){
                connection.query(getUserByUserName_Sql, [nickname], function (err, result) {  
                    if (err) {
                        console.log("getUserByUserName Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            //如果nickname不存在，则返回全部用户信息
            else{
                connection.query(getUserByUserName_Sql1, function (err, result) {  
                    if (err) {
                        console.log("getUserByUserName Error: " + err.message);
                        return;
                    }
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };
});
