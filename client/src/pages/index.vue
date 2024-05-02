<script setup lang="ts">
import { isLoggedIn, userRef } from '@/viewmodel/usersession';

</script>

<template>
  <main>
    <div class="notification is-info is-large is-overlay has-text-centered" v-if="!isLoggedIn().value">
      <p>You're not logged in.</p>
    </div>
      <section class="section content">
        <h1 class="">Notable Content still missing:</h1>
        <li class="has-text-warning-on-scheme">Friend Recruitment <small class="is-help has-text-success-on-scheme">User search is implemented, but the ability to actually befriend users is work-in-progress</small></li>
        <li>Friend's Activity Feed</li>
        <li><span class="has-text-danger-on-scheme">Your Stats</span> (User Profile Works otherwise.)</li>
        <li class="has-text-danger-on-scheme">Workout Creation UI <small class="is-help has-text-warning-on-scheme">The underlying infrastructure is in place. I just ran out of time for UI/UX design. See <RouterLink to="/aboutview">here</RouterLink> for a work-in-progress.</small></li>
        <h1 class="title">Notable Content for a future feature release:</h1>
        <li class="has-text-success-on-scheme">Account Creation System</li>
        <li class="has-text-info-on-scheme">A mostly consistent, polished UI/UX feel. <em>For both Mobile and Desktop.</em></li>
        <li class="has-text-success-on-scheme">Locale-Based Unit Conversion</li>
        <li class="has-text-success-on-scheme">Light/Dark Theme based on System Preferences</li>
      </section>
  </main>
</template>

<style scoped>
  ul,li {
    list-style: none;
  }
</style>
