import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { Tareas } from './models/tareas.js';
import {    inquirerMenu, 
            pausa, 
            leerInput, 
            listadoTareasBorrar, 
            confirmar,
            mostrarListadoCheklist } from './helpers/inquirer.js';

 
 
const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {

            case '1'://Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;

            case '2'://listar tareas
                tareas.listadoCompleto();
            break;

            case '3':// listar tareas completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4'://listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5'://completar tareas
                const ids = await mostrarListadoCheklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6'://borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if(ok){
                        tareas.borrarTareas(id);
                        console.log(`La tarea ha sido borrada`);
                    }
                }
            break;    
        
        }

        guardarDB(tareas.listadoArr);

        
        await pausa();

    } while (opt !== '0');
};
 
main();