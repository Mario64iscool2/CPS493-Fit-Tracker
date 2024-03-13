<script setup lang="ts">
import { ref } from 'vue'
import { userRef } from '@/viewmodel/usersession';
import { getUsers } from '@/model/users';
const hidePasswords = ref(true);
</script>

<template>
    <div v-if="userRef().value.admin"> <!-- Hides if not administrator. -->
        <div class="columns is-mobile">
            <div class="column auto is-narrow"></div>
            <div class="column is-full-mobile is-three-quarters-tablet is-three-fifths-widescreen is-half-fullhd">
                <table class="table">
                    <thead class="thead">
                        <th class="th">ID</th>
                        <th class="th">First Name</th>
                        <th class="th">Last Name</th>
                        <th class="th">Email</th>
                        <th class="th">Username</th>
                        <th class="th">Password<span class="tag is-hoverable"
                            :class="{ 'is-danger' : hidePasswords, 'is-success' : !hidePasswords}"
                            @click="hidePasswords = !hidePasswords">{{ (hidePasswords) ? 'Hidden' : 'Shown' }}</span></th>
                        <th class="th">DOB</th>
                        <th class="th">Is Admin?</th>
                    </thead>
                    <tbody class="tbody">
                        <tr class="tr" v-for="user in getUsers()">
                            <td class="td">{{ user.id }}</td>
                            <td class="td">{{ user.firstName }}</td>
                            <td class="td">{{ user.lastName }}</td>
                            <td class="td">{{ user.email }}</td>
                            <td class="td">{{ user.username }}</td>
                            <td class="td">{{ (hidePasswords) ? "Hidden" : user.password }}</td>
                            <td class="td">{{ user.birthDate }}</td>
                            <td class="td">{{ user.admin }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column auto is-narrow"></div>
        </div>
    </div>
</template>

<style scoped>
</style>