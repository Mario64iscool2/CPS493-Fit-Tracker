<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue';
import { ref } from 'vue';
import  { type User, getUsers } from '../model/users'
import { type IWorkout, getWorkouts, disciplines } from '../model/workoutactivity'
import { userRef } from '@/viewmodel/usersession'

const workouts = ref([] as IWorkout[])
const activeTab = ref(0)


let user: User = userRef().value

workouts.value = getWorkouts(user)

</script>
<template>
    
    <div class="section">
            <div class="tabs is-centered is-fullwidth is-toggle">
                <ul>
                    <li :class="{'is-active' : i==activeTab}" v-for="(discipline, i) in disciplines" @click="activeTab=i"><a>{{discipline.replace(RegExp("^[a-z]"),discipline.charAt(0).toUpperCase())}}</a></li>
                </ul>
            </div>
        </div>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter">
                <ActivityItem v-for="workout in workouts"
                    :key="workout.id"
                    :creator="workout.creator"
                    :post-time="workout.postTime"
                    :elevation="workout.elevation"
                    :reps="workout.reps"
                    :msg="workout.msg"
                    :distance="(workout.distance as number)"
                    :duration="workout.duration"
                    :discipline="workout.discipline"/>
        </div>
    </div>
</template>

<style scoped>
.block {
    padding: 8px;
}
li.is-active>a {
    transition: background-color 0.25s linear 0s
}
li:not(.is-active)>a {
    transition: background-color 0.1s linear 0s
}

</style>