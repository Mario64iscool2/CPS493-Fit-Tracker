<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { type User } from '@/model/users'
import { userRef, isLoggedIn } from '@/viewmodel/usersession'

defineEmits<{
loadSignInModal : [],
loadAccountModal : []
}>()

let isActive = ref(false);
function toggleNavMenu() {
    isActive.value = !isActive.value;
}


</script>

<template>
    <nav class="navbar" :class="{'is-info' : userRef().value.admin}">
        <div class="navbar-brand">
            <p style="text-align: center;padding-left: 8px;padding-right: 8px;">Icon<br />Pending</p>
            <p class="navbar-item has-text-centered has-text-weight-bold is-size-5 is-hidden-desktop" v-if="userRef().value.admin">Admin Mode</p>
            <a role="button" class="navbar-burger" :class="{ 'is-active' : isActive }" @click="toggleNavMenu">
            <span style="stroke: black;"></span>
            <span style="stroke: black;"></span>
            <span style="stroke: black;"></span>
            </a>
        </div>
        <div id="navMenu" class="navbar-menu" :class="{ 'is-active' : isActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/home">Home</RouterLink>
                <RouterLink class="navbar-item" to="/profile">My Profile</RouterLink>
                <RouterLink class="navbar-item" to="/admin" v-if="userRef().value.admin">Admin View</RouterLink>
                <p class="navbar-item has-text-centered has-text-weight-bold is-size-5 is-hidden-touch" v-if="userRef().value.admin">Admin Mode</p>
            </div>
            <div class="navbar-end">
                <div class="buttons navbar-item">
                    <a class="button is-primary"
                    @click="$emit('loadAccountModal')"
                    v-hide="isLoggedIn().value" >Sign up</a>
                    <a class="button is-light"
                    @click="$emit('loadSignInModal')"
                    v-hide="isLoggedIn().value">Log in</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .router-link-active {
        border-bottom: 2px solid #FF8000;
    }
</style>