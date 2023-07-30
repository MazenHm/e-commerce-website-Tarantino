const mongoose = require("mongoose");
const schema = new mongoose.Schema( {
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
},{timestamps : true})
module.exports = mongoose.model("Wishlist",schema);
