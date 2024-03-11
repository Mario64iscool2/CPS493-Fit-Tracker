import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import configureMeasurements from 'convert-units'
import length from 'convert-units'
import { isImperial } from './viewmodel/usersession'



const app = createApp(App)

app.use(router)

app.mount('#app')

export function toUnitStringInLocale(distance: number): string {
    const convert = configureMeasurements(length)
    
    return (isImperial().value) ? convert(distance).from('m').toBest({system: 'imperial'}) + ' ' + convert(distance).from('m').toBest({system: 'imperial'})?.unit : convert(distance).from('m').toBest({system: 'metric'}) + ' ' + convert(distance).from('m').toBest({system: 'metric'})?.unit
}