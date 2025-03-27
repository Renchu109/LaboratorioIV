console.log("Hola mundo! estoy utilizando nodemon")

//EJERCICIO 1: configurando nodemon y dotenv
import { config } from "dotenv";
//const { config } = require("dotenv")

config()
console.log('\nEJERCICIO 1: configurando nodemon y dotenv\n')
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Usuario: ${process.env.DB_USER}`);
console.log(`Contraseña: ${process.env.DB_PASS}`);

//EJERCICIO 2: import y export
//const { sumar } = require('./math');
import { sumar } from "./math.js";

console.log('\nEJERCICIO 2: import y export\n')
console.log(`5 + 3 = ${sumar(5,3)}`);

//EJERCICIO 3: modulo readline
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
console.log('\nEJERCICIO 3: modulo readline\n')
rl.question('¿Cuál es tu nombre? ', (nombre) => {
    console.log(`Hola, ${nombre}!`);
    
    rl.question('¿Cuál es tu edad? ', (edad) => {
        const añoNacimiento = new Date().getFullYear() - parseInt(edad);
        console.log(`Si tienes ${edad} años, naciste en ${añoNacimiento}`);

        rl.close();
    });
});*/


//EJERCICIO 4: pedir datos, guardarlos y leerlos
import fs from 'fs'

console.log('\nEJERCICIO 4: pedir datos, guardarlos y leerlos\n')
rl.question('Ingresa tu nombre: ',(nombre) => {
    rl.question('Ingresa tu edad: ',(edad) => {
        rl.question('Ingresa tu correo electrónico: ',(mail) => {
            const datos = `Nombre: ${nombre}\nEdad: ${edad}\nCorreo: ${mail}\n`

            fs.writeFile('datos_usuario.txt', datos, (err) => {
                if(err) {
                    console.log('Error al guardar los datos: ',err)
                    rl.close()
                    return
                }
                console.log('Datos guardados correctamente')
            })

            fs.readFile('datos_usuario.txt','utf-8',(err,data) => {
                if(err) {
                    console.log('Error al leer los datos: ',err)
                } else {
                    console.log('\nDatos del archivo datos_usuario.txt\n')
                    console.log(data)
                }
            })
            rl.close()
        })
    })
})