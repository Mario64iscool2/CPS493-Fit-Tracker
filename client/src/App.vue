<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SignInModal from './components/SignInModal.vue';
import CreateAccountModal from './components/CreateAccountModal.vue';
import AddWorkout from './components/AddWorkout.vue';
import { isLoggedIn, login, shouldShowModalAcc, shouldShowModalSign, shouldShowModalExc } from './viewmodel/usersession';
const loggedIn = isLoggedIn()

if(sessionStorage.getItem('user'))
    {
        const local = JSON.parse(sessionStorage.getItem('user')??"{}")
        login({'username':local.username, 'password':local.password})
    }

</script>

<template>
    <NavBar @load-account-modal="shouldShowModalAcc=true"
            @load-sign-in-modal="shouldShowModalSign=true"/>
    <div style="height: 4rem;"></div>
    <!-- Spacing so the bar doesn't overlap the content of the pages -->
    <RouterView />
    <div class="is-clipped">
    <SignInModal :class="{ 'is-active' : shouldShowModalSign}" @close="shouldShowModalSign = false" @switch-modal="shouldShowModalSign=false;shouldShowModalAcc=true"/>
    <CreateAccountModal :class="{ 'is-active' : shouldShowModalAcc }" @close="shouldShowModalAcc = false" @switch-modal="shouldShowModalSign=true;shouldShowModalAcc=false"/>
    <AddWorkout @close="shouldShowModalExc = false" :class="{'is-active' : shouldShowModalExc}"/>
</div>
</template>

<style scoped>
</style>
