<script setup lang="ts">
import { toUnitStringInLocale, toWeightInLocale, postTimeDifference } from '@/unit-helpers';
import { isImperial, shouldShowModalExc } from '@/viewmodel/usersession'
import { getUserById } from '@/model/users';
import ProfilePicture from '../components/ProfilePicture.vue'
import type { Discipline } from '@/model/workoutactivity';
import AddWorkout from './AddWorkout.vue';
const props = defineProps<{
    creator: number
    postTime: string
    msg: string
    distance?: number
    duration: number
    elevation?: number
    weight?: number
    reps?: number
    discipline: Discipline
}>()


const filteredKeys: Array<keyof typeof props> = ['distance', 'elevation', 'reps', 'weight', 'duration']
const displayedKeys: Array<keyof typeof props> = filteredKeys.filter((k) => {
    switch (props.discipline) {
        case 'biking':
        case 'walking':
        case 'running':
        case 'swimming':
            return ['distance', 'duration'].includes(k);
        case 'climbing':
            return ['elevation', 'duration'].includes(k);
        case 'hiking':
            return ['distance', 'elevation', 'duration'].includes(k);
        case 'weightlifting':
            return ['weight', 'reps', 'duration'].includes(k);

    }
})



const formatValue = (key: keyof typeof props, value: number): string => {
    if(value !== undefined)
    switch (key) {
        case 'duration':
            if(value%60===0)
            {
                if(value===60)
                    return value/60 + ' hr'
                else
                    return value/60 + ' hrs'
            }
            return value > 59 ? Math.floor((value / 60)) + 'h'+value%60 +'m' : value + ' min';
        case 'distance':
            return toUnitStringInLocale(value);
        case 'reps':
            return value !== undefined ? value.toString() : "undefined";
        case 'weight':
            return toWeightInLocale(value);
        case 'elevation':
            return toUnitStringInLocale(value,'yd');
        default:
            return value.toString();
    }
    return "";
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
                <div class="column auto">
                    <span class="content"><span class="icon-text"><ProfilePicture source="{{ getUserById(creator).image }}"/></span>
                        &nbsp;<span><strong class="strong">{{ getUserById(creator).firstName + '&nbsp;' +
                                    getUserById(creator).lastName }}</strong></span>&nbsp;<small class="small">@{{
                                    getUserById(creator).username }}</small>
                    </span>
                </div>
                <div class="column is-narrow">{{ postTimeDifference(Date.parse(postTime.toLocaleString())) }}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">{{ msg }}</div>
            <div class="columns is-mobile">
                <div v-for="key in displayedKeys" :key class="column auto has-text-centered">
                    <div>
                        <p class="title">{{ formatValue(key, (props[key] !== undefined) ? (props[key] as number) :
                                    props[key] as number) }}</p>
                        <p class="subtitle">{{ formatLabel(key) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click="shouldShowModalExc = true">Edit</a>
            <a class="card-footer-item" @click="">Like</a>
            <a class="card-footer-item" @click="">Share</a>
        </footer>
    </div>
</template>

<style scoped>

</style>