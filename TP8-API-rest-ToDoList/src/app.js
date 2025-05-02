require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middlewares para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TP8-API-REST-TODOLIST';

// Conexión a MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('Conectado', () => {
  console.log('Conectado a MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('Error en la conexión a MongoDB:', err);
});

// Montar rutas
const taskRoutes = require('../routes/tasks');
const sprintRoutes = require('../routes/sprints');
const backlogRoutes = require('../routes/backlogs');

app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API RESTful for Task Management');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
