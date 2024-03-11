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
    imperialUnits: boolean | false,
    admin: boolean | false
  }

export function getUsers(): User[] {
    return users.users;
}

export function getUserById(a: number): User {
    return users.users.filter((i)=>i.id==a)[0];
}

export function addUser(user: User)
{
  let temp = user;
  temp.id = users.total;
  temp.birthDate = new Date(Date.parse(user.birthDate as string)).toJSON();
  
  // Age Calculation
  let month_diff = Date.now() - Date.parse(user.birthDate)
  let age_dt = new Date(month_diff)
  let year = age_dt.getUTCFullYear();
  temp.age = Math.abs(year-1970);
  if(user.image == "")
  {
    temp.image = 'client/public/no-profile-image.png'
  }
  temp.imperialUnits = (user.imperialUnits || false) as boolean;
  temp.admin = false;
  users.users.push(temp);
  users.total = users.users.length;
}