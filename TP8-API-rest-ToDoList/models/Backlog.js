const mongoose = require('mongoose');

const backlogSchema = new mongoose.Schema({
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

// En este ejemplo se asume que solo existe un Backlog en la aplicación,
// por lo que la lógica de “único” se controla en la creación.
module.exports = mongoose.model('Backlog', backlogSchema);
