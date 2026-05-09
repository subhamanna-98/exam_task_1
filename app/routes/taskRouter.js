

const express = require('express');

const protect = require("../middlewire/authMiddlewire");

const authorizeRoles = require("../middlewire/roleMiddlewire");
const taskController = require('../controller/taskController');
const router = express.Router();

router.post('/task/create',protect,authorizeRoles("admin", "manager"),taskController.createTask)
router.get('/task/get',protect,authorizeRoles('admin','manager'),taskController.getTasks)
router.put('/task/update/:id',protect,authorizeRoles('admin','manager'),taskController.updateTask)
router.delete('/task/delet/:id',protect,authorizeRoles('admin','manager'),taskController.deleteTask)

module.exports = router