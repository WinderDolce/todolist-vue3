// Definición del estado y funciones de gestión de la tienda 'useTodoStore'
import { defineStore } from 'pinia';
import { Task } from '../models/task.models';
import { generateID, sleep } from '../utils';

// Definición del estado de la tienda
interface TodoState {
  tasks: Task[];
  loading: boolean;
}

// Creamos y exportamos la tienda 'useTodoStore'
export const useTodoStore = defineStore({
  id: 'todo', // Identificador único de la tienda
  state: (): TodoState => ({
    tasks: [],    // Lista de tareas
    loading: false,  // Indicador de carga
  }),
  getters: {}, // Métodos de obtención de datos calculados (no se usan actualmente)
  actions: {
    // Método asíncrono para agregar una nueva tarea
    async addTask(name: string): Promise<void>{
      this.loading = true; // Activar indicador de carga
      this.tasks.push({name, done: false, id: generateID()}); // Agregar nueva tarea con ID único
      await sleep(1000); // Simular demora de 1 segundo
      this.loading = false; // Desactivar indicador de carga
    }, 

    // Método asíncrono para eliminar una tarea por ID
    async deleteTask(id: string): Promise<void>{
      this.loading = true; // Activamos indicador de carga
      this.tasks = this.tasks.filter(task => task.id !== id); // Filtramos tareas y eliminamos la especificada por ID
      await sleep(1000); // Simulamos demora de 1 segundo
      this.loading = false; // Desactivamos indicador de carga
    }, 

    // Método asíncrono para actualizar el estado de una tarea por ID
    async updateTask(id: string): Promise<void>{
      this.loading = true; // Activamos indicador de carga
      const task = this.tasks.find((task) => task.id === id); // Encontramos la tarea por ID

      if(task){
        task.done = !task.done; // Invertimos el estado 'done' de la tarea
      }
      await sleep(1000); // Simulamos demora de 1 segundo
      this.loading = false; // Desactivamos indicador de carga
    }, 
  },
});


