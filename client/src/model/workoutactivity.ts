import { type User } from './users'
import { api } from '@/viewmodel/usersession'
import { ItoM_L, ItoM_M, MtoI_L, MtoI_M } from '@/unit-helpers';
import type { LengthImperialUnits } from 'convert-units/definitions/length';
import type { MassUnits } from 'convert-units/definitions/mass';

export const disciplines = ['biking', 'climbing', 'hiking', 'running', 'swimming', 'walking', 'weightlifting'] as const;
export type Discipline = typeof disciplines[number];
export interface IWorkout {
    id: number,
    creator: number,
    postTime: string,
    msg: string,
    discipline: Discipline,
    distance?: number,
    duration: number,
    reps?: number,
    weight?: number,
    elevation?: number,
}

export async function getWorkouts(u: User): Promise<IWorkout[]> {
    if (u.id === undefined) {
        return [];
    }
    const res = (await api<IWorkout[]>(`workouts/user/${u.id}`)).data;
    return res;
}

///TODO: Make this an API Call Instead
export async function filterWorkouts(u: User, d: Discipline[]): Promise<IWorkout[]> {
    //let res = (workouts.workouts as IWorkout[]).filter()
    let res = (await api<IWorkout[]>('workouts/filter', { headers: { 'u': u.id, 'd': d } })).data
    return res;
}

export async function getWorkout(id: number): Promise<IWorkout> {
    return (await api<IWorkout>(`workouts/${id}`)).data;
}

export function addWorkout(w: {
    id: number,
    creator: number,
    postTime: string,
    discipline: Discipline,
    distance?: number,
    elevation?: number,
    durationHours: number,
    durationMinutes: number,
    msg: string,
    reps?: number,
    weight?: number,
}, units: { dist: LengthImperialUnits, elev: LengthImperialUnits, wght: MassUnits }) {
    // workouts.total = workouts.workouts.length;
    // const workout: IWorkout = {
    //     id: workouts.total,
    //     creator: w.creator,
    //     postTime: new Date(Date.now()).toJSON(),
    //     msg: w.msg,
    //     discipline: w.discipline,
    //     duration: w.durationHours*60 + w.durationMinutes,
    // };
    // if (['biking', 'hiking', 'running', 'swimming', 'walking'].includes(w.discipline)) {
    //     workout.distance = !Number.isNaN(w.distance) ? ItoM_L(w.distance as number, units.dist) : undefined;
    // }
    // if (['climbing', 'hiking'].includes(w.discipline)) {
    //     workout.elevation = typeof w.elevation === 'number' ? ItoM_L(w.elevation,units.elev) : undefined;
    // }
    // if (w.discipline === 'weightlifting') {
    //     workout.reps = w.reps;
    //     workout.weight = w.weight;
    // }

    // (workouts.workouts as IWorkout[]).push(workout);
}

