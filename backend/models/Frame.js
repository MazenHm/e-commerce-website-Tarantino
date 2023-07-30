const mongoose = require("mongoose");



const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: { type: String },
},{timestamps : true})
module.exports = mongoose.model("Frame", schema);
