<script setup lang="ts">
import { isLoggedIn, userRef } from '@/viewmodel/usersession';

</script>

<template>
  <main>
    <div class="notification is-info is-large is-overlay has-text-centered" v-if="!isLoggedIn().value">
      <p>You're not logged in.</p>
    </div>
      <section class="section content">
        <h1 class="title">Notable Content still missing:</h1>
        <ul>Friend Recruitment</ul>
        <ul>Friend's Activity Feed</ul>
        <ul><span class="has-text-danger">Your Stats</span> (User Profile Works otherwise.)</ul>
        <ul class="has-text-danger">Workout Creation UI <small class="is-help has-text-warning-dark">The underlying infrastructure is in place. I just ran out of time for UI/UX design. See <RouterLink to="/aboutview">here</RouterLink> for a work-in-progress.</small></ul>
        <h1 class="title">Notable Content for a future feature release:</h1>
        <ul class="has-text-success">Account Creation System</ul>
        <ul class="has-text-info">A mostly consistent, polished UI/UX feel. <em>For both Mobile and Desktop.</em></ul>
        <ul class="has-text-success">Locale-Based Unit Conversion</ul>
      </section>
  </main>
</template>

<style scoped>

</style>
