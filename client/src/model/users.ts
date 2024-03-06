import users from '../data/users.json'

export interface User {
    id: number;
    firstName: string | null;
    lastName?: string | null;
    email?: string | null;
    username: string | null;
    password?: string | null;
    image?: string | null;
}

export function getUsers(): User[] {
    return users.users;
}

export function getUserById(a: number): User {
    return users.users.filter((i)=>i.id==a)[0];
}