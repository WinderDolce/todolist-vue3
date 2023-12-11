import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

// Configurar Pinia antes de las pruebas
const app = createApp({});
app.use(createPinia());

describe('App.vue', () => {
  it('renders without errors', async () => {
    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('creates a task when form is submitted with a non-empty task name', async () => {
    const wrapper = shallowMount(App);
    await wrapper.setData({ taskName: 'New Task' });
    await wrapper.vm.$nextTick();
    wrapper.find('.form-task_button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.todoStore.tasks.length).toBe(1);
    expect(wrapper.vm.todoStore.tasks[0].name).toBe('New Task');
  });

  it('does not create a task when form is submitted with an empty task name', async () => {
    const wrapper = shallowMount(App);
    await wrapper.setData({ taskName: '' });
    await wrapper.vm.$nextTick();
    wrapper.find('.form-task_button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.todoStore.tasks.length).toBe(0);
  });

  it('deletes a task when delete button is clicked', async () => {
    const wrapper = shallowMount(App);
    await wrapper.vm.todoStore.addTask('Task to delete');
    await wrapper.vm.$nextTick();
    wrapper.find('.card-task_button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.todoStore.tasks.length).toBe(0);
  });

  it('marks a task as done when checkbox is checked', async () => {
    const wrapper = shallowMount(App);
    await wrapper.vm.todoStore.addTask('Task to mark as done');
    await wrapper.vm.$nextTick();
    wrapper.find('.card-task_checkbox').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.todoStore.tasks[0].done).toBe(true);
  });

  it('shows validation error message when submitting an empty task', async () => {
    const wrapper = shallowMount(App);
    await wrapper.setData({ taskName: '' });
    await wrapper.vm.$nextTick();
    wrapper.find('.form-task_button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.error-message').text()).toBe('Debe indicar la tarea a almacenar');
  });
});