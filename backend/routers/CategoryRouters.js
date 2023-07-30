const express = require("express")
const router = express.Router()
const categoryCtrl = require("../controllers/CategoryController");

router.post('/addCategory' , categoryCtrl.addCategory)
router.get('/getAllCategory' , categoryCtrl.getAllCategory)
router.get('/getCategory/:id' , categoryCtrl.getCategory)
router.put('/updateCategory/:id' , categoryCtrl.updateCategory)
router.delete('/deleteCategory/:id' , categoryCtrl.deleteCategory)

module.exports = router;