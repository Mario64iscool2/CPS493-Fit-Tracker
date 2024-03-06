<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Create your account</p>
            </header>
            <section class="modal-card-body">
                <p class="subtitle">First things first.</p>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Name</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                <input class="input" type="text" placeholder="First Name">
                            </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                <input class="input" type="text" placeholder="Last Name">
                            </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="field has-addons">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="username" maxlength="16">
                            </div>
                        </div>
                        <div class="field is-narrow">

                                <label class="label">Password</label>
                                <div class="control">
                                <input class="input" type="password" placeholder="" maxlength="32">
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
                    <button class="button is-primary">Create Account</button>
                </div>
            </footer>
        </div>
    </div>
</template>
