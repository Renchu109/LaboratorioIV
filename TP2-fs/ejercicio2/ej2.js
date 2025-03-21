const fs = require('fs');

//Creando datos.txt
const nombre = 'Renzo Di Laudo';  
const edad = 21;              
const carrera = 'Ingeniería electromecánica';  

const contenido = `
Nombre: ${nombre}
Edad: ${edad}
Carrera: ${carrera}
`;

fs.writeFile('datos.txt', contenido, (err) => {
  if (err) {
    console.error('Error al crear el archivo:', err);
    return;
  }
  console.log('Archivo "datos.txt" creado con éxito');

  //Leyendo el archivo "datos.txt" e imprimiendo su contenido
  fs.readFile('datos.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    console.log('Contenido de "datos.txt":');
    console.log(data);

    //Agregando fecha y hora
    const fechaHora = new Date().toISOString().replace('T', ' ').slice(0, 19); 
    const fechaContenido = `\nFecha de modificación: ${fechaHora}`;

    fs.appendFile('datos.txt', fechaContenido, (err) => {
      if (err) {
        console.error('Error al agregar la fecha al archivo:', err);
        return;
      }
      console.log('Fecha y hora añadidos al archivo');

      //Renombre de los archivos datos e información
      fs.rename('datos.txt', 'informacion.txt', (err) => {
        if (err) {
          console.error('Error al renombrar el archivo:', err);
          return;
        }
        console.log('Archivo renombrado a "informacion.txt"');

        //Eliminación"informacion.txt" tras 10 segundos
        setTimeout(() => {
          fs.unlink('informacion.txt', (err) => {
            if (err) {
              console.error('Error al eliminar el archivo:', err);
              return;
            }
            console.log('Archivo "informacion.txt" eliminado');
          });
        }, 10000);
      });
    });
  });
});
