import { type User } from './users'
import workouts from '../data/workouts.json'

export const disciplines = ['biking','climbing','hiking','running','swimming','walking','weightlifting']

export interface IWorkout {
    id: number,
    creator: number,
    postTime: string,
    msg: string,
    discipline: string,
    distance?: number,
    duration: number,
    reps?: number,
    weight?: number,
    elevation?: number,
}

export function getWorkouts(u: User): IWorkout[]
{
    
    let res = workouts.workouts.filter(item => item.creator === u.id) as IWorkout[];
    return res;
}

export function getWorkout(id: number): IWorkout
{
    return workouts.workouts.find((w) => w.id === id) as IWorkout;
}

// I had to fight with Typescript and ChatGPT for over and hour
// to figure out why I couldn't push my IWorkout object.
export function addWorkout(w: {
    id: number,
    creator: number,
    postTime: string,
    discipline: string,
    distance?: number,
    elevation?: number,
    duration: number,
    msg: string,
    reps: number,
    weight: number,
}) {
    workouts.total = workouts.workouts.length;
    const workout: IWorkout = {
        id: workouts.total,
        creator: w.creator,
        postTime: new Date(Date.parse(w.postTime)).toJSON(),
        msg: w.msg,
        discipline: w.discipline,
        duration: w.duration,
    };
    if (['biking', 'hiking', 'running', 'swimming', 'walking'].includes(w.discipline)) {
        workout.distance = typeof w.distance === 'number' ? w.distance : undefined;
    }
    if (['climbing', 'hiking'].includes(w.discipline)) {
        workout.elevation = typeof w.elevation === 'number' ? w.elevation : undefined;
    }
    if (w.discipline === 'weightlifting') {
        workout.reps = w.reps;
        workout.weight = w.weight;
    }
    (workouts.workouts as IWorkout[]).push(workout);
}
