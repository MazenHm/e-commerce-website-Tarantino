const express = require("express");
const router = express.Router();
const announceCtrl = require("../controllers/AnnounceController");

router.post("/addAnnounce", announceCtrl.addAnnounce);
router.get("/getAllAnnounces", announceCtrl.getAllAnnounces);
router.get("/getAnnounce/:id", announceCtrl.getAnnounce);
router.delete("/deleteAnnounce/:id", announceCtrl.deleteAnnounce);
router.put("/updateAnnounce/:id", announceCtrl.updateAnnounce);

module.exports = router;
