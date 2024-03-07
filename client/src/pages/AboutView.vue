<script setup lang="ts">
import ActivityItem from "../components/ActivityItem.vue"
import { ref } from 'vue'
import { type User, getUserById } from '../model/users'
import { type Workout, getWorkout } from '../model/workoutactivity'
let user = getUserById(1)
let w = getWorkout(1)
</script>
<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <ActivityItem :first-name="w.creator.firstName"></ActivityItem>
    </div>
  </div>
</template>

<style>

</style>
