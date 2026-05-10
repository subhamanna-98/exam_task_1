const Task = require("../models/task");

class TaskController {
  async createTask(req, res) {
    try {
      const { title, description, assignedTo } = req.body;

      const task = await Task.create({
        title,
        description,
        assignedTo,
        assignedBy: req.user.id,
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({
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
      }

      
      else if (req.user.role === "manager") {
        tasks = await Task.find({
          assignedBy: req.user.id,
        });
      }

      else {
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
  const { status } = req.body;

  console.log("STATUS FROM BODY:", status);

  const task = await Task.findById(req.params.id);

  console.log("TASK FOUND:", task);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.status = status;

  const updatedTask = await task.save();

  res.json({
    message: "Task updated successfully",
    task: updatedTask
  });

} catch (error) {
  res.status(500).json({
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
        message: error.message
      })
    }
  }
}

module.exports = new TaskController();
