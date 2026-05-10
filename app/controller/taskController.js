const Task = require("../models/task");

class TaskController {
  async createTask(req, res) {
    try {
      const { title, description, assignedTo } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and description are required",
        });
      }

      const task = await Task.create({
        title,
        description,
        assignedTo,
        assignedBy: req.user.id,

        file: req.file ? req.file.path : "",
      });
console.log("BODY:", req.body);
console.log("FILE:", req.file);
      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      console.log("CREATE TASK ERROR =>", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getTasks(req, res) {
    try {
      let tasks;

      if (req.user.role === "admin") {
        tasks = await Task.find()
          .populate("assignedTo", "name email")
          .populate("assignedBy", "name");
      } else if (req.user.role === "manager") {
        tasks = await Task.find({
          assignedBy: req.user.id,
        });
      } else {
        tasks = await Task.find({
          assignedTo: req.user.id,
        });
      }

      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateTask(req, res) {
    try {
      const { title, description, status, assignedTo } = req.body;

      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.assignedTo = assignedTo || task.assignedTo;

      if (req.file) {
        task.file = req.file.path;
      }

      const updatedTask = await task.save();

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const { status } = req.body;

      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      task.status = status;

      const updatedTask = await task.save();

      res.status(200).json({
        message: "Task status updated successfully",
        task: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async assignTask(req, res) {
    try {
      const { assignedTo } = req.body;

      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      task.assignedTo = assignedTo;

      const updatedTask = await task.save();

      res.status(200).json({
        message: "Task assigned successfully",
        task: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async deleteTask(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        message: "Task deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new TaskController();
