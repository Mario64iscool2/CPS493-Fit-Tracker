<script setup lang="ts">
    import { ref } from 'vue';
    import { type User , search } from '@/model/users';
    import { mdiMagnify } from '@mdi/js';
import UserCard from '@/components/UserCard.vue';
    const query = ref("");
    const result = ref({} as User[])
async function doSearch()
{
    search(query.value).then();
}
</script>

<template>
    <div>
        <div class="section">
            <div class="field has-addons">
                <div class="control">
                    <input class="input" type="text" v-model.string="query"/>
                </div>
                <div class="control">
                    <div role="button" class="button" @click="doSearch"><span class="icon"><svg>
                        <g :path="mdiMagnify"/>
                    </svg></span></div>
                </div>
            </div>
        </div>
        <div v-for="u in result" :key="u.id" class="column is-half is-offset-one-quarter">
            <UserCard :first-name="u.firstName" :last-name="u.lastName" :handle="u.username" :admin="u.admin" :user-id="u.id" @add-as-friend=""/>
        </div>
        
    </div>
</template>

<style scoped>
</style>