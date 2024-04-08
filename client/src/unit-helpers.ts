import configureMeasurements from 'convert-units'
import length, { type LengthImperialUnits, type LengthSystems, type LengthUnits } from 'convert-units/definitions/length'
import mass, { type MassImperialUnits, type MassMetricUnits, type MassSystems, type MassUnits } from 'convert-units/definitions/mass'
import time, { type TimeSystems, type TimeUnits } from 'convert-units/definitions/time'
import { isImperial } from './viewmodel/usersession'

export function toUnitStringInLocale(value: number, excludes: LengthUnits = 'fathom'): string {
    const convert = configureMeasurements({ length });
    return (isImperial().value) ? Math.round(convert(value).from('m').toBest({ system: 'imperial', exclude: ['fathom', 'nMi',excludes] })?.val as number) + ' ' + convert(value).from('m').toBest({ system: 'imperial', exclude: ['fathom', 'nMi',excludes,'ft-us'] })?.unit : Math.round(convert(value).from('m').toBest({ system: 'metric' })?.val as number) + ' ' + convert(value).from('m').toBest({ system: 'metric' })?.unit
}

export function ItoM_M(value: number, unit: MassImperialUnits) {
    const convert = configureMeasurements({ mass });
    return convert(value).from(unit).to('kg');

}

export function ItoM_L(value: number, unit: LengthImperialUnits) {
    const convert = configureMeasurements({length});
    return convert(value).from(unit).to('m');
}


export function MtoI_M(value: number, unit: MassImperialUnits) {
    const convert = configureMeasurements({ mass });
    return convert(value).from('kg').to(unit);
}

export function MtoI_L(value: number, unit: LengthImperialUnits) {
    const convert = configureMeasurements({length});
    return convert(value).from('m').to(unit);
}


export function toWeightInLocale(value: number): string {
    const convert = configureMeasurements({ mass })
    return (isImperial().value) ? convert(value).from('kg').to('lb') + ' lb' : value + ' kg';
}

export function postTimeDifference(value: number): string {
    const convert = configureMeasurements({ time })
    return Math.round(convert(Date.now() - value).from('ms').toBest()?.val as number) + " " + (convert(Date.now() - value).from('ms').toBest()?.singular as string) + ((Math.round(convert(Date.now() - value).from('ms').toBest()?.val as number) === 1) ? " ago" : "s ago");
}