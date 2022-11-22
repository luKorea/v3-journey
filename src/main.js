import { createApp } from 'vue'

import 'normalize.css'
import './assets/css/index.css'

import pinia from './stores'
import router from "@/router";
import App from './App.vue'


createApp(App).use(pinia).use(router).mount('#app')
