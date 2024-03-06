<script setup lang="ts">
import SignInModal from '@/components/SignInModal.vue';
import { ref } from 'vue';
import  { type User, getUsers } from '../model/users'
const user = ref(null as User | null);
user.value = getUsers()[0];

let activeTab = ref(0);
let isLoggedIn = ref(false);

</script>
<template>
    <SignInModal :class="{ 'is-active' : !isLoggedIn}" />
    <div class="columns">
        <div class="column is-full-mobile is-success">
            <div class="tabs is-centered is-fullwidth is-toggle">
                <ul>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==0) }" @click="activeTab=0"><a>Biking</a></li>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==1) }" @click="activeTab=1"><a>Climbing</a></li>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==2) }" @click="activeTab=2"><a>Hiking</a></li>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==3) }" @click="activeTab=3"><a>Running</a></li>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==4) }" @click="activeTab=4"><a>Swimming</a></li>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==5) }" @click="activeTab=5"><a>Walking</a></li>
                    <li :class="{ 'is-active' : (activeTab.valueOf()==6) }" @click="activeTab=6"><a>Weightlifting</a></li>
                </ul>
                </div>
        </div>
    </div>
</template>

<style scoped>
.block {
    padding: 8px;
}
li.is-active>a {
    transition: background-color 0.25s linear 0s
}
li:not(.is-active)>a {
    transition: background-color 0.1s linear 0s
}

</style>