import { type User } from './users'
import workouts from '../data/workouts.json'

export type Workout = {
    id: number;
    creator: User;
    postTime: number;
    msg: string;
    distance: number;
    duration: number;
}

export function getWorkouts(u: User): Workout[]
{
    let res = workouts.workouts.filter((w) => {w.creator.id == u.id});
    return res;
}

export function getWorkout(id: number): Workout
{
    return workouts.workouts.find((element) => element.id == id);
}
