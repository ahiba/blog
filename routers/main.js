/**
 * Created by zhan on 2017/8/5.
 */


var express = require('express');

var router=express.Router();

var User = require('../models/User');
var Category = require('../models/Category');
var Clt = require('../models/Clt');
var Content = require("../models/Content")

//返回信息模版
router.use(function (req,res,next) {
    responseData={
        code:0,
        message:''
    }
    next();
})


router.post('/',function (req,res,next) {
    Category.find().then(categories=>{
        responseData.categories=categories;
        res.json(responseData);
        return
    })
})


module.exports=router;