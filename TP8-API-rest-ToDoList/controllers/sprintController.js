const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

exports.getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('tasks');
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate('tasks');
    if (!sprint) return res.status(404).json({ error: 'Sprint not found' });
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSprint = async (req, res) => {
  try {
    const { startDate, endDate, tasks, color } = req.body;
    // Validar que, en caso de enviarse tasks, estas existan
    if (tasks && tasks.length > 0) {
      const existingTasks = await Task.find({ _id: { $in: tasks } });
      if (existingTasks.length !== tasks.length) {
        return res.status(400).json({ error: 'One or more tasks do not exist' });
      }
    }
    const newSprint = new Sprint({ startDate, endDate, tasks: tasks || [], color });
    const savedSprint = await newSprint.save();
    res.status(201).json(savedSprint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSprint = async (req, res) => {
  try {
    const updatedSprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tasks');
    if (!updatedSprint) return res.status(404).json({ error: 'Sprint not found' });
    res.json(updatedSprint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSprint = async (req, res) => {
  try {
    const deletedSprint = await Sprint.findByIdAndDelete(req.params.id);
    if (!deletedSprint) return res.status(404).json({ error: 'Sprint not found' });
    res.json({ message: 'Sprint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTaskToSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);
    if (!sprint) return res.status(404).json({ error: 'Sprint not found' });
    // Verificar que la tarea exista
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    // Verificar si ya fue agregada
    if (sprint.tasks.includes(req.params.taskId)) {
      return res.status(400).json({ error: 'Task already added to sprint' });
    }
    sprint.tasks.push(req.params.taskId);
    await sprint.save();
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
