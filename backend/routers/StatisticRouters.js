const express = require("express");
const router = express.Router();
const statisticCtrl = require("../controllers/StatisticController");

router.get("/getBalance", statisticCtrl.getBalance);
router.get("/getBalanceByMonths", statisticCtrl.getBalanceByMonths);
router.get("/getAmountByMonths", statisticCtrl.getAmountByMonths);
module.exports = router;
