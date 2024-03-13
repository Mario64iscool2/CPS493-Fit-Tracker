import { ref, computed } from 'vue'
import { type User, getUsers } from '@/model/users'
import type { RefSymbol } from '@vue/reactivity'

const auth = ref({} as User)
const imperial = ref(true)
const loggedIn = ref(false)
export const isImperial = () => imperial
export const isLoggedIn = () => loggedIn

export const shouldShowModalAcc = ref(false)
export const shouldShowModalSign = ref(false)

export const userRef = () => auth

export function login(u: {username: string, password:string})
{
    let userCheck = getUsers().find((test) => u.username === test.username)
    if(userCheck?.password === u.password)
    {
        auth.value = userCheck;
        loggedIn.value = true;
        imperial.value = userCheck.imperialUnits as boolean
        shouldShowModalSign.value = false
    }
    else {
        console.log(u.username, userCheck?.username, u.password, userCheck?.password)
    } //Do nothing, as the login failed.
}

export function logout()
{
    auth.value = {} as User
    loggedIn.value = false;
}

