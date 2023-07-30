const Coupon = require("../models/Coupon");

function GenerateCode(length) {
  const allCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  result = "";
  for (i = 0; i < length; i++) {
    result += allCharacters.charAt(
      Math.floor(Math.random() * allCharacters.length)
    );
  }
  return result;
}

module.exports = {
  createCoupon: async function (req, res) {
    const { discountPercentage, expiryDate } = req.body;

    // Check if the coupon code meets the requirements
    let code = GenerateCode(5);

    try {
      const coupon = await Coupon.create({
        code,
        discountPercentage,
        expiryDate,
      });

      res.status(201).json({
        status: 201,
        message: "Coupon created successfully",
        coupon,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to create coupon",
        error: error.message,
      });
    }
  },

  getAllCoupons: async function (req, res) {
    try {
      const coupons = await Coupon.find();

      res.status(200).json({
        status: 200,
        message: "Coupons retrieved successfully",
        coupons,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to retrieve coupons",
        error: error.message,
      });
    }
  },

  validateCoupon: async function (req, res) {
    const { couponCode } = req.body;

    try {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        res.status(404).json({
          status: 404,
          message: "Coupon not found",
        });
        return;
      }

      if (coupon.expiryDate < Date.now()) {
        res.status(400).json({
          status: 400,
          message: "Coupon has expired",
        });
        return;
      }

      if (coupon.isUsed) {
        res.status(400).json({
          status: 400,
          message: "Coupon has been used",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Coupon is valid",
        discountPercentage: coupon.discountPercentage,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to validate coupon",
        error: error.message,
      });
    }
  },
};
