import { reactive, ref } from 'vue'
import { type User } from '@/model/users'
import type { DataEnvelope } from '@/model/transportTypes'
import { type Method } from '@/model/myApi'
import * as myApi from '@/model/myApi'

const auth = ref({} as User)

const session = reactive({
    user: {} as User,
    isLoading: 0
});
const imperial = ref(true)
const loggedIn = ref(false)
export const isImperial = () => imperial
export const isLoggedIn = () => loggedIn

export const shouldShowModalAcc = ref(false)
export const shouldShowModalSign = ref(false)
export const shouldShowModalExc = ref(false)

export const userRef = () => auth
export const sessionToken = ref(0);

export async function login(u: { username: string, password: string }): Promise<DataEnvelope<User>> {
    const resp = await api<User>('auth/login', { 'user': u.username, 'pass': u.password });
    console.log({resp})
    if (resp !== undefined) {
        if (resp.data != null) {
            auth.value = resp.data;
            imperial.value = resp.data.unitSystem === 'imperial';
            loggedIn.value = true;
            resp.data.password = u.password;
            sessionStorage.setItem('user', JSON.stringify(resp.data))
        }
    }
    return resp;
}

export async function befriendUser(id: number)
{
    const resp = await api<boolean>(`users/${userRef().value.id}?friend=${id}`)
    return resp;
}

export function api<T>(action: string, data?: unknown, method?: Method) {
    session.isLoading++;
    return myApi.api<T>(action, data, method)
        .then(x => {
            if (!x.isSuccess) {
                //Error Display TBD
            }
            return x;
        })
        .finally(() => session.isLoading--);
}

export function logout() {
    auth.value = {} as User
    sessionStorage.clear();
    loggedIn.value = false;
}

