const express = require("express")
const router = express.Router()
const addressCtrl = require("../controllers/AddressController");

router.post('/addAddress' , addressCtrl.addAddress)
router.get('/getAllAddress' , addressCtrl.getAllAddress)
router.get('/getAddress/:id' , addressCtrl.getAddress)
router.put('/updateAddress/:id' , addressCtrl.updateAddress)
router.delete('/deleteAddress/:id' , addressCtrl.deleteAddress)

module.exports = router;