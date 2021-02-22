require('colors');

// const { showMenu, pausa } = require('./helpers/mensajes');
const { saveDB, readDB } = require('./helpers/handleFile');
const {
  inquirerMenu, pausa, leerInput, optionRemoveTask, confirm, showCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = readDB();

  if (tareasDB) {
    // console.log(tareasDB);
    tareas.saveTaskToList(tareasDB)
  };



  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        break;

      case '2':
        tareas.listTask();
        break;

      case '3':
        tareas.listTaskCompleted();
        break;

      case '4':
        tareas.listTaskCompleted(false);
        break;

      case '5':
        const ids = await showCheckList(tareas.listadoArr);
        tareas.toggleCompleted(ids);
        break;

      case '6':
        const id = await optionRemoveTask(tareas.listadoArr);

        if (id !== '0') {
          const success = await confirm('¿ Estas seguro ?');
          if (success) {
            tareas.removeTask(id);
            console.log('\nTarea borrada'.red);
          }
        }

        break;
    }

    saveDB(tareas.listadoArr);

    if (opt !== '0') await pausa();

  } while (opt !== '0');

}



main();