const mongoose = require('mongoose');
const schema = new mongoose.Schema({
   
    size:{
        type:String
    },
    price:{
        type:Number
    },

    

},{timestamps : true})
module.exports = mongoose.model('ProductOption',schema)