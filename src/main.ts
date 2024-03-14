import { createApp } from 'vue'
import App from "./App.vue"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faCat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBook,faCat)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
