const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Configura la carpeta 'dist' (ubicada en la raíz del proyecto) para servir los archivos estáticos
app.use(express.static(path.join(__dirname, '../dist')));

// Para cualquier ruta, devolver el archivo index.html de la aplicación React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Inicia el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});