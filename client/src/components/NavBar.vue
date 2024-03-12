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
                <div class="buttons navbar-item" v-if="!isLoggedIn().value">
                    <a class="button is-primary"
                    @click="$emit('loadAccountModal')">Sign up</a>
                    <a class="button is-light"
                    @click="$emit('loadSignInModal')">Log in</a>
                </div>
                <div class="navbar-item is-flex is-justify-content-flex-start" v-else>
                    <img :src="(userRef().image === '')? userRef().image : 'public/no-profile-image.png'" />
                    <!-- I was fighting with bulma to get the exact styling I'm after, so I resorted to manual style overrides in the element as to not break the other ones. -->
                    <p style="font-size: 0.875rem; font-weight: bold; margin-left: 8px; line-height: 1.6rem;">{{userRef().value.firstName}}
                        <span style="line-height: 1.6rem; vertical-align: middle;" class="tag is-danger is-rounded mx-1" v-if="userRef().value.admin">Admin</span>
                    </p>
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