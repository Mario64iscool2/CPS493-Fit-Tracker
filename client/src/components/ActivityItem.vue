<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
    firstName: string
    lastName: string
    username: string
    postTime: Date | string
    msg: string
    distance?: number
    duration: number
    elevation?: number
    weight?: number
    reps?: number
}>()

let isImperial = ref(true)

</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="columns card-header-title">
                <p class="column is-half">
                    <strong class="strong">{{ firstName + '&nbsp;' + lastName }}</strong>&nbsp;<small class="small">@{{ username }}</small>
                </p>
            <div class="column is-half has-text-right">{{ postTime.toLocaleString() }}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">{{ msg }}</div>
            <div class="columns">
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ isImperial ? (distance as number < 1609.344 ? Math.round((distance as number*(1.09361))) + ' yd' : Math.round(distance as number/1609.344) + ' mi') : (distance as number< 1000 ? Math.round((distance as number)) + ' m' : Math.round(distance as number/1000) + ' km') }}</p>
                        <p class="subtitle">Distance</p>
                    </div>
                </div>
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ duration > 59 ? (duration / 60) + ' hr' : duration + ' min' }}</p>
                        <p class="subtitle">Duration</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>