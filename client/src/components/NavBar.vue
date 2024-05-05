<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { isDark } from '@/main'
import { userRef, isLoggedIn, logout } from '@/viewmodel/usersession'
import UserPanel from './UserPanel.vue'

defineEmits<{
    loadSignInModal: [],
    loadAccountModal: []
}>()

let isActive = ref(false);
function toggleNavMenu() {
    isActive.value = !isActive.value;
}
</script>

<template>
    <nav class="navbar has-shadow is-sticky is-fixed-top"
        :class="{ 'is-info': userRef().value.role === 'admin', 'is-dark': isDark() }" aria-label="main navigation">
        <div class="navbar-brand">
            <p class="navbar-item has-text-centered">Icon<br />Pending</p>
            <p class="navbar-item has-text-centered has-text-weight-bold is-size-5 is-hidden-desktop"
                v-if="userRef().value.role === 'admin'">Admin Mode</p>
            <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="toggleNavMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navMenu" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/">Home</RouterLink>
                <RouterLink class="navbar-item" to="/profile">My Profile</RouterLink>
                <RouterLink class="navbar-item" :to="{ path: '/admin' }" v-if="userRef().value.role === 'admin'">Admin
                    View</RouterLink>
                    <RouterLink class="navbar-item" :to="{path:'/search'}">Find Friends</RouterLink>
                <p class="navbar-item has-text-centered has-text-weight-bold is-size-5 is-hidden-touch"
                    v-if="userRef().value.role === 'admin'">Admin Mode</p>
            </div>
            <div class="navbar-end">
                <div class="buttons navbar-item is-large-touch is-flex is-justify-content-flex-start"
                    v-if="!isLoggedIn().value">
                    <a class="button is-primary is-large-touch" @click="$emit('loadAccountModal')">Sign up</a>
                    <a class="button is-outlined is-large-touch" @click="$emit('loadSignInModal')"
                        :class="{ 'is-light': isDark(), 'is-dark': !isDark() }">Log in</a>
                </div>
                <span class="navbar-item" v-else>
                    <UserPanel :imageSrc="userRef().value.image ?? ''" :firstName="userRef().value.firstName"
                    :role="userRef().value.role" class="navbar-item" />
                <div class="navbar-item buttons">
                    <a class="button is-rounded is-small-desktop is-large-touch" @click="logout">Logout</a>
                </div>
                </span>
            </div>


        </div>
    </nav>
</template>

<style scoped>
.router-link-active {
    border-bottom: 2px solid #FF8000;
}

nav.navbar.is-dark.is-info .navbar-item,
nav.is-dark.is-info,
nav.is-dark.is-info .navbar-menu {
    background-color: var(--bulma-info-dark);
}

nav.navbar.is-dark.is-info .navbar-item {
    color: var(--bulma-text-light)
}

nav.navbar.is-dark.is-info .navbar-brand .navbar-burger>span {
    color: var(--bulma-text-light);
}

nav.navbar {
    transition: background-color 0.25s ease-in-out;
}

.button {
    transition: border-color 0.25s ease-in-out !important;
    transition: background-color 0.25s ease-in-out !important;
    transition: color 0.25s ease-in-out !important;
}
</style>