import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

// Doing this because bulma doesn't add a global tracker
// for system-wide dark theme as it only is a css library.

// I would like the ability to dynamically add classes to
// elements through binding based on dark mode settings

//Tracks the media query for system-wide dark mode
export const dark = () => ref(window.matchMedia("(prefers-color-scheme: dark)"))



const app = createApp(App)

app.use(router)

app.mount('#app')
