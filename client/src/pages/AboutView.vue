<script setup lang="ts">
import ActivityItem from "../components/ActivityItem.vue"
import { ref } from 'vue'
import { type IWorkout, getWorkouts } from '../model/workoutactivity'
import { userRef } from '@/viewmodel/usersession'
let w = getWorkouts(userRef().value)[0]
</script>
<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <ActivityItem :first-name="w.creator.firstName"
        :last-name="w.creator.lastName"
        :username="w.creator.username"
        :post-time="w.postTime"
        :msg="w.msg"
        :distance="w.distance"
        :duration="w.duration" />
    </div>
  </div>
</template>

<style>

</style>
