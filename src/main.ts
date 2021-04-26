/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/**
 * Desarrolle los siguientes ejercicios en un proyecto alojado en un nuevo repositorio de GitHub:

    ¿Qué sucede si el fichero pasado desde la línea de comandos al programa anterior no existe? 
      Modifique el programa para gestionar esta posible situación.

    ¿Qué sucede si el fichero observado se elimina? Modifique el programa para gestionar esta posible situación.

    ¿Cómo haría para tomar el comando asociado al subproceso que se expande desde la línea de comandos?

    ¿Cómo haría para pasar un número arbitrario de parámetros al comando asociado al subproceso que se expande? 
    Ejemplo de ejecución: node app.js helloworld.txt ls -l -h

  Como entrega de esta tarea deberá indicar el enlace al repositorio GitHub con los ejercicios de evaluación solicitados.
 */

import * as fs from 'fs';
import {spawn} from 'child_process';
import {constants} from 'node:buffer';


const filename = process.argv[2];
if (!filename) {
  console.log('A file to watch must be specified!');
  // intentando hacer funcionar fs.access()
  fs.access(`${filename}`, constants.MAX_LENGTH, (err) => {
    console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
  });
}


// fs.watch() devuelve un objeto fs.FSWatcher que tiene la función close() para cerrarlo.
const valor = fs.watch(filename, (eventType, err) => {
  const ls = spawn('ls', ['-l', '-h', filename]);

  // controlamos el tipo de evento que se produce.
  console.log(`Event Type: ${eventType}`);
  switch (eventType) {
    case 'rename':
      console.log('Se ha movido/borrado/cambiado el nombre del fichero.');
      valor.close();
      break;
    case 'change':
      console.log('Se ha modificado el contenido del fichero.');
    default:
      break;
  }

  let output = '';
  ls.stdout.on('data', (chunk) => (output += chunk));


  ls.on('close', () => {
    const parts = output.split(/\s+/);
    console.log([parts[0], parts[4], parts[8]]);
  });

  ls.on('exit', () => {
    console.log('exit');
  });
});


// Control del valor de retorno de fs.watch().
// Este valor del objeto fs.FSWatcher es lo que se comprueba.
valor.on('error', () => {
  console.log('Ocurrió un error.');
});

valor.on('close', () => {
  console.log('Terminamos la ejecución.');
});

valor.on('change', () => {
  console.log('Se ha producido un cambio.');
});
