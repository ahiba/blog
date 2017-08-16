/**
 * Created by zhan on 2017/8/4.
 */

var express = require('express');
//加载数据库模块

var mongoose=require('mongoose');
//加载body-parser中间件，用来处理post提交过来的数据
var bodyParser=require('body-parser');

// var cookieParser = require('cookie-parser')
var session = require('express-session');
// var MongoStore=require('connect-mongo')(session);



var app = express();

app.locals.moment=require('moment');

var dburl = "mongodb://localhost:27010/ahiba"

//bodyParser设置
app.use(bodyParser.urlencoded({extended:true}))
//。。。。。。。。。。。。。。。。。。。。
app.use(session({
    secret: 'ahiba blog',
    // store: new MongoStore({
    //     url: dburl,
    //     collection: 'sessions'
    // }),
    resave: false,
    saveUninitialized: true
}));



const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./cfg/dev.js');
const {dfPath} = require('./cfg/default');


config.entry.unshift('webpack-hot-middleware/client?reload=true');

let compiler = webpack(config);

app.use( webpackDevMiddleware(compiler, {publicPath: '/assets/'}) );

app.use( webpackHotMiddleware(compiler) );

app.get('/*', (req, res)=> res.sendFile(dfPath.src + '/index.html') )


//。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。


app.get('/',function (req,res) {
    res.send('hello world')
})

//模块划分
app.use('/ahiba/admin',require('./routers/admin'));
app.use('/ahiba/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect(dburl,function (err) {
    if(err){
        cosole.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(9003);
    }
})

