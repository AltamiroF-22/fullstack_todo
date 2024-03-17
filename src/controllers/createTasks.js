const Task = require("../models/Task");

class TasksController {
  //-------------------- create task -------------------------------

  async createTask(req, res) {
    const { title, description, visibility, status } = req.body;

    const userId = req.user.id;

    try {
      const task = new Task({
        title,
        description,
        visibility,
        status,
        user: userId,
      });

      await task.save();

      res.status(201).json({ task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating task", error: error.message });
    }
  }

  //-------------------- get all tasks by id--------------------------------
  async getAllTaksFromUserId(req, res) {
    const userId = req.params.id;
    try {
      const tasks = await Task.find({ user: userId });

      res.status(200).json({ tasks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching tasks", error: error.message });
    }
  }

  //-------------------- delete single task --------------------------------
  async deleteSingleTask(req, res) {
    const taskId = req.params.id;
    try {
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "task not found" });
      }

      await Task.findByIdAndDelete(taskId);

      res
        .status(200)
        .json({ message: "task deleted with success!", task: task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching task", error: error.message });
    }
  }

  //-------------------- update single task --------------------------------
  async updateSingleTask(req, res) {
    const taskId = req.params.id;
    const { title, description, visibility, status } = req.body;

    try {
      let task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "task not found" });
      }

      task = await Task.findByIdAndUpdate(
        taskId,
        {
          title,
          description,
          visibility,
          status,
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "task updated with success!", task: task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching task", error: error.message });
    }
  }
}

module.exports = new TasksController();
