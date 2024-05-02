<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getUserById, type User } from '@/model/users';
import { type IWorkout, getWorkouts, type Discipline, disciplines, filterWorkouts } from '@/model/workoutactivity'

const workouts = ref([] as IWorkout[])
const activeTab = ref(0)
const route = useRoute();
const filters = ref([] as Discipline[])
const user = ref({} as User)

if(typeof user.value != undefined)
{
    getWorkouts(user.value).then(ret => workouts.value = ret)
}
watch(()=> route.params.id, (newId) => { getUserById(+newId).then((u) => user.value = u)});
watch(user, (newValue) => {
    if(newValue)
    {
        getWorkouts(newValue).then(ret=> workouts.value = ret)
    }
})
getUserById(+route.params.id).then((u) => user.value = u);
</script>
<template>
    <div class="section">
        <div class="title">{{ user.firstName }}'s Profile</div>
            <div class="buttons is-centered is-fullwidth is-toggle">                
                    <button class="button" :class="{'is-active is-link' : i==activeTab, 'is-danger' : filters.includes(discipline)}" v-for="(discipline, i) in disciplines" @click="activeTab=i; filters = []" @auxclick="activeTab=i; filters.push(discipline)">{{discipline.replace(RegExp("^[a-z]"),discipline.charAt(0).toUpperCase())}}</button>
            </div>
        </div>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter is-flex is-flex-direction-column">
                <ActivityItem v-for="workout in workouts"
                    :key="workout.id"
                    :creator="workout.creator"
                    :post-time="workout.postTime"
                    :elevation="(workout.elevation as number)"
                    :reps="(workout.reps as number)"
                    :msg="(workout.msg as string)"
                    :distance="(workout.distance as number)"
                    :duration="workout.duration"
                    :discipline="workout.discipline"
                    :weight="(workout.weight as number)"/>
        </div>
    </div>
</template>

<style scoped>
.block {
    padding: 8px;
}
button.is-active>a {
    transition: background-color 0.25s linear 0s
}
button:not(.is-active)>a {
    transition: background-color 0.1s linear 0s
}

</style>