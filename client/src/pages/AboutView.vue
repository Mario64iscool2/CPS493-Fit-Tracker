<script setup lang="ts">
import ActivityItem from "../components/ActivityItem.vue"
import { ref } from 'vue'
import { type IWorkout, getWorkouts,getWorkout } from '../model/workoutactivity'
import { userRef } from '@/viewmodel/usersession'
let w = getWorkout(1)
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
        :duration="w.duration"
        :discipline="w.discipline"/>
    </div>
  </div>
</template>

<style>

</style>
