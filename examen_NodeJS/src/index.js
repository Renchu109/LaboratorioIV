console.log('Hola mundo!')

//-----------EXAMEN NODEJS--------------//

//EJERCICIO 1: Solicitar datos producto, precio y cantidad a un usuario con el módulo readline

//Se crea la interfaz de lectura
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Se crea la promesa
const pedirDatos = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
};

//Se crea la función para pedir los datos de manera asincrónica
const obtenerDatos = async () => {
    const producto = await pedirDatos('\nIngrese el nombre de un producto: ');
    const precio = await pedirDatos(`Precio de ${producto}: $`);
    const cantidad = await pedirDatos(`Cantidad de ${producto}: `);


    //EJERCICIO 2: Guardar datos en un archivo JSON y utilizar yargs

    const fs = require('fs');
    const yargs = require('yargs');

    const argv = yargs
        .option('file', {
            alias: 'f',
            description: 'Nombre del archivo JSON para guardar los productos',
            type: 'string',
            default: 'productos.json',
        })
        .argv;
    const archivo = argv.file;

    //Se crea el objeto con los datos del producto
    const nuevoProducto = {
        nombre: producto,
        precio: parseInt(precio),
        cantidad: parseInt(cantidad)
    };

    fs.readFile(archivo, 'utf8', (err,data) => {
        let productos = [];

        //Se parsean los datos del producto al archivo json
        if (!err) {productos = JSON.parse(data);}
        
        //Se agrega el producto al array
        productos.push(nuevoProducto);
    
        //Se sobreescribe el archivo con los productos actualizados
        fs.writeFile(archivo, JSON.stringify(productos, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Error al guardar los datos:', err);
            } else {
                console.log(`Producto guardado en el archivo: ${archivo}`);
            }
        });
    });

    //EJERCICIO 3: Mostrar contenido del archivo JSON

    //Se leen y muestran los productos del json
    fs.readFile(archivo, 'utf8', (err,data) => {
        if(err) {
            console.log("Error al mostrar los productos", err)
        }

        const leerProductos = JSON.parse(data)
        console.log('\n------------Productos-----------\n')
        console.log(leerProductos)
    })

    rl.close();
}

//Se llama a la función obtenerDatos para pedirlos al usuario
obtenerDatos();