import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

// primevue 컴포넌트 import/////////////////////////
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Editor from 'primevue/editor';


///////////////////////////////////////////////////

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// primevue 컴포넌트 import/////////////////////////
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('Editor', Editor)
///////////////////////////////////////////////////

app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.mount('#app')
