<script setup lang="ts">
import { ref } from 'vue'

let isImperial = ref(true)

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">You are not logged in!</p>
            </header>
            <section class="modal-card-body">
                <p class="subtitle">Let's get you signed in.</p>
                <div class="columns">
                    <div class="column is-three-quarters">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="username" maxlength="16">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="" maxlength="32">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-primary">Sign In</button>
                </div>
            </footer>
        </div>
    </div>
</template>
