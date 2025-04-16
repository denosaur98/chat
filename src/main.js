import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vClickOutside from 'click-outside-vue3'

createApp(App).use(router).use(vClickOutside).mount('#app')
