<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/viewmodel/usersession';

defineEmits<{
    submit : []
}>()

let dangerUserField = ref(false)
let isUsernameValid = ref(false)

const att = ref({username:"", password:""})

</script>
<template>
    <div class="modal" >
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">You are not logged in!</p>
            </header>
            <form @submit.prevent="login(att)">
            <section class="modal-card-body">
                <p class="subtitle">Let's get you signed in.</p>
                <div class="columns">
                    <div class="column is-three-quarters">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="username"
                                    minlength="6" maxlength="16"
                                    @invalid="dangerUserField = true; isUsernameValid = false"
                                    @input="dangerUserField = false; isUsernameValid = false"
                                    @focusout="isUsernameValid = (!dangerUserField) ? true : false"
                                    :class="{ 'is-danger ' : dangerUserField, 'is-success' : !dangerUserField && isUsernameValid }" v-model="att.username" required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="" minlength="8" maxlength="32"  v-model="att.password" required>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <input class="button is-primary" type="submit" value="Sign In" formmethod="dialog"></input>
                </div>
            </footer>
        </form>
    </div>
    </div>
</template>
