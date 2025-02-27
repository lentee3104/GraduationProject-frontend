import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia';
import router from '@/router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
// import '@fortawesome/fontawesome-free/css/all.css'

const pinia = createPinia()
library.add(faShoppingCart)


createApp(App)
    .use(autoAnimatePlugin)
    .use(router)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
