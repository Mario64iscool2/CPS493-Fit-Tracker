<script setup lang="ts">
import { ref } from 'vue'
import { type User, addUser,getUsers} from '@/model/users'
import { shouldShowModalAcc } from '@/viewmodel/usersession'
import type { RefSymbol } from '@vue/reactivity';
defineEmits<{
    submit : []
}>()

const dangerUserField = ref(false)
const dangerPassField = ref(false)
const dangerNameField1 = ref(false)
const dangerNameField2 = ref(false)
const dangerBdayField = ref(false)
const dangerCheckField = ref(false)
const isUsernameValid = ref(true)

const tempUser = ref({id: 0, firstName:"",lastName:"",username:"",email:"",birthDate:"",image:"",password:"",imperialUnits:"",age:0,admin:false})

const passCheck = ref({password:"",verifyPass:""})

function captureSubmit()
{
    dangerNameField1.value = (tempUser.value.firstName == "")
    dangerNameField2.value = (tempUser.value.firstName == "")
    dangerUserField.value  = (tempUser.value.username.length < 6 || getUsers().findIndex((e)=>e.username === tempUser.value.username) != -1)
    dangerPassField.value = (passCheck.value.password.length < 8)
    dangerCheckField.value = (passCheck.value.verifyPass.length < 8 || passCheck.value.password !== passCheck.value.verifyPass)

    if(dangerNameField1.value || dangerNameField2.value || dangerUserField.value || dangerPassField.value || dangerCheckField.value || dangerBdayField.value)
    {
        return;
    }
    getUsers().push(tempUser);
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
                        <label class="label">Name <small class="is-inline help">(Required)</small></label>
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
                    <label class="label">Birthday</label>
                            <div class="control">
                                <input class="input" type="date" placeholder="First Name" required @input="dangerNameField1 = false"
                                        :class="{ 'is-danger' : dangerNameField1 }" v-model="tempUser.birthDate" autocomplete="bday">
                            </div>
                        </div>
                <div class="field">
                    <label class="label">Username <small class="help is-inline">(Must contain alphanumeric characters
                            and underscores only)</small></label>
                    <div class="control">
                        <input class="input" type="text" placeholder="username" minlength="6" maxlength="16" @input="dangerUserField = false"
                                        :class="{ 'is-danger ' : dangerUserField, 'is-success' : isUsernameValid}" v-model="tempUser.username"
                                        autocomplete="username">
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
                        placeholder="" maxlength="32"
                        v-model="passCheck.verifyPass"
                        :class="{ 'is-danger ' : dangerCheckField }"
                        autocomplete="new-password">
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
