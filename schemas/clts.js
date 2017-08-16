/**
 * Created by zhan on 2017/8/9.
 */


var mongoose=require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    collection_name:String

});
