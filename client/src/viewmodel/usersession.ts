import { ref } from 'vue'
import { type User, getUsers } from '@/model/users'

const auth = ref({} as User)
const imperial = ref(true)
const loggedIn = ref(false)
export const isImperial = () => imperial
export const isLoggedIn = () => loggedIn

export const shouldShowModalAcc = ref(false)
export const shouldShowModalSign = ref(false)
export const shouldShowModalExc = ref(false)

export const LOGIN_RESP = ['OK','INV'] as const;
export type LoginResponse = typeof LOGIN_RESP[number];

export const userRef = () => auth

export function login(u: {username: string, password:string}) : LoginResponse
{
    let userCheck = getUsers().find((test) => u.username === test.username)
    if(userCheck === undefined)
    {
        return 'INV'
    }
    if(userCheck.password === u.password)
    {
        auth.value = userCheck;
        loggedIn.value = true;
        imperial.value = userCheck.imperialUnits as boolean
        shouldShowModalSign.value = false
        return 'OK'
    }
    else {
        console.log(u.username, userCheck?.username, u.password, userCheck?.password)
        return 'INV'
    }
}

export function logout()
{
    auth.value = {} as User
    loggedIn.value = false;
}

