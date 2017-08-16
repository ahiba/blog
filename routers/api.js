/**
 * Created by zhan on 2017/8/5.
 */

var express = require('express');

var router=express.Router();

var User=require('../models/User');







//返回信息模版
router.use(function (req,res,next) {
    responseData={
        code:0,
        message:''
    }
    next();
})

router.post('/autologin',function (req,res,next) {
    if(req.session.user){
        responseData.userInfo =req.session.user
        res.json(responseData);
        return
    }

})

//注册验证，保存
router.post('/register',function (req,res,next) {
    let {username,password} = req.body;
    User.findOne({username:username})
        .then((userInfo)=>{
            console.log(userInfo);
            if(userInfo){
                //数据库中该用户已经存在
                responseData.code='5',
                    responseData.message='该用户名已经被注册'
                res.json(responseData);
                return
            }
            var user = new User({
                username:username,
                password:password
            })
            return user.save()
        }).then((newUserInfo)=>{
        console.log(newUserInfo);
        responseData.message='恭喜你注册成功';
        responseData.userInfo={
            username:newUserInfo.username,
            _id:newUserInfo._id,
            isAdmin:newUserInfo.isAdmin
        }
        res.json(responseData);
    })
})

//登入验证
router.post('/login',function (req,res,next) {
    let {username,password} = req.body;
    User.findOne({username:username}).then((userInfo)=>{
        if(!userInfo){
            responseData.code=5;
            responseData.message="用户名不存在";
            res.json(responseData);
            return
        }
        //用户名存在
      userInfo.comparePassword(password,function (err,isMatch) {
          if(err){console.log(err)}
          if(isMatch){
              req.session.user=userInfo;
              responseData.message='登入成功';
              responseData.userInfo={
                  _id:userInfo.id,
                  username:userInfo.username,
                  isAdmin:userInfo.isAdmin
              }
              res.json(responseData);
              return;
          }else{
              responseData.code=6;
              responseData.message='密码错误';
              res.json(responseData);
              return
          }

      })

    })
})
//注销
router.post('/logout',function (req,res) {
    delete req.session.user;
    res.json(responseData);
    return

})

//write博客
router.post('/write',function (req,res,next) {
    
})

module.exports=router;