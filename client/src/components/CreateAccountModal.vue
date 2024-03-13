<script setup lang="ts">
import { ref } from 'vue'
import { type User, addUser,getUsers, getUserById} from '@/model/users'
import { shouldShowModalAcc } from '@/viewmodel/usersession'
import type { RefSymbol } from '@vue/reactivity';
defineEmits<{
    submit : []
}>()

const dangerUserField = ref(false)
const dangerEmailField = ref(false)
const dangerPassField = ref(false)
const dangerNameField1 = ref(false)
const dangerNameField2 = ref(false)
const dangerBdayField = ref(false)
const dangerCheckField = ref(false)
const isUsernameValid = ref(true)
const isEmailValid = ref(false)
const isEmailReused = ref(false)

const tempUser = ref({id: 0, firstName:"",lastName:"",username:"",email:"",birthDate:"",image:"",password:"",imperialUnits:true,age:0,admin:false})

const passCheck = ref({password:"",verifyPass:""})

function captureSubmit()
{
    dangerNameField1.value = (tempUser.value.firstName == "")
    dangerNameField2.value = (tempUser.value.firstName == "")
    isUsernameValid.value = !(tempUser.value.username.match(RegExp('\\W*')))

    dangerUserField.value  = (tempUser.value.username.length < 6 || getUsers().findIndex((e)=>e.username === tempUser.value.username) != -1) || !isUsernameValid
    dangerPassField.value = (passCheck.value.password.length < 8)
    //No Two accounts can share an email.
    isEmailReused.value = ((getUsers().findIndex((e)=> e.email === tempUser.value.email) != -1) && tempUser.value.email.length !=0)
    isEmailValid.value = tempUser.value.email.includes('@') && tempUser.value.email.includes('.')
    dangerEmailField.value = isEmailReused.value || !(isEmailValid.value)
    dangerCheckField.value = (passCheck.value.verifyPass.length < 8 || passCheck.value.password !== passCheck.value.verifyPass)
    if(dangerNameField1.value || dangerNameField2.value || dangerUserField.value || dangerPassField.value || dangerCheckField.value || dangerEmailField.value || isEmailReused.value || dangerBdayField.value)
    {
        return;
    }
    tempUser.value.id = getUsers().length
    let i = getUsers().length
    while(getUserById(i))
        {
            i++;
        }
    tempUser.value.id = i;
    tempUser.value.password = passCheck.value.password;
    addUser(tempUser.value);
    shouldShowModalAcc.value=false;
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <dialog class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Create your account</p>
            </header>
            <form id='createForm' method="dialog" @submit.prevent="captureSubmit">
            <section class="modal-card-body">
                <p class="subtitle">First things first.</p>
                <div class="field">
                    <div class="label">
                        <label class="label">Name&nbsp;<small class="is-inline help is-danger">(Required)</small></label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="First Name" required @input="dangerNameField1 = false"
                                        :class="{ 'is-danger' : dangerNameField1 }" v-model="tempUser.firstName" autocomplete="given-name">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Last Name" required @input="dangerNameField2 = false"
                                        :class="{ 'is-danger ' : dangerNameField2 }" v-model="tempUser.lastName" autocomplete="family-name">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Birthday&nbsp;<small class="is-inline help is-danger">(Required)</small></label>
                            <div class="control">
                                <input class="input" type="date" required @input="dangerBdayField = false"
                                        :class="{ 'is-danger' : dangerBdayField }" v-model="tempUser.birthDate" autocomplete="bday">
                            </div>
                        </div>
                <div class="field">
                    <label class="label">Username <small class="help is-inline">(Must contain alphanumeric characters
                            and underscores only)</small></label>
                    <div class="control">
                        <input class="input" type="text" placeholder="username" minlength="6" maxlength="16" @input="dangerUserField = false; isUsernameValid = false"
                                        :class="{ 'is-danger ' : dangerUserField, 'is-success' : isUsernameValid}" v-model="tempUser.username"
                                        autocomplete="username">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email <small class="help is-inline">(Optional)</small>&nbsp;<small class="help is-inline is-danger" v-if="isEmailReused">Email already in use!</small></label>
                    <div class="control">
                        <input class="input" type="text" placeholder="user@example.com" maxlength="320" @input="isEmailReused=false; isEmailValid=true; dangerEmailField=false"
                                        :class="{ 'is-danger ' : dangerEmailField, 'is-success' : (isEmailValid && !isEmailReused)}" v-model="tempUser.email"
                                        autocomplete="email">
                    </div>
                </div>
                <div class="field is-narrow">

                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="" maxlength="32" @invalid="dangerPassField = true" @input="dangerPassField = false"
                                        :class="{ 'is-danger ' : dangerPassField }" v-model="passCheck.password" autocomplete="new-password">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control">
                        <input class="input" type="password"
                        maxlength="32"
                        v-model="passCheck.verifyPass"
                        :class="{ 'is-danger ' : dangerCheckField }"
                        autocomplete="current-password">
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <input class="button is-primary" type="submit" value="Create Account"></input>
                </div>
            </footer>
        </form>
    </dialog>
    </div>
</template>

<style scoped>
dialog {
    background-color: transparent;
}
</style>
