var UserSQL = {  
    insert:'INSERT INTO web_user(userid,nickname,password) VALUES(?,?,?)', 
    queryAll:'SELECT * web_user',  
    getUserById:'SELECT *  web_user WHERE userid = ? ',
    
  };
module.exports = UserSQL;