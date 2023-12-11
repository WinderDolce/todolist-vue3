// Importamos el sistema de gestión de estado Pinia
import { createPinia } from 'pinia';

// Importamos la función createApp y el componente principal App de Vue 3
import { createApp } from 'vue';
import App from './views/App.vue';

// Creamos una instancia de la aplicación Vue
const app = createApp(App);

// Utilizamos Pinia como plugin para la gestión del estado
app.use(createPinia());

// Montamos la aplicación en el elemento con el ID 'app' en el DOM
app.mount('#app');