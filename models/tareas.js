const Tarea = require("./tarea");
require('colors');


class Tareas {

  _listado = {}

  constructor() {
    this._listado = {};
  }

  get listadoArr() {

    const listado = [];

    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;

  }

  saveTaskToList(list = []) {
    list.forEach(task => {
      this._listado[task.id] = task;
    })
  }

  crearTarea(desc = '') {

    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }


  listTask() {
    console.log();
    this.listadoArr.forEach(({ desc, completadoEn }, index) => {
      console.log(`${index + 1}.`.green + ` ${desc} :: ${!completadoEn
        ? 'Pendiente'.red
        : 'Completada'.green}`);
    })
  }

  listTaskCompleted(completed = true) {
    console.log();
    this.listadoArr.forEach(({ desc, completadoEn }, index) => {
      if (completed) {

        if (completadoEn !== null) console.log(`${index + 1}.`.green + ` ${desc} :: ` + `${completadoEn}`.green);

      } else {

        if (completadoEn === null) console.log(`${index + 1}.`.green + ` ${desc} :: ${'Pendiente'.red} `);

      }
    })
  }


  removeTask(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }


  toggleCompleted(ids = []) {

    ids.forEach(id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })

  }
}



module.exports = Tareas;