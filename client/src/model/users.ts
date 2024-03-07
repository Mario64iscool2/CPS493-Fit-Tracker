import users from '../data/users.json'

export interface Users {
    users: User[]
    total: number
    skip: number
    limit: number
  }
  
  export interface User {
    id: number
    firstName: string
    lastName: string
    age?: number
    email?: string
    username: string
    image?: string
  }

export function getUsers(): User[] {
    return users.users;
}

export function getUserById(a: number): User {
    return users.users.filter((i)=>i.id==a)[0];
}