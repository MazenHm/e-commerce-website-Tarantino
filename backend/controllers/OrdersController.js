const Order = require("../models/Order");
const Product = require("../models/Product");

const OrderOption = require("../models/OrderOption");
const Coupon = require("../models/Coupon");
module.exports = {
  addOrder: async function (req, res) {
    const { couponCode, totalPrice, userId, subTotal, options } = req.body;
    if (!totalPrice || !userId || !subTotal) {
      res.status(400).json({
        status: 400,
        message: "All fields are required!",
      });
      return;
    }
    if (couponCode) {
       
      await Coupon.findOneAndUpdate({ code: couponCode },{isUsed:true});
      

    }
    if (options && options.length > 0) {
      let resultOptions = [];
      for (let i = 0; i < options.length; i++) {
        const orderOptions = new OrderOption(options[i]);
        const result = await orderOptions.save();
        if (result) {
          console.log(result);
          resultOptions.push(result._id);
        }
      }

      const data = req.body;
      console.log("resultOptions", resultOptions);
      if (resultOptions && resultOptions.length > 0) {
        data.options = resultOptions;

        const order = new Order(data);
        await order.save();
        res.send({ order });
      } else {
        res.send({ message: "order option is required!!" });
      }
    }
  },

  getAllOrders: async function (req, res) {
    try {
      order = await Order.find()
        .populate({ path: "userId", model: "User" })
        .populate({ path: "options", model: "OrderOption" });

      res.send(order);
    } catch (err) {
      res.send(err);
    }
  },

  deleteOrder: async function (req, res) {
    try {
      myid = req.params.id;
      product = await Order.deleteOne({ _id: myid });
      res.send(product);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
  updateOrder: async function (req, res) {
    try {
      myid = req.params.id;
      newData = req.body;

      updated = await Order.findByIdAndUpdate({ _id: myid }, newData);
      res.send(updated);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },

  getOrderById: async function (req, res) {
    try {
      myid = req.params.id;
      order = await Order.findOne({ _id: myid })
        .populate({
          path: "userId",
          model: "User",
          populate: { path: "addressId", model: "Address" },
        })
        .populate({
          path: "options",
          model: "OrderOption",
          populate: {
            path: "articleId",
            model: "Product",
            populate: { path: "option", model: "ProductOption" },
          },
        });

      res.send(order);
    } catch {
      (err) => {
        res.send(err);
      };
    }
  },
};
