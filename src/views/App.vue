<template>
  <!-- Componente principal: Layout -->
  <Layout>
    <!-- Formulario para agregar nueva tarea -->
    <form class="form-task" v-on:submit.prevent="createTask">
      <input type="text" class="form-task_input" placeholder="Agregar nueva tarea" v-model="taskName">
      <button class="form-task_button">Crear tarea</button>

      <!-- Mostrar mensaje de error -->
      <div v-if="errorMessage" class="error-message" :class="{ 'show-popup': showErrorPopup }">
        {{ errorMessage }}
      </div>
    </form>

    <!-- Mensaje en caso de no haber tareas -->
    <div class="no-result" v-if="!todoStore.tasks.length && !todoStore.loading">
      <span></span>
      <br />
      <strong>Aún no hay tareas...</strong>
    </div>

    <!-- Lista de tareas -->
    <template v-else-if="todoStore.tasks.length && !todoStore.loading">
      <div class="task-container">
        <!-- Tarjetas de tarea -->
        <div class="card-task" v-for="task in todoStore.tasks" :key="task.id">
          <!-- Input para marcar tarea como completada -->
          <input
            v-if="task.id !== editingTaskId"
            type="checkbox"
            class="card-task_checkbox"
            :checked="task.done"
            v-on:click.prevent="updateTask(task.id)"
          />

          <!-- Nombre de la tarea (editable si está en modo edición) -->
          <strong v-if="task.id !== editingTaskId" class="card-task_name" :class="{ 'done': task.done }">
            {{ task.name }}
          </strong>

          <!-- Input para edición de nombre de tarea -->
          <input
            v-else
            type="text"
            v-model="task.editedName"
            class="card-task_input-edition"
          />

          <!-- Botones de acción -->
          <div v-if="task.id === editingTaskId">
            <button class="card-task_button-save" @click="saveEditedTask(task)">Guardar</button>
            <button class="card-task_button-cancel" @click="cancelEditTask(task.id)">Cancelar</button>
          </div>

          <!-- Botón para eliminar tarea -->
          <button
            type="button"
            class="card-task_button"
            v-on:click.prevent="deleteTask(task.id)"
          >X</button>

          <!-- Botón para iniciar edición de tarea -->
          <button
            v-if="task.id !== editingTaskId"
            type="button"
            class="card-task_button-edit"
            v-on:click.prevent="startEditTask(task.id)"
          >Editar</button>
        </div>
      </div>
    </template>

    <!-- Mensaje de carga -->
    <div class="loading-container" v-if="todoStore.loading">
      <strong>Cargando...</strong>
    </div>
  </Layout>
</template>

<script lang="ts">
// Importación de módulos y componentes
import Layout from '../layouts/default.vue';
import { defineComponent, ref } from 'vue';
import { useTodoStore } from '../store/todo';
import { Task } from '../models/task.models';

export default defineComponent({
  components: { Layout },

  setup() {
    // Estado local y acceso a la tienda
    const taskName = ref<string>('');
    const todoStore = useTodoStore();
    const errorMessage = ref<string>('');
    const showErrorPopup = ref<boolean>(false);
    const editingTaskId = ref<string | null>(null);

    // Función para agregar nueva tarea
    function createTask(): void {
  if (!taskName.value.trim()) {
    errorMessage.value = 'Debe indicar la tarea a almacenar';
    showErrorPopup.value = true;

    setTimeout(() => {
      showErrorPopup.value = false;
      errorMessage.value = '';
    }, 2000);

    return;
  }

  // Llamamos al método addTask de la tienda
  todoStore.addTask(taskName.value);

  // Limpia el campo de entrada después de agregar la tarea
  taskName.value = '';
}

    // Función para eliminar tarea
    function deleteTask(id: string): void {
      todoStore.deleteTask(id);
    }

    // Función para actualizar estado de tarea (completada/no completada)
    function updateTask(id: string): void {
      todoStore.updateTask(id);
    }

    // Función para iniciar edición de tarea
    function startEditTask(id: string): void {
      editingTaskId.value = id;
    }

    // Función para guardar tarea editada
    function saveEditedTask(task: Task): void {
      if (task.editedName !== undefined) {
        task.name = task.editedName;
      }
      task.editedName = undefined;
      editingTaskId.value = null;
    }

    // Función para cancelar edición de tarea
    function cancelEditTask(id: string): void {
      const task = todoStore.tasks.find((task) => task.id === id);
      if (task) {
        task.editedName = undefined;
        editingTaskId.value = null;
      }
    }

    // Retorno de datos y funciones para el componente
    return {
      taskName,
      createTask,
      deleteTask,
      updateTask,
      startEditTask,
      saveEditedTask,
      cancelEditTask,
      todoStore,
      errorMessage,
      showErrorPopup,
      editingTaskId,
    };
  }
});
</script>

<style lang="scss">
// Variables de estilo
$primary-color: #3498db;
$white-color: #ffffff;
$gray-color: #f1f1f1;
$border: 10px;
$padding: 10px;

// Estilos del formulario
.form-task {
  width: 100%;
  display: flex;

  &_input {
    all: initial;
    width: calc(65% - 1rem);
    background-color: $gray-color;
    padding: $padding;
    border-radius: $border;
  }

  &_button {
    all: initial;
    width: 35%;
    background-color: $primary-color;
    border-radius: $border;
    padding: $padding;
    color: $white-color;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-left: 1rem;
  }

  // Estilos del mensaje de error
  .error-message {
    color: red;
    margin-top: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.show-popup {
      opacity: 1;
    }
  }

  // Estilos de mensajes sin resultados y de carga
  .no-result,
  .loading-container {
    text-align: center;
    span {
      font-size: xx-large;
    }
  }

  // Estilos de la lista de tareas
  .task-container {
    width: 100%;

    .card-task {
      background: $gray-color;
      border-radius: $border;
      padding: $padding;
      margin-bottom: 13rem;

      // Estilos del checkbox
      &_checkbox {
        transition: all 0.4 ease;
      }

      // Estilos del nombre de la tarea
      &_name {
        text-transform: uppercase;
        margin-left: 1rem;
      }

      // Estilos de tarea completada
      &.done {
        .card-task_name {
          text-decoration: line-through;
          opacity: 0.7;
        }
      }

      // Estilos de botones de acción
      &_button,
      &_button-edit,
      &_button-save,
      &_button-cancel {
        all: initial;
        float: right;
        cursor: pointer;
      }

      // Ajustes de margen para los botones
      &_button-edit,
      &_button-save,
      &_button-cancel {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
