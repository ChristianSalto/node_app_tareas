const { resolve } = require('path');

require('colors');

const showMenu = () => {

  return new Promise((resolve, reject) => {

    console.clear();
    console.log('==========================='.red);
    console.log('  Seleccione una opcion : '.yellow)
    console.log('===========================\n'.red);


    console.log(`${'1.'.magenta} Crear tarea`);
    console.log(`${'2.'.magenta} Listar tareas`);
    console.log(`${'3.'.magenta} Listar tareas completadas`);
    console.log(`${'4.'.magenta} Listar tareas pendientes`);
    console.log(`${'5.'.magenta} Completar tarea(s)`);
    console.log(`${'6.'.magenta} Borrar tarea`);
    console.log(`${'0.'.magenta} Salir \n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });



    readline.question('Seleccione una opcion: ', (opt) => {
      readline.close();
      resolve(opt);
    })
  })


}


const pausa = () => {

  return new Promise((resolve, reject) => {

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });


    readline.question(`\nPresione ${'ENTER'.green} para continuar :\n`, (opt) => {
      readline.close();
      resolve(opt)
    })
  })


}

module.exports = {
  showMenu,
  pausa
}