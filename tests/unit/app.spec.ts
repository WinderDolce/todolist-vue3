import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { mount, shallowMount } from '@vue/test-utils';
import App from '../../src/views/App.vue';

const app = createApp({});
app.use(createPinia());

describe('App.vue', () => {
  it('renders without errors', async () => {
    const wrapper = shallowMount(App);
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
  });

});