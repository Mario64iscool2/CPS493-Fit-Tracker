<script setup lang="ts">
import { getUserById, type User } from '@/model/users';
import { userRef } from '@/viewmodel/usersession'
import UserPanel from './UserPanel.vue';
import { postTimeDifference } from '@/unit-helpers';
import { ref } from 'vue';
const props = defineProps<{
    userId: number,
    firstName: string,
    lastName: string,
    handle: string,
    role: string,
    creationTimestamp: number
}>()
const emits = defineEmits<{
    addAsFriend: []
}>()

const isSelf = ref(false);
isSelf.value = userRef().value.id === props['userId'];
const isFriends = ref(false);
isFriends.value = userRef().value.friends.includes(props['userId']) || isSelf.value
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="card-header-title">
                <UserPanel imageSrc="{{ getUserById(userId).image }}" :userId :firstName :lastName :handle :role />
            </div>
            </div>
        <div class="card-content">
            <button class="button"
                :class="{ 'is-primary': !isFriends&&!isSelf, 'is-danger' : isFriends && !isSelf }"
                :v-if="!isSelf" @click="$emit('addAsFriend')">{{ !isFriends ? "Add Friend" : "Remove Friend"}}</button>
        </div>
        <div class="card-footer">
            <span class="card-footer-item">{{ 'Account Created ' + postTimeDifference(creationTimestamp) }}</span>
        </div>
    </div>
</template>

<style scoped></style>