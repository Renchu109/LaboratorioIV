const fs = require('fs');

//Función para leer los contactos desde el archivo
const leerContactos = () => {
  fs.readFile('contactos.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    const contactos = JSON.parse(data); 
    console.log('Contactos almacenados:');
    console.log(contactos);
  });
};

//Función para agregar un contacto
const agregarContacto = (nombre, telefono, email) => {
  fs.readFile('contactos.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    const contactos = JSON.parse(data); 

    const nuevoContacto = {
      nombre: nombre,
      telefono: telefono,
      email: email
    };

    contactos.push(nuevoContacto);

    //Volver a escribir el archivo con los nuevos contactos
    fs.writeFile('contactos.json', JSON.stringify(contactos, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
      }
      console.log('Nuevo contacto agregado con éxito.');
    });
  });
};

//Función para eliminar un contacto por su nombre
const eliminarContacto = (nombre) => {
  fs.readFile('contactos.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    
    let contactos = JSON.parse(data); 

    contactos = contactos.filter(contacto => contacto.nombre !== nombre);

    fs.writeFile('contactos.json', JSON.stringify(contactos, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
      }
      console.log(`Contacto "${nombre}" eliminado con éxito.`);
    });
  });
};

//--------USO----------
// Agregar un contacto
agregarContacto('Renzo Di Laudo', '987-654-3210', 'renzodilaudo@example.com');

// Mostrar los contactos después de agregar uno
setTimeout(() => {
  leerContactos();

  // Eliminar un contacto
  setTimeout(() => {
    eliminarContacto('Juan Pérez');

    // Mostrar los contactos después de eliminar uno
    setTimeout(() => {
      leerContactos();
    }, 2000);
  }, 2000);
}, 2000);
