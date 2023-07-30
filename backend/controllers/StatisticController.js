const Order = require("../models/Order");

module.exports = {
  getBalance: async function (req, res) {
    try {
      let statistic = {
        paid: 0,
        unpaid: 0,
        count: 0,
      };
      const delivredOrders = await Order.find({
        status: "DELIVERED",
      });
      const unpaidOrders = await Order.find({
        status: "ON_PROGRESS" || "IN_PRODUCTION",
      });
      statistic.count = await Order.count();

      if (delivredOrders && delivredOrders.length > 0) {
        delivredOrders.map((order) => {
          statistic.paid += order.totalPrice;
        });
      }
      if (unpaidOrders && unpaidOrders.length > 0) {
        unpaidOrders.map((order) => {
          statistic.unpaid += order.totalPrice;
        });
      }
      res.status(200).json({
        ...statistic,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get statstic",
        error: error.message,
      });
    }
  },

  getBalanceByMonths: async function (req, res) {
    try {
      let data = [];

      for (let i = 0; i < 12; i++) {
        let year = new Date().getFullYear();
        let month = i;

        let orders = await Order.find({
          createdAt: {
            $gte: new Date(year, month, 1),
            $lt: new Date(year, month + 1, 1),
          },
        });
        data[i] = orders.length;
      }

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get statstic",
        error: error.message,
      });
    }
  },

  getAmountByMonths: async function (req, res) {
    try {
      let data = [];

      for (let i = 0; i < 12; i++) {
        let year = new Date().getFullYear();
        let month = i;
        let paid = 0;
        let unpaid = 0;

        let orders = await Order.find({
          createdAt: {
            $gte: new Date(year, month, 1),
            $lt: new Date(year, month + 1, 1),
          },
        });

        if (orders && orders.length > 0) {
          orders.map((order) => {
            if (order.status == "DELIVERED") {
              paid += order.totalPrice;
            }
            if (
              order.status == "ON_PROGRESS" ||
              order.status == "IN_PRODUCTION"
            ) {
              unpaid += order.totalPrice;
            }
          });
        }
        data[i] = {
          paid,
          unpaid,
        };
      }

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to get statstic",
        error: error.message,
      });
    }
  },
};
