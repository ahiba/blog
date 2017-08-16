/**
 * Created by zhan on 2017/8/9.
 */

var mongoose=require('mongoose');

//内容的表结构
module.exports=new mongoose.Schema({

    //关联字段--内容的分类信息
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    //内容标题
    title:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    clt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Clt'

    },
    // 时间
    addTime:{
        type: Date,
        default: new Date()
    },
    // 阅读量
    views:{
        type:Number,
        default:0
    },
    content:{
        type:String,
        default:''
    },
    //评论
    comments: {
        type: Array,
        default: []
    }
});
