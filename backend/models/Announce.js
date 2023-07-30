const mongoose = require("mongoose");



const schema = new mongoose.Schema({
  description: String,
  
},{timestamps : true})
module.exports = Announce = mongoose.model("Announce", schema);
