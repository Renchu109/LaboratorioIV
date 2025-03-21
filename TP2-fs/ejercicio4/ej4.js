const fs = require('fs');

//Comprobamos si se proporcionaron los argumentos correctos
if (process.argv.length !== 4) {
  console.log('Uso: node contadorPalabras.js <archivo.txt> <palabra>');
  process.exit(1);
}

//Obtenemos los argumentos de la línea de comandos
const archivo = process.argv[2];
const palabra = process.argv[3].toLowerCase(); //Convertir a minúsculas para evitar errores

//Leemos el contenido del archivo
fs.readFile(archivo, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  //Se cuentan las apariciones de la palabra utilizando una expresión regular
  const regex = new RegExp(`\\b${palabra}\\b`, 'gi');
  const coincidencias = data.match(regex);

  //Se imprime el número de apariciones
  const count = coincidencias ? coincidencias.length : 0;
  console.log(`La palabra "${palabra}" aparece ${count} veces en el archivo "${archivo}".`);
});
