import 'primeicons/primeicons.css';

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Componentes from './primevue';
import router from './router'

// createApp(App).mount('#app')

//app.use(PrimeVue;
const app = createApp(App);
app.use(PrimeVue, { inputStyle: 'filled' });
app.use(router);

Object.entries(Componentes).forEach(([name, component]) => {
  app.component(name, component);
});

app.mount('#app');
