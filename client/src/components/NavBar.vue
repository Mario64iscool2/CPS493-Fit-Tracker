<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { type User, getUser} from '@/model/users'
const user = ref({} as User)

let isActive = ref(false);
function toggleNavMenu() {
    isActive.value = !isActive.value;
}

</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <p style="text-align: center;padding-left: 8px;padding-right: 8px;">Icon<br />Pending</p>
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
            </div>
            <div class="navbar-end">
                <div class="buttons navbar-item">
                    <a class="button is-primary" @click="$emit('loadAccountModal')">Sign up</a>
                    <a class="button is-light" @click="$emit('loadSignInModal')">Log in</a>
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