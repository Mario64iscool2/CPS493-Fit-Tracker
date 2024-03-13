<script setup lang="ts">
import { ref } from 'vue'
import { toUnitStringInLocale, toWeightInLocale } from '@/main';
import { isImperial } from '@/viewmodel/usersession'
import { isStringLiteral } from 'typescript';
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
    discipline: string | "running"
}>()

const suppliedProps = Object.fromEntries(
    Object.entries(props).filter(([key, value]) => value !== undefined && typeof value === "number")
)

const formatValue = (key: string, value: number): string => {
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
            return (isImperial().value)? Math.round(value*3.28084) + ' ft' : value + ' m';
        default:
            return value.toString();
    }
}

const formatLabel = (key: string):string => {
    key[0].toUpperCase();
    return key;
}

</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="columns is-mobile card-header-title">
                <p class="column is-half">
                    <strong class="strong">{{ firstName + '&nbsp;' + lastName }}</strong>&nbsp;<small class="small">@{{username }}</small>
                </p>
                <div class="column is-half has-text-right">{{ postTime.toLocaleString() }}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">{{ msg }}</div>
            <div class="columns is-mobile">
                <div v-for="(value, key) in suppliedProps" :key class="column has-text-centered">
                    <div>
                        <p class="title">{{ formatValue(key, value) }}</p>
                        <p class="subtitle">{{ formatLabel(key) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>