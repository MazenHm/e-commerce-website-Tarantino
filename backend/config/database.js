const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/serverdb').then(()=>{
console.log('Database connected!')
}).catch((err)=>{
    console.log('Database not connected!')
})


module.exports = mongoose