const express = require("express");
const router = express.Router();
const couponController = require("../controllers/CouponController");

router.post("/coupons", couponController.createCoupon);
router.get("/coupons", couponController.getAllCoupons);
router.post("/coupons/validate", couponController.validateCoupon);

module.exports = router;
