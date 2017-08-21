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


router.post('/admin',function (req,res) {
    var page = req.body.page||1;
    var limit =3;
    var pages = 0;
    User.count().then(function (count) {
        pages=Math.ceil(count/limit);
        //取值不能超过pages
        page=Math.min(page,pages);
        //取值不能小于1
        page=Math.max(page,1);
        var skip=(page-1)*limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            res.json({
                users:users,
                pages:pages,
                page:page,
                limit:limit,
                count:count
            })
            return
        })
    })

})

//添加分类
router.post('/cat',function (req,res,next) {
    var categoryname = req.body.catVal;
    Category.findOne({categoryname:categoryname})
        .then((categoryInfo)=>{
        if(categoryInfo){
            //该分类名称存在
            responseData.code=4
            responseData.message='该分类名称已经存在'
            res.json(responseData)
            return
        }
        var category = new Category({categoryname:categoryname});
        return category.save()
        })
        .then((newCategoryInfo)=>{
        responseData.message='添加分类成功'
            res.json(responseData);
        return
        })


})

//分类列表
router.post('/category',function (req,res) {
    var page = req.body.page||1;
    var limit =10;
    var pages = 0;
    Category.count().then(function (count) {
        pages=Math.ceil(count/limit);
        //取值不能超过pages
        page=Math.min(page,pages);
        //取值不能小于1
        page=Math.max(page,1);
        var skip=(page-1)*limit;
        Category.find().limit(limit).skip(skip).then(function (categories) {
            res.json({
                categories:categories,
                pages:pages,
                page:page,
                limit:limit,
                count:count
            })
            return
        })
    })

})

//增加文集
router.post('/addCollection',function (req,res,next) {
    let{name:collection_name,user_id:user} = req.body;
    Clt.findOne({
        collection_name:collection_name,
        user:user
    }).then(collectionInfo=>{
        if(collectionInfo){
            responseData.code=4;
            responseData.message='改文集已经存在'
            return
        }
        var collection = new Clt({
            collection_name:collection_name,
            user:user
        })
        return collection.save()
    }).then(
        newcltInfo=>{
            Clt.find().then(data=>{
                responseData.data=data;
                res.json(responseData);
                return
           })
        }
    )
})
//文集列表
router.post('/cltList',function (req,res,next) {
    Clt.find().then(data=>{
        responseData.data=data;
        res.json(responseData);
        return
    })
})

//保存文章
router.post('/write',function (req,res,next) {
    var category =req.body.category||'';
    var title = req.body.title||'';
    var user = req.body.user||'';
    var collection = req.body.collection||'';
    var content = req.body.content||'';

    if(category==''||title==''){
        responseData.code==4;
        responseData.message='文章分类、标题不能为空'
        res.json(responseData)
        return
    }
    Content.findOne({title:title}).then(contentInfo=>{
        if(contentInfo){
            responseData.code==5;
            responseData.message='改文章已存在'
            res.json(responseData);
            return
        }else{
            return new Content({
                category:category,
                title:title,
                user:user,
                clt:collection,
                content:content
            }).save()
        }
    }).then(newContInfo=>{
        responseData.message='文章保存成功';
        res.json(responseData)
        return
    })
})

//获得所有文章列表
router.post('/getPreview',function (req,res,next) {
    if(req.body.user_id){
        Content.find({
            user:req.body.user_id
        }).populate(['category', 'user','clt']).then(
            contents=>{

                responseData.contents=contents;
                res.json(responseData);
                return
            }
        )
    }else if(req.body.categoryId){
        Content.find({
            category:req.body.categoryId
        }).populate(['category', 'user','clt']).then(
            contents=>{
                responseData.contents=contents;
                res.json(responseData);
                return
            }
        )
    } else{
        Content.find().populate(['category', 'user','clt']).then(
            contents=>{
                responseData.contents=contents;
                res.json(responseData);
                return
            }
        )
    }

})

//获得所有文集列表
router.post('/getCollection',function (req,res,next) {
        Clt.find({
            user:req.body.user_id
        }).populate( 'user').then(
            data=>{
                responseData.data=data
                res.json(responseData);
                return
            }
        )


})

//阅读全文
router.post('/getContent',function (req,res,next) {
    Content.find({
        _id:req.body._id
    }).populate(['category', 'user','clt']).then(
        article=>{
            console.log(article)
            responseData.article=article
            res.json(responseData);
            return
        }
    )
})



//保存评论
router.post('/comment',function (req,res,next) {

    var username = req.body.username;
    var content_id = req.body.contentId;
    var commentVal = req.body.commentVal.commentVal;
    var postData = {
        username:username,
        postTime:new Date(),
        comment:commentVal
    }
    if(username&&commentVal){
        Content.findOne({_id:content_id}).then(content=>{
            content.comments.push(postData);
            return content.save();
        }).then(newContent=> {
            responseData.message = '评论成功';
            responseData.data = newContent;
            res.json(responseData);
        });
    }
    Content.findOne({_id:content_id}).then(newContent=>{
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    })


})

//博客列表
router.post('/blog',function (req,res) {
    var page = req.body.page||1;
    var limit =3;
    var pages = 0;
    Content.count().then(function (count) {
        pages=Math.ceil(count/limit);
        //取值不能超过pages
        page=Math.min(page,pages);
        //取值不能小于1
        page=Math.max(page,1);
        var skip=(page-1)*limit;

        Content.find().limit(limit).skip(skip).populate('category').then(function (blogs) {
            res.json({
                blogs:blogs,
                pages:pages,
                page:page,
                limit:limit,
                count:count
            })
            return
        })
    })

})

//作者列表
router.post('/getAuthors',function (req,res,next) {
    Content.find().distinct('user').populate('user').then(
        authorsInfo=>{
            responseData.authorsInfo = authorsInfo
            res.json(responseData);
            return
        }
    )
})

module.exports=router;