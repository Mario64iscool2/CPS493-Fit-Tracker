<script setup lang="ts">
import { ref } from 'vue'
import CreateAccountModal from '@/components/CreateAccountModal.vue';
const isLoggedIn = ref(false)
</script>

<template>
  <main>
    <CreateAccountModal :class="{ 'is-active' : !isLoggedIn}" @submit="isLoggedIn=true"/>
  </main>
</template>
