<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SignInModal from './components/SignInModal.vue';
import CreateAccountModal from './components/CreateAccountModal.vue';
import { isLoggedIn, shouldShowModalAcc, shouldShowModalSign } from './viewmodel/usersession';
const loggedIn = isLoggedIn()


</script>

<template>
    <NavBar @load-account-modal="shouldShowModalAcc=true"
            @load-sign-in-modal="shouldShowModalSign=true"/>
    <RouterView />
    <SignInModal :class="{ 'is-active' : shouldShowModalSign}" />
    <CreateAccountModal :class="{ 'is-active' : shouldShowModalAcc }"/>
</template>

<style scoped>
</style>
