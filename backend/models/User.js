const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    phone: {
      type: Number,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
