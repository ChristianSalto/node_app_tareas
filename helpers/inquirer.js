const inquirer = require('inquirer');
require('colors');



const menuOpt = [{
  type: 'list',
  name: 'opcion',
  message: '¿Que desea hacer? :',
  choices: [
    {
      value: '1',
      name: `${'1.'.yellow} Crear tarea`
    },
    {
      value: '2',
      name: `${'2.'.yellow} Listar tareas`
    },
    {
      value: '3',
      name: `${'3.'.yellow} Tareas completadas`
    },
    {
      value: '4',
      name: `${'4.'.yellow} Listar tareas pendientes`
    },
    {
      value: '5',
      name: `${'5.'.yellow} Completar tarea(s)`
    },
    {
      value: '6',
      name: `${'6.'.yellow} Borrar tarea`
    },
    {
      value: '0',
      name: `${'0.'.yellow} Salir \n`
    },
  ],
  loop: false,
}]

const inquirerMenu = async () => {

  console.clear();
  console.log('==========================='.red);
  console.log('  Seleccione una opcion : '.yellow)
  console.log('===========================\n'.red);

  const { opcion } = await inquirer.prompt(menuOpt);
  return opcion;

}

const pausa = async () => {

  const question = [{
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar :`,
  }];

  console.log('\n');
  await inquirer.prompt(question);
}

const leerInput = async (message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;

}


const optionRemoveTask = async (listTasks = []) => {
  const choices = listTasks.map((task, i) => {

    const idx = `${i + 1}.`.green

    return {
      value: task.id,
      name: `${idx} ${task.desc}`
    }
  });


  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })


  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions);
  return id;
}


const confirm = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'success',
      message
    }
  ]

  const { success } = await inquirer.prompt(question);
  return success;
}

const showCheckList = async (listTasks = []) => {

  const choices = listTasks.map((task, i) => {

    const idx = `${i + 1}.`.green

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: (task.completadoEn) ? true : false
    }
  });


  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(question);
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  optionRemoveTask,
  confirm,
  showCheckList
};