import { type User } from './users'
import workouts from '../data/workouts.json'

export const disciplines = ['biking','climbing','hiking','running','swimming','walking','weightlifting']

export interface IWorkout {
    id: number
    creator: User
    postTime: Date | string
    msg: string
    discipline: string
    distance?: number
    elevation?: number
    reps?: number
    weight?: number
    duration: number
}

export interface Biking extends IWorkout {
    discipline: "biking"
    distance: number
}

export interface Climbing extends IWorkout {
    discipline: "climbing"
    elevation: number
}

export interface Hiking extends IWorkout {
    
    distance: number
    elevation: number
}

export interface Swimming extends IWorkout {
    distance: number
}

export interface Walking extends IWorkout {

}

export interface Weightlift extends IWorkout {
    weight: number
    reps: number
}

export function getWorkouts(u: User): IWorkout[]
{
    
    let res = workouts.workouts.filter(item => item.creator.id === u.id) as IWorkout[];
    return res;
}

export function getWorkout(id: number): IWorkout
{
    return workouts.workouts.find((w) => w.id === id) as IWorkout;
}
