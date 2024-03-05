import users from '../data/users.json'

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    image: string;
}

export function getUsers(): User[] {
    return users.users;
}

export function getUser(a: number): User {
    return users.users[a]
}

export function addUser(u: User)
{
    
}