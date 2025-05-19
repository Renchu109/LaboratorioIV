const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
config()

const app = express();

app.use(bodyParser.json());

// Importamos rutas
const projectRoutes = require('./routes/projects')
const researcherRoutes = require('./routes/researcher')
const publicationRoutes = require('./routes/publication')

// Registramos rutas con endpoints
app.use('/projects', projectRoutes)
app.use('/researchers', researcherRoutes)
app.use('/publications', publicationRoutes)

//Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {dbName: process.env.MONGO_DB_NAME})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Error al conectar a MongoDB: ', err))

const db = mongoose.connection;

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})