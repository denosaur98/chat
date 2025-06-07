import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vClickOutside from 'click-outside-vue3'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faCheck, faBars, faSms } from '@fortawesome/free-solid-svg-icons'
import { faTelegram, faSquareWhatsapp, faVk } from '@fortawesome/free-brands-svg-icons'

library.add(faEnvelope, faCheck, faBars, faTelegram, faSquareWhatsapp, faVk, faSms)

createApp(App).use(router).use(vClickOutside).component('FontAwesomeIcon', FontAwesomeIcon).mount('#app')
