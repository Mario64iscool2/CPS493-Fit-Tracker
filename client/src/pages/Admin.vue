<script setup lang="ts">
import { ref } from 'vue'
import { shouldShowModalAcc, userRef } from '@/viewmodel/usersession';
import { getUsers,deleteUser, getUserById } from '@/model/users';
</script>

<template>
    <div v-if="userRef().value.admin"> <!-- Hides if not administrator and if router guard fails -->
        <div class="columns is-mobile">
            <div class="column auto"></div>
            <div class="column is-full-mobile is-three-quarters-tablet is-three-fifths-widescreen is-half-fullhd">
                <div class="table-container">
                <table class="table" id="userTable">
                    <thead class="thead">
                        <th class="th">ID</th>
                        <th class="th">First Name</th>
                        <th class="th">Last Name</th>
                        <th class="th">Email</th>
                        <th class="th">Username</th>
                        <th class="th">DOB</th>
                        <th class="th">Friends</th>
                        <th class="th">Is Admin?</th>
                        <th></th>
                    </thead>
                    <tbody class="tbody">
                        <tr class="tr" v-for="user in getUsers()" :key="user.id">
                            <td class="td">{{ user.id }}</td>
                            <td class="td _7rem">{{ user.firstName }}</td>
                            <td class="td _10rem">{{ user.lastName }}</td>
                            <td class="td _20rem">{{ user.email }}</td>
                            <td class="td _16rem">{{ user.username }}</td>
                            <td class="td _12rem">{{ user.birthDate }}</td>
                            <td class="td"><a v-for="friend in user.friends" >{{ getUserById(friend).id }} </a></td>
                            <td class="td _6rem">{{ user.admin }}</td>
                            <td class="td is-narrow"><button @click="deleteUser(user.id)" class="button is-danger is-small is-rounded" :disabled="user.id===userRef().value.id">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="column auto"></div>
        </div>
        <section class="section is-flex is-justify-content-center">
            <div class="button is-success is-large" @click="shouldShowModalAcc = true">Add User</div>
        </section>
    </div>
</template>
<style scoped>
.th,.tr,.td {
vertical-align: middle;
}
._7rem {
    max-width: 7rem !important
}
._6rem {
    max-width: 6rem !important
}
._10rem {
    max-width: 10rem !important;
}
._12rem {
    max-width: 12rem !important;
}
._16rem {
    max-width: 16rem !important;
}
._20rem {
    max-width: 20rem !important;
}
</style>