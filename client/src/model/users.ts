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
    age: number
    email: string
    username: string
    password: string
    image: string
    birthDate: string
  }

export function getUsers(): User[] {
    return users.users;
}

export function getUserById(a: number): User {
    return users.users.filter((i)=>i.id==a)[0];
}

export function addUser(user: User)
{
  let temp:User = user;
  temp.id = users.total;
  temp.birthDate = new Date(Date.parse(user.birthDate as string)).toJSON();
  
  // Age Calculation
  let month_diff = Date.now() - Date.parse(user.birthDate)
  let age_dt = new Date(month_diff)
  let year = age_dt.getUTCFullYear();
  temp.age = Math.abs(year-1970);
  if(user.image == "")
  {
    user.image = 'client/public/no-profile-image.png'
  }
  users.users.push(temp as User);
  users.total = users.users.length;
}