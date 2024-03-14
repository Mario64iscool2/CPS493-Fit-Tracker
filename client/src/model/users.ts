import { userRef } from '@/viewmodel/usersession'
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
    friends: number[]
  }

export function getUsers(): User[] {
    return users.users;
}

export function getUserById(a: number): User {
    return users.users.filter((i)=>i.id==a)[0];
}

export function getFriendsOf(id: number): User[]
{
  return users.users.filter((i) => getUserById(id).friends.includes(i.id))
}

export function addUser(user: User)
{
  users.total = users.users.length;
  let temp:User = {id:user.id,firstName:user.firstName,lastName:user.lastName,username:user.username,email:user.email,birthDate:user.birthDate,image:user.image,password:user.password,imperialUnits:true,age:0,admin:false, friends:[]};
  temp.birthDate = new Date(Date.parse(user.birthDate as string)).toJSON().substring(0,10);
  
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
  temp.friends = [];
  users.users.push(temp);
}

export function deleteUser(uid: number)
{
  if(users.users.find(u => u.id === uid)?.admin || userRef().value.id === uid)
  {
    return; //Can't attempt to delete ourselves, or other admins.
  }
    users.users.sort((i)=> i.id)
    users.users.splice(users.users.findIndex((i)=>i.id === uid),1)
}