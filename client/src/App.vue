<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { type User, getUser, addUser } from '@/model/users'
import NavBar from './components/NavBar.vue'
const auth = ref({} as User)
</script>

<template>
    <NavBar />
    <RouterView />
</template>

<style scoped>
</style>
