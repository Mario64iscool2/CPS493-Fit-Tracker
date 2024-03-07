<script setup lang="ts">
import ActivityItem from "../components/ActivityItem.vue"
import { ref } from 'vue'
import { type User, getUserById } from '../model/users'
import { type Workout, getWorkouts } from '../model/workoutactivity'
let user = getUserById(1)
let w = getWorkouts(user)[0]
</script>
<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <ActivityItem :first-name="w.creator.firstName" :last-name="w.creator.lastName" :username="w.creator.username" :post-time="w.postTime" :msg="w.msg" :distance="w.distance" :duration="w.duration"></ActivityItem>
    </div>
  </div>
</template>

<style>

</style>
