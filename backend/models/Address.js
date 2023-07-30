const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    postalCode:{
    type:Number},
    line:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    
   
},{timestamps : true})
module.exports =  Address=mongoose.model('Address',schema
)