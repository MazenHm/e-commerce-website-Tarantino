const express = require("express")
const router = express.Router()
const bestSellersCtrl = require("../controllers/BestSellersController")

router.get('/getBestSellers' , bestSellersCtrl.getBestSellers)

module.exports =router;