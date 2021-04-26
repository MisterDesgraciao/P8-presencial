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


const filename = process.argv[2];
if (!filename) {
  throw Error('A file to watch must be specified!');
}


fs.watch(filename, () => {
  const ls = spawn('ls', ['-l', '-h', filename]);


  let output = '';
  ls.stdout.on('data', (chunk) => (output += chunk));


  ls.on('close', () => {
    const parts = output.split(/​​\s​​+/);
    console.log([parts[0], parts[4], parts[8]]);
  });
});
