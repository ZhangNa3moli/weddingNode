var createError = require('http-errors');
var express = require('express');
var static = require('express-static');//读取静态文件
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var consolidate = require('consolidate');
var bodyParser = require('body-parser');//解析post数据处理application/xxx-form-urlencode
var logger = require('morgan');
var multer = require('multer');//处理multipart/form-data解析post数据
var multerObj = multer({dest:'./public/upload'});//直接写入磁盘，而不是保存在内存中(buffer)

//前端接口  创建router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/user/register');
var loginRouter = require('./routes/user/login');
var appointRouter = require('./routes/user/appoint');
var articlelistRouter = require('./routes/user/articlelist');
var showlistRouter = require('./routes/user/showlist');
var judgelistRouter = require('./routes/user/judgelist');
var publishjudgeRouter = require('./routes/user/publishjudge');

var app = express();

//1.获取请求数据
app.use(bodyParser.urlencoded());//解析上传的数据 req.body
app.use(multerObj.any());//接收上传的文件 req.files
//2.cookie/session
app.use(cookieParser());
(function(){
    var keys=[];
    for(var i=0;i<10000;i++){
        keys[i]='a_'+Math.random();
    }
    app.use(cookieSession({
        name: 'sess_id',
        keys:keys,
        maxAge:50*60*1000 //2min
    }));
})();
// view engine setup配置模板引擎  consolidate 适配模板引擎
//输出什么东西
app.set('view engine', 'html');
//模板文件放在哪
app.set('views', path.join(__dirname, 'views'));
//哪种模板引擎
app.engine('html',consolidate.ejs);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//把router添加到app
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/appoint',appointRouter);
app.use('/articlelist',articlelistRouter);
app.use('/showlist',showlistRouter);
app.use('/judgelist',judgelistRouter);
app.use('./publishjudge',publishjudgeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
