<script setup lang="ts">
import ActivityItem from "../components/ActivityItem.vue"
import { ref } from 'vue'
import { type User, getUser } from '../model/users'
import { type WorkoutActivity, getworkout } from '../model/workoutactivity'
const user = ref(null as User | null)
user.value = getUser(0)
</script>
<template>
  <ActivityItem :user="(user?.firstName as string + ' ' + user?.lastName as string)" :handle="user?.username" msg="This is a test run through campus" dist="" duration="0.5" time="1709225989"></ActivityItem>
</template>

<style>

</style>
