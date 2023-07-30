const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    qty: {
      type: Number,
    },
    frameId: { type: mongoose.Schema.Types.ObjectId, ref: "Frame" },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("OrderOption", schema);
