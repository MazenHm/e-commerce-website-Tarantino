const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },
  option: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductOption" }],
  images: [{ url: { type: String } }],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
},{timestamps : true})
module.exports = mongoose.model("Product", schema );
