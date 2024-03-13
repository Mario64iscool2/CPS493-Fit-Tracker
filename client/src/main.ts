import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import configureMeasurements from 'convert-units';
import { isImperial } from './viewmodel/usersession'
import length from 'convert-units';
import mass from 'convert-units';

const app = createApp(App)

app.use(router)

app.mount('#app')

export function toUnitStringInLocale(value: number): string {
    const convert = configureMeasurements(length)
        return (isImperial().value) ? convert(value).from('m').toBest({system: 'imperial'}) + ' ' + convert(value).from('m').toBest({system: 'imperial'})?.unit : convert(value).from('m').toBest({system: 'metric'}) + ' ' + convert(value).from('m').toBest({system: 'metric'})?.unit
}

export function toWeightInLocale(value:number)
{
    const convert = configureMeasurements(mass)
    return (isImperial().value) ? convert(value).from('kg').to('lb') + ' ' + convert(value).from('kg').toBest({system:'imperial'})?.unit : value + ' kg'
}