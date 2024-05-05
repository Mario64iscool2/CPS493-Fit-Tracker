<script setup lang="ts">
import { ref } from 'vue';
import { type User, search } from '@/model/users';
import { mdiMagnify } from '@mdi/js';
import UserCard from '@/components/UserCard.vue';
import { befriendUser } from '@/viewmodel/usersession';
const query = ref("");
const result = ref({} as User[])
const empty = ref(false);
async function doSearch() {
    if(query.value.trimStart().length <1)
    {
        empty.value=false;
        empty.value = true;
        return;
    }
    search(query.value).then(
        res => {
            result.value = res.data;
        }
    );
}
async function doAddFriend(id: number){
    return befriendUser(id);
}
</script>

<template>
    <div>
        <div class="section">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="text" v-model.string="query" :class="{'is-danger' : empty }" @input="empty = false"/>
                    <div class="has-text-danger help" v-if="empty">Please enter a query.</div>
                </div>
                <div class="control">
                    <div role="submit" class="button" @click="doSearch"><span class="icon"><svg>
                                <g :path="mdiMagnify" />
                            </svg></span></div>
                </div>
            </div>
        </div>
        <div v-for="u in result" :key="u.id" class="column is-half is-offset-one-quarter">
            <UserCard :first-name="u.firstName" :last-name="u.lastName" :handle="u.username" :role="u.role"
                :userId="u.id??-1" :creationTimestamp="u.creationTimestamp" @add-as-friend="doAddFriend(u.id)" />
        </div>
        

    </div>
</template>

<style scoped>
@keyframes shake {
    0% {
        margin-left: 0rem;
    }

    25% {
        margin-left: 0.5rem;
    }

    75% {
        margin-left: -0.5rem;
    }

    100% {
        margin-left: 0rem;
    }
}
input.is-danger {
    animation: shake 0.2s ease-in-out 0s 2;
    box-shadow: 0 0 0.6rem #ff0000;
}
</style>