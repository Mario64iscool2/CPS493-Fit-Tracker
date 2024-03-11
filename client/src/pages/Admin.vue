<script setup lang="ts">
import { ref } from 'vue'
import { userRef } from '@/viewmodel/usersession';

</script>

<template>
    <div v-if="userRef().value.admin"> <!-- Hides if not administrator. -->

    </div>
</template>

<style scoped>

</style>