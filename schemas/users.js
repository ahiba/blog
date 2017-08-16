/**
 * Created by zhan on 2017/8/5.
 */

var mongoose=require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

//用户的表结构
var userSchema=new mongoose.Schema({

    //用户名
    username:String,
    //密码
    password:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
})


userSchema.pre('save',function(next){
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err){  console.log(err); return next(err)}
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) {return next(err);}
            user.password = hash;
            console.log(user);
            console.log("password： " +user.password);
            next();
        })
    })

    // 注册 ，加密的时候  多了个next ，这个next和bcrypt.genSalt中的回调函数是并行的，所以导致save 函数在加密完成之前执行
//调到下一个流程
//next();//异步执行的
})

// 实例方法：
userSchema.methods = {
    comparePassword: function (_password, cb) {
        var hash = this.password;
        var isMatch = bcrypt.compareSync(_password, hash);
        cb(null, isMatch);
    }
}

// userSchema.statics={
//     fetch:function (cb) {
//         return this
//             .find({})
//             .sort('meta.updateAt')
//             .exec(cb)
//     },
//     findById:function (id,cb) {
//         return this
//             .findOne({_id:id})
//             .exec(cb)
//     }
// }

module.exports = userSchema;
