<script setup lang="ts">
import { getUserById, type User } from '@/model/users';
import { userRef } from '@/viewmodel/usersession'
import ProfilePicture from '../components/ProfilePicture.vue'
import { postTimeDifference } from '@/unit-helpers';
const props = defineProps<{
    userId: number,
    firstName: string,
    lastName: string,
    handle: string,
    admin: boolean
}>()
const emits = defineEmits<{
    addAsFriend: []
}>()

</script>

<template>
    <div class="card">
        <div class="card-header">
            <span class="card-header-icon">
                <ProfilePicture source="{{ getUserById(userId).image }}" />
                </span>
            <span class="card-header-title">
                    <strong class="strong">{{ firstName + '&nbsp;' +
                        lastName }}</strong>&nbsp;<small class="small">@{{ handle }}</small>
                        </span>
            
        </div>
        <div class="card-content">
            <button class="button"
                :class="{ 'is-primary' : (userRef().value.friends ? !userRef().value.friends.includes(userId) : true )}">Add
                Friend</button>
        </div>
        <div class="card-footer">
            <span class="card-footer-item">{{ 'Account Created' + postTimeDifference(getUserById(userId).creationTimestamp) }}</span>
        </div>
    </div>
</template>

<style scoped>
</style>