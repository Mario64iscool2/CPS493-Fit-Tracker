<script setup lang="ts">
import { ref } from 'vue'
import { type User, addUser,getUsers} from '@/model/users'

defineEmits<{
    submit : []
}>()

const dangerUserField = ref(false)
const dangerPassField = ref(false)
const dangerNameField1 = ref(false)
const dangerNameField2 = ref(false)
const isUsernameValid = ref(true)

const tempUser = ref({} as User)

function captureSubmit()
{
    const form: HTMLFormElement = document.getElementById('createForm') as HTMLFormElement
    const inputs = form.elements;
    for(let i = 0; i < inputs.length; i++)
    {
        if(inputs[i].nodeName === "INPUT")
        {

        }
    }
}

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <dialog class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Create your account</p>
            </header>
            <form id='createForm' method="dialog" @submit="$emit('submit')">
            <section class="modal-card-body">
                <p class="subtitle">First things first.</p>
                <div class="field">
                    <div class="label">
                        <label class="label">Name <small class="is-inline help">(Required)</small></label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="First Name" required @invalid="dangerNameField1 = true" @input="dangerNameField1 = false"
                                        :class="{ 'is-danger' : dangerNameField1 }" name="first-name" >
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Last Name" required @invalid="dangerNameField2 = true" @input="dangerNameField2 = false"
                                        :class="{ 'is-danger ' : dangerNameField2 }" name="last-name">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Username <small class="help is-inline">(Must contain alphanumeric characters
                            and underscores only)</small></label>
                    <div class="control">
                        <input class="input" type="text" placeholder="username" minlength="6" maxlength="16" @invalid="dangerUserField = true" @input="dangerUserField = false"
                                        :class="{ 'is-danger ' : dangerUserField, 'is-success' : isUsernameValid}" name="username">
                    </div>
                </div>
                <div class="field is-narrow">

                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="" maxlength="32" @invalid="dangerPassField = true" @input="dangerPassField = false"
                                        :class="{ 'is-danger ' : dangerPassField }" name="pass">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="" maxlength="32">
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
