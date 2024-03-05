import {type User} from './users'
import { }

export interface WorkoutActivity {
    id: number;
    creator: User | undefined;
    postTime: Date;
    msg: string;
    distance: number;
    duration: number;
}

export function getWorkouts(u: User): WorkoutActivity[] | null
{
    return ;
}

