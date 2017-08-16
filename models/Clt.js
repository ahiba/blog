/**
 * Created by zhan on 2017/8/9.
 */

var mongoose=require('mongoose');
var cltsSchema = require('../schemas/clts');

module.exports=mongoose.model('Clt',cltsSchema);