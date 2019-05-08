module.exports =
 { 
     name:'wedding', 
     mysql: {   
              host: 'localhost',     
              user: 'root',   
              password: 'admin',  
              database:'wedding',// 前面建的user表位于这个数据库中  
              multipleStatements: true
      },
    //   User:function User(user){
    //   	this.username=user.username;
    //   	this.password=user.password;
    //   }

 };