/**
 * Created by zhan on 2017/8/9.
 */


var mongoose = require('mongoose');

var contentsSchema = require('../schemas/contents');

module.exports=mongoose.model('Content',contentsSchema);