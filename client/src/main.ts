import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import configureMeasurements from 'convert-units'
import length, { type LengthSystems, type LengthUnits } from 'convert-units/definitions/length'
import mass, { type MassSystems, type MassUnits } from 'convert-units/definitions/mass'
import time, { type TimeSystems, type TimeUnits } from 'convert-units/definitions/time'
import { isImperial } from './viewmodel/usersession'

const app = createApp(App)

app.use(router)

app.mount('#app')

export function toUnitStringInLocale(value: number): string {
    const convert = configureMeasurements({length})
        return (isImperial().value) ? Math.round(convert(value).from('m').toBest({system: 'imperial',exclude:['fathom','nMi']})?.val as number) + ' ' + convert(value).from('m').toBest({system: 'imperial',exclude:['fathom','nMi']})?.unit : Math.round(convert(value).from('m').toBest({system: 'metric'})?.val as number) + ' ' + convert(value).from('m').toBest({system: 'metric'})?.unit
}

export function toWeightInLocale(value:number): string
{
    const convert = configureMeasurements({mass})
    return (isImperial().value) ? convert(value).from('kg').to('lb') + ' ' + convert(value).from('kg').toBest({system:'imperial'})?.unit : value + ' kg'
}

export function postTimeDifference(value:number): string
{
    const convert = configureMeasurements({time})
    return Math.round(convert(Date.now()-value).from('ms').toBest()?.val as number) + " " + (convert(Date.now()-value).from('ms').toBest()?.singular as string) + ((Math.round(convert(Date.now()-value).from('ms').toBest()?.val as number) === 1) ? " ago" : "s ago");
}