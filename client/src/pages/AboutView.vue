<script setup lang="ts">
import ActivityItem from "../components/ActivityItem.vue"
import { ref } from 'vue'
import { type IWorkout, getWorkouts,getWorkout } from '../model/workoutactivity'
import { shouldShowModalExc, userRef } from '@/viewmodel/usersession'
import AddWorkout from "@/components/AddWorkout.vue";
shouldShowModalExc.value = true;
</script>
<template>
  <div class="columns is-mobile">
    <div class="column is-half is-offset-one-quarter">
      <AddWorkout :class="{'is-active' : shouldShowModalExc}"/>
    </div>
  </div>
</template>

<style>

</style>
