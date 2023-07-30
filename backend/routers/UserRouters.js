const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/UserController");
const { isAuth } = require("../middleware/auth");

router.post("/register", userCtrl.addUser);
router.post("/login", userCtrl.login);
router.get("/getAllUsers", userCtrl.getAllUsers);
router.get("/user/:id", userCtrl.getUserById);
router.get("/me", isAuth, userCtrl.getConnectedUser);

router.delete("/user/:id", userCtrl.deleteUser);
router.put("/user/:id", userCtrl.updateUser);

module.exports = router;
