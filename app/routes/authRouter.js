const express = require("express");
const authSubController = require("../controller/authSubController");
const protect = require("../middlewire/authMiddlewire");
const router = express.Router();

router.post("/register", authSubController.register);
router.post("/login", authSubController.login);
router.post("/logout",protect,authSubController.logout);

module.exports = router;
