const Order = require("../models/Order");
const OrderOption = require("../models/OrderOption");
const Product = require("../models/Product");
const ProductOption = require("../models/ProductOption");

module.exports = {
  getBestSellers: async function (req, res) {
    let orderoptions = await OrderOption.find();
    let products = await Product.aggregate([
      { $match: { _id: { $in: orderoptions.map((o) => o.articleId) } } },
      { $limit: 5 },
    ]);

    let result = await Product.find().populate({
      path: "option",
      model: "ProductOption",
    }); 
    let newList = [];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (result[i]._id.toString() == products[j]._id.toString()) {
          newList.push(result[i]);
        }
      }
    }

    res.send(newList);
  },
};
