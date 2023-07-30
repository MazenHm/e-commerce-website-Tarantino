const express = require("express")
const router = express.Router()
const productCtrl = require("../controllers/ProductController");

router.post('/addProduct' , productCtrl.addProduct)
router.get('/getAllProducts' , productCtrl.getAllProducts)
router.get('/getLastProducts' , productCtrl.getLastProducts)
router.get('/getProduct/:id' , productCtrl.getProduct)
router.put('/updateProduct/:id' , productCtrl.updateProduct)
router.delete('/deleteProduct/:id' , productCtrl.deleteProduct)








module.exports = router;