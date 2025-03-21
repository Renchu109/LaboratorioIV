const yargs = require('yargs');
const fs = require('fs');

//Ejercicio prueba
/*
const argv = yargs
  .command('saludar', 'Muestra un saludo', {
    nombre: {
      describe: 'Nombre de la persona a saludar',
      demandOption: true,
      type: 'string'
    }
  })
  .help()
  .argv;

if (argv._.includes('saludar')) {
  console.log(`Hola, ${argv.nombre}!`);
}
*/

//Ejercicio práctico 1
/*
const argv = yargs
  .command('despedir', 'Muestra una despedida', {
    nombre: {
      describe: 'Nombre de la persona a despedir',
      demandOption: true,
      type: 'string'
    }
  })
  .help()
  .argv;

if (argv._.includes('despedir')) {
  console.log(`Adiós, ${argv.nombre}!`);
}
  */

//Ejercicio práctico 2
/*
const argv = yargs
  .command('suma', 'sumatoria de dos números', {
    num1: {
      describe: 'Ingrese un primer número',
      demandOption: true,
      type: 'number'
    },
    num2: {
        describe: 'Ingrese un segundo número',
        demandOption: true,
        type: 'number'
      }
  })
  .help()
  .argv;

if (argv._.includes('suma')) {
    const { num1, num2 } = argv;
    console.log(`${num1} + ${num2} = ${num1+num2}`);
}
*/

//Ejercicio práctico 3
/*
const argv = yargs
  .command('leerJSON', 'Lee un archivo de tipo JSON', {
    archivo: {
      describe: 'Archivo JSON a leer',
      demandOption: true,
      type: 'string'
    }
}, (argv) => {
    fs.readFile(argv.archivo, 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err.message);
        return;
      }
      console.log(JSON.parse(data));
    });
  })
  .help()
  .argv;
*/

//Ejercicio práctico 4
const argv = yargs
  .command('leerJSON', 'Lee un archivo de tipo JSON', {
    archivo: {
      describe: 'Archivo JSON a leer',
      demandOption: true,
      type: 'string'
    },
    nombre: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string'
    }
}, (argv) => {
    if (!argv.nombre) {
        console.error('Error: El argumento "nombre" es obligatorio.');
        return;
    }

    fs.readFile(argv.archivo, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err.message);
            return;
        }
        console.log(JSON.parse(data));
    });

    try {
        const jsonData = JSON.parse(data);
        console.log(jsonData);  
    } catch (parseError) {
        console.error('Error al parsear el archivo JSON:', parseError.message);
    }
  })
  .help()
  .argv;