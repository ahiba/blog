/**
 * Created by zhan on 2017/8/8.
 */

var mongoose=require('mongoose');
var categoriesSchema=require('../schemas/categories');


module.exports=mongoose.model('Category',categoriesSchema);