/**
 * Created by zhan on 2017/8/5.
 */

var mongoose=require('mongoose');
var usersSchema=require('../schemas/users');


module.exports=mongoose.model('User',usersSchema);