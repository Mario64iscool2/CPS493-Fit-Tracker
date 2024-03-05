<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
  </div>
  <div class="columns">
    <div class="column is-full">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
