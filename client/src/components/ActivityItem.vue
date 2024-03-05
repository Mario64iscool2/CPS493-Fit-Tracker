<script setup lang="ts">
defineProps<{
    user: string,
    usericon: string,
    handle: string,
    msg: string,
    time: Date,
    dist: number,
    duration: number
}>()
</script>
<template>
    <div class="card is-center">
        <div class="card-header">
            <div class="card-header-title"> {{ user }}</div>
            <div class="card-header-title">@{{ handle }}</div>
            <div class="card-header-title">{{ time }}</div>
        </div>
        <div class="card-content">
            <div class="content"> {{ msg }}</div>
            <div class="columns">
                <div class="column is-half">
                    <div>
                        <p class="title">{{ dist }}</p>
                        <p class="subtitle">Distance</p>
                    </div>
                </div>
                <div class="column is-half has-text-centered">
                    <div>
                        <p class="title">{{ duration }}</p>
                        <p class="subtitle">Duration</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            
        </div>
    </div>
  </template>