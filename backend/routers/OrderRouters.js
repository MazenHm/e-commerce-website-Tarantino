const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/OrdersController");

router.post("/addOrder", orderCtrl.addOrder);
router.get("/getAllOrders", orderCtrl.getAllOrders);
router.get("/getOrderById/:id", orderCtrl.getOrderById);
router.put("/updateOrder/:id", orderCtrl.updateOrder);
router.delete("/deleteOrder/:id", orderCtrl.deleteOrder);


module.exports = router;
