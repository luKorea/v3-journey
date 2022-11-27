import { createApp } from 'vue'

import 'normalize.css'
import './assets/css/index.css'

import pinia from './stores'
import router from "@/router";
import App from './App.vue'
import directiveFocus from '@/directive/focus'
import directiveUnit from '@/directive/unit'


const app = createApp(App)

directiveFocus(app)
directiveUnit(app)

app.use(pinia);
app.use(router);
app.mount('#app');
