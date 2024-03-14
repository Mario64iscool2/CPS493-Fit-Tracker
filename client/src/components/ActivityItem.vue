<script setup lang="ts">
import { ref } from 'vue'
import { toUnitStringInLocale, toWeightInLocale, postTimeDifference } from '@/main';
import { isImperial } from '@/viewmodel/usersession'
import { getUserById } from '@/model/users';
const props = defineProps<{
    creator:number
    postTime: string
    msg: string
    distance: number
    duration: number
    elevation?: number
    weight?: number
    reps?: number
    discipline: string | "running"
}>()


const filteredKeys: Array<keyof typeof props> = ['distance', 'elevation', 'reps', 'weight', 'duration']
    const displayedKeys: Array<keyof typeof props> = filteredKeys.filter((k) => props[k] !== undefined )

const formatValue = (key: keyof typeof props, value: number): string => {
    switch (key) {
        case 'duration':
            return value > 59 ? (value / 60) + ' hr' : value + ' min';
        case 'distance':
            return toUnitStringInLocale(value);
        case 'reps':
            return value.toString();
        case 'weight':
            return toWeightInLocale(value);
        case 'elevation':
            return (isImperial().value) ? Math.round(value * 3.28084) + ' ft' : value + ' m';
        default:
            return value.toString();
    }
}

const formatLabel = (key: string): string => {
    switch (key) {
        case 'duration':
            return "Duration";
        case 'distance':
            return "Distance";
        case 'reps':
            return "Reps";
        case 'weight':
            return "Weight";
        case 'elevation':
            return "Elevation";
        default:
            return '';
    }

}

</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="columns is-mobile card-header-title">
                <p class="column is-half">
                    <strong class="strong">{{ getUserById(creator).firstName + '&nbsp;' + getUserById(creator).lastName }}</strong>&nbsp;<small
                        class="small">@{{ getUserById(creator).username }}</small>
                </p>
                <div class="column is-half has-text-right">{{ postTimeDifference(Date.parse(postTime.toLocaleString())) }}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">{{ msg }}</div>
            <div class="columns is-mobile">
                <div v-for="key in displayedKeys" :key class="column has-text-centered">
                    <div>
                        <p class="title">{{ formatValue(key, (props[key] !== undefined) ? (props[key] as number) : props[key] as number) }}</p>
                        <p class="subtitle">{{ formatLabel(key) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>