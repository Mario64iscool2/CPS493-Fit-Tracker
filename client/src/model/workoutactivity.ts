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

export function getWorkouts(u: User): IWorkout[]
{
    
    let res = workouts.workouts.filter(item => item.creator.id === u.id) as IWorkout[];
    return res;
}

export function getWorkout(id: number): IWorkout
{
    return workouts.workouts.find((w) => w.id === id) as IWorkout;
}
