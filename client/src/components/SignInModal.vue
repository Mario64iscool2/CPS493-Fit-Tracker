<script setup lang="ts">
import { ref } from 'vue'
import { login, shouldShowModalAcc, shouldShowModalSign } from '@/viewmodel/usersession';
import type { DataEnvelope } from '@/model/transportTypes';
import type { User } from '@/model/users'

defineEmits<{
    submit: []
}>()

const att = ref({ username: "", password: "" })
const lastResponse = ref({ data: {} as User, isSuccess: true, message: "" } as DataEnvelope<User>);
async function doLogin() {
    await login(att.value).then(e => {
        lastResponse.value = e;
        if (lastResponse.value.data != null) {
            shouldShowModalSign.value = false;
        }
    })
}

</script>
<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">You are not logged in!</p>
                <button class="delete" aria-label="close" @click="shouldShowModalSign = false"></button>
            </header>
            <form @submit.prevent="doLogin">
                <section class="modal-card-body">
                    <p class="subtitle">Let's get you signed in.</p>
                    <div class="columns">
                        <div class="column is-three-quarters">
                            <div class="field">
                                <label class="label">Username</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="username" minlength="6" maxlength="16"
                                        @input="(lastResponse = { isSuccess: true } as DataEnvelope<User>)"
                                        :class="{ 'is-danger': !lastResponse?.isSuccess }" v-model="att.username"
                                        required autocomplete="username">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control">
                                    <input class="input" type="password" placeholder="" minlength="8" maxlength="32"
                                        @input="(lastResponse = { isSuccess: true } as DataEnvelope<User>)"
                                        :class="{ 'is-danger': !lastResponse?.isSuccess }" v-model="att.password"
                                        required autocomplete="current-password">
                                </div>
                            </div>
                            <p class="is-help has-text-danger">{{ lastResponse?.message }}</p>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <input class="button is-primary" type="submit" value="Sign In" formmethod="dialog" />
                        <span class="is-help">Don't have an account?</span><span>&nbsp;</span><span
                            class="is-link is-clickable is-underlined has-text-link has-text-weight-medium"
                            @click="shouldShowModalAcc = true; shouldShowModalSign = false">Create one here!</span>
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

input:user-invalid,
input.is-danger {
    animation: shake 0.2s ease-in-out 0s 2;
    box-shadow: 0 0 0.6rem #ff0000;
}
</style>
