<script setup lang="ts">
import { ref } from 'vue'
import { type Workout } from '../model/workoutactivity'
const props = defineProps<{
    workout: Workout | undefined
}>()

let isImperial = ref(true)

</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">{{ workout?.creator.firstName as string + ' ' + workout?.creator.lastName as string }}</div>
            <div class="card-header-title">@{{ workout?.creator.username }}</div>
            <span class="card-header-title" :data-tooltip=" new Date(workout?.postTime as number).toLocaleDateString() ">{{ new Date(workout?.postTime as number).toLocaleString() }}</span>
        </div>
        <div class="card-content">
            <div class="content">{{ workout?.msg }}</div>
            <div class="columns">
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ isImperial ? (workout?.distance < 1609.344 ? Math.round((workout?.distance/1.609344/3)) + ' yd' : Math.round(workout?.distance/1609.344) + ' mi') : (workout?.distance < 1000 ? Math.round((workout?.distance)) + ' m' : Math.round(workout?.distance/1000) + ' km') }}</p>
                        <p class="subtitle">Distance</p>
                    </div>
                </div>
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ workout?.duration > 59 ? (workout?.duration / 60) + ' hr' : ' min' }}</p>
                        <p class="subtitle">Duration</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>