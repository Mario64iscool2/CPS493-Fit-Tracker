<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
    firstName: string,
    lastName: string,
    username: string,
    postTime: number,
    msg: string,
    distance: number,
    duration: number
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
            <div class="column is-half has-text-right">{{ new Date(postTime as number).toLocaleString() }}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">{{ msg }}</div>
            <div class="columns">
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ isImperial ? (distance < 1609.344 ? Math.round((distance/1.609344/3)) + ' yd' : Math.round(distance/1609.344) + ' mi') : (distance < 1000 ? Math.round((distance)) + ' m' : Math.round(distance/1000) + ' km') }}</p>
                        <p class="subtitle">Distance</p>
                    </div>
                </div>
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ duration > 59 ? (duration / 60) + ' hr' : ' min' }}</p>
                        <p class="subtitle">Duration</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>