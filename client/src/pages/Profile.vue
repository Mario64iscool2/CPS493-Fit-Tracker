<script setup lang="ts">
import { ref } from 'vue';
import  { type User, getUsers } from '../model/users'
const user = ref(null as User | null);
user.value = getUsers()[0];
</script>

<template>
    <div>
        <section class="section title">Hello, {{ user?.firstName }}</section>
    </div>
</template>

<style scoped>

</style>