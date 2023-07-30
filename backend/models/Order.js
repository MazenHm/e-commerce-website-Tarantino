const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderOption" }],
  totalPrice: {
    type: Number,
  },
  discount: {
    type: Number,
    default: null,
  },
  subTotal: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    enum: ["ON_PROGRESS", "DELIVERED", "IN_PRODUCTION"],

    default: "ON_PROGRESS",
  },
},{timestamps : true})
module.exports = User = mongoose.model("Order", schema);
