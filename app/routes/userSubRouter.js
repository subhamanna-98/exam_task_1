
const express = require('express');
const userSubController = require('../controller/userSubController');
const authorizeRoles = require("../middlewire/roleMiddlewire");
const protect = require("../middlewire/authMiddlewire");
const router = express.Router();

router.get('/get',protect,authorizeRoles('admin'),userSubController.getUsers)
router.get('/get/:id',protect,authorizeRoles('admin'),userSubController.getUser)
router.put('/update/:id',protect,authorizeRoles('admin'),userSubController.updateUser)
router.delete('/delet/:id',protect,authorizeRoles('admin'),userSubController.deleteUser)
module.exports = router