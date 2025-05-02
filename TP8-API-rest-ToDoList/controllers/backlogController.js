const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

exports.getBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne().populate('tasks');
    if (!backlog) return res.status(404).json({ error: 'Backlog not found' });
    res.json(backlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBacklog = async (req, res) => {
  try {
    // Si ya existe, devolvemos error
    let backlog = await Backlog.findOne();
    if (backlog) return res.status(400).json({ error: 'Backlog already exists' });
    backlog = new Backlog({ tasks: req.body.tasks || [] });
    if (backlog.tasks.length > 0) {
      const existingTasks = await Task.find({ _id: { $in: backlog.tasks } });
      if (existingTasks.length !== backlog.tasks.length) {
        return res.status(400).json({ error: 'One or more tasks do not exist' });
      }
    }
    const savedBacklog = await backlog.save();
    res.status(201).json(savedBacklog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTaskToBacklog = async (req, res) => {
  try {
    const { taskId } = req.params;
    let backlog = await Backlog.findOne();
    if (!backlog) return res.status(404).json({ error: 'Backlog not found. Create one first.' });
    // Verificar que la tarea exista
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    // Validar que no se haya agregado ya
    if (backlog.tasks.includes(taskId)) {
      return res.status(400).json({ error: 'Task already in backlog' });
    }
    backlog.tasks.push(taskId);
    await backlog.save();
    res.json(backlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
