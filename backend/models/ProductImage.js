const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    url:{
        type:String
    },
   

},{timestamps : true})
module.exports = mongoose.model('ProductImage',schema)