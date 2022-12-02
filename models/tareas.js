
// _listado
//      { 'uuid-123123-123123-3: { id: 12, desc: asdas, compleatadoEn: 123123'}]

import { Tarea } from "./tarea.js";

class Tareas {

    _listado = {
        'abc': 123
    };

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTareas(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
        
    }

    crearTarea(desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){

        console.log();

        this.listadoArr.forEach((tarea, i) => {
            const idx =`${ i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) 
                                ? 'Completada'.green
                                : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas = true){

        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) 
                                ? 'Completada'.green
                                : 'Pendiente'.red
            if(completadas){
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }   
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
            
        })
    }

    toggleCompletadas(ids = []){


        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach ( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })


    }

    mostrarDesc(id = ''){
        
        this.listadoArr.forEach((tarea)=>{
            if(id == tarea.id){
                return tarea.desc;
            }
            
        });
    }

    

}

export { Tareas };