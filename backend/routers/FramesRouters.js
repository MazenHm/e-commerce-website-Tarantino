const express = require("express");
const router = express.Router();
const framesCtrl = require("../controllers/FramesController");
router.post("/addFrames", framesCtrl.addFrames);
router.put("/updateFrame/:id", framesCtrl.updateFrame);
router.get("/getAllFrames", framesCtrl.getAllFrames);
router.delete("/deleteFrame/:id", framesCtrl.deleteFrame);

module.exports = router;
