import { type User } from './users'
import workouts from '../data/workouts.json'

export interface Workout {
    id: number
    creator: User
    postTime: Date | string
    msg: string
    discipline?: string
    distance?: number
    elevation?: number
    weight?: number
    reps?: number
    duration: number
}


export function getWorkouts(u: User): Workout[]
{
    
    let res = workouts.workouts.filter(item => item.creator.id === u.id);
    return res;
}

export function getWorkout(id: number): Workout
{
    const idMatch = (w: Workout) => {w.id === id}
    return workouts.workouts.find(idMatch) as Workout;
}
