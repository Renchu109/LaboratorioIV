const fs = require('fs');

// Obtenemos fecha y la hora
function obtenerFechaHora() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const día = String(ahora.getDate()).padStart(2, '0');
    const hora = String(ahora.getHours()).padStart(2, '0');
    const minuto = String(ahora.getMinutes()).padStart(2, '0');
    const segundo = String(ahora.getSeconds()).padStart(2, '0');
    return `[${año}-${mes}-${día} ${hora}:${minuto}:${segundo}]`;
}

//Función para crear y escribir en el archivo log.txt
function escribirLog(mensaje) {
    fs.appendFile('log.txt', mensaje + '\n', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        }
    });
}

//Mensaje de inicio con la fecha y hora obtenida
escribirLog(`${obtenerFechaHora()} - Inicio del programa`);

//Ejecución
escribirLog(`${obtenerFechaHora()} - Ejecutando tarea...`);

//Mensaje de finalización 5 segundos
setTimeout(() => {
    escribirLog(`${obtenerFechaHora()} - Tarea completada`);
}, 5000);
