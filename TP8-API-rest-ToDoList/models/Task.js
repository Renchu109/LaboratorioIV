const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  state: { 
    type: String, 
    enum: ['pendiente', 'en progreso', 'completado'], 
    default: 'pendiente' 
  },
  dueDate: { type: Date, required: true },
  color: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
