import { api } from '@/viewmodel/usersession'
import {apiQuery} from '@/model/myApi'
  
  export interface User {
    id: number
    firstName: string
    lastName: string
    age?: number
    email?: string
    username: string
    password?: string
    image?: string
    birthDate: string
    unitSystem: string,
    role: string,
    friends: number[],
    creationTimestamp: number
  }

export async function getAll() {
  const data = await apiQuery<User[]>("users")
  return data.data;
}

export async function getUserById(a: number) {
  const data = await api<User>(`users/${a}`)
  return data.data;
}

export async function getFriendsOf(id: number): Promise<User[]>
{
  const data = await getAll().then(x=>x.filter((i) => getUserById(id).then(x=> x.friends.includes(i.id))))
  return data;
}

export async function addUser(user: User)
{
  let temp:User = {id:user.id,firstName:user.firstName,lastName:user.lastName,username:user.username,email:user.email,birthDate:user.birthDate,image:user.image,password:user.password,unitSystem:'imperial',age:0,role:'user', friends:[], creationTimestamp:Date.now()};
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
  temp.unitSystem = (user.unitSystem || 'imperial');
  temp.role = 'user';
  temp.friends = [];
  api<User>('users/add', temp);
}

export async function editUser(uid: number)
{

}

export async function deleteUser(uid: number)
{
  //TODO: Once session validation is in-place, attempt to allow this.
}

export async function search(q:string) {
  const data = await apiQuery<User[]>('users/search',q)
  return data;
}

