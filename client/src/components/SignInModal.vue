<script setup lang="ts">
import { ref } from 'vue'
import { login, shouldShowModalAcc, shouldShowModalSign } from '@/viewmodel/usersession';

defineEmits<{
    submit : []
}>()

const att = ref({username:"", password:""})
const lastResponse = ref('');
</script>
<template>
    <div class="modal" >
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">You are not logged in!</p>
                <button class="delete" aria-label="close" @click="shouldShowModalSign=false"></button>
            </header>
            <form @submit.prevent="if(lastResponse=== 'INV') {};  lastResponse = login(att)">
            <section class="modal-card-body">
                <p class="subtitle">Let's get you signed in.</p>
                <div class="columns">
                    <div class="column is-three-quarters">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="username"
                                    minlength="6" maxlength="16"
                                    @input="lastResponse = ''"
                                    :class="{ 'is-danger' : lastResponse === 'INV' }" v-model="att.username" required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="" minlength="8" maxlength="32" :class="{ 'is-danger ' : lastResponse === 'INV' }" v-model="att.password" required>
                            </div>
                        </div>
                        <p class="is-help has-text-danger">{{ lastResponse==='INV'?'Incorrect username or password!' : '' }}</p>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <input class="button is-primary" type="submit" value="Sign In" formmethod="dialog"/>
                    <span class="is-help">Don't have an account?</span><span>&nbsp;</span><span class="is-link is-clickable is-underlined has-text-link has-text-weight-medium" @click="shouldShowModalAcc=true;shouldShowModalSign=false">Create one here!</span>
                </div>
            </footer>
        </form>
    </div>
    </div>
</template>

<style scoped>

@keyframes shake {
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
}

input:user-invalid, input.is-danger {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.6rem #ff0000;
}

</style>
