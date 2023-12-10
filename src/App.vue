<template>
  <Layout>
    <form class="form-task" v-on:submit.prevent="createTask">
      <input type="text" class="form-task_input" placeholder="Agregar nueva tarea" v-model="taskName">
      <button class="form-task_button">Crear tarea</button>

      <!-- Mostrar mensaje de error -->
      <div v-if="errorMessage" class="error-message" :class="{ 'show-popup': showErrorPopup }">
        {{ errorMessage }}
      </div>
    </form>

    <div class="no-result" v-if="!todoStore.tasks.length && !todoStore.loading">
      <span></span>
      <br />
      <strong>Aún no hay tareas...</strong>
    </div>

    <template v-else-if="todoStore.tasks.length && !todoStore.loading">
      <div class="task-container">
        <div class="card-task" v-for="task in todoStore.tasks">
          <input 
            type="checkbox" 
            class="card-task_checkbox" 
            :checked="task.done" 
            v-on:click.prevent="updateTask(task.id)" 
          />

          <strong class="card-task_name" :class="{ 'done': task.done }"> {{ task.name }}</strong>

          <button 
            type="button" 
            class="card-task_button"
            v-on:click.prevent="deleteTask(task.id)" 
          >X</button>
        </div>
      </div>
    </template>

    <div class="loading-container" v-if="todoStore.loading">
      <strong>Cargando...</strong>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from './layouts/default.vue';
import { defineComponent, ref } from 'vue';
import { useTodoStore } from './store/todo';

export default defineComponent({
  components: { Layout },

  setup() {
    const taskName = ref<string>('');
    const todoStore = useTodoStore();
    const errorMessage = ref<string>('');
    const showErrorPopup = ref<boolean>(false);

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

      todoStore.addTask(taskName.value);
      taskName.value = '';
    }

    function deleteTask(id: string): void {
      todoStore.deleteTask(id);
    }

    function updateTask(id: string): void {
      todoStore.updateTask(id);
    }

    return {
      taskName,
      createTask,
      deleteTask,
      updateTask,
      todoStore,
      errorMessage,
      showErrorPopup,
    };
  }
});
</script>

<style lang="scss">
$primary-color: #3498db;
$white-color: #ffffff;
$gray-color: #f1f1f1;
$border: 10px;
$padding: 10px;

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

  .error-message {
    color: red;
    margin-top: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.show-popup {
      opacity: 1;
    }
  }

  .no-result,
  .loading-container {
    text-align: center;
    span {
      font-size: xx-large;
    }
  }

  .task-container {
    width: 100%;

    .card-task {
      background: $gray-color;
      border-radius: $border;
      padding: $padding;
      margin-bottom: 13rem;

      &_checkbox {
        transition: all 0.4 ease;
      }

      &_name {
        text-transform: uppercase;
        margin-left: 1rem;
      }

      &.done {
        .card-task_name {
          text-decoration: line-through;
          opacity: 0.7;
        }
      }

      &_button {
        all: initial;
        float: right;
        cursor: pointer;
      }
    }
  }
}
</style>
