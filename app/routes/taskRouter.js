const express = require("express");

const protect = require("../middlewire/authMiddlewire");

const authorizeRoles = require("../middlewire/roleMiddlewire");
const taskController = require("../controller/taskController");
const upload = require("../middlewire/upload");
const router = express.Router();

router.post(
  "/task/create",
  protect,upload.single('file'),
  authorizeRoles("admin", "manager"),
  taskController.createTask
);
router.get(
  "/task/get",
  protect,
  authorizeRoles("admin", "manager"),
  taskController.getTasks
);
// Update Task Status
router.patch(
  "/task/status/:id",
  protect,
  authorizeRoles("admin", "manager", "employee"),
 taskController.updateTaskStatus
);

// Assign Task
router.patch(
  "/task/assign/:id",
  protect,
 authorizeRoles("admin", "manager"),
  taskController.assignTask
);
router.put(
  "/task/update/:id",
  protect,upload.single('file'),
  authorizeRoles("admin", "manager"),
  taskController.updateTask
);
router.delete(
  "/task/delet/:id",
  protect,
  authorizeRoles("admin", "manager"),
  taskController.deleteTask
);

module.exports = router;
