<script setup lang="ts">
import ProfilePicture from './ProfilePicture.vue';
defineProps<{
    imageSrc: string,
    firstName: string,
    lastName?: string,
    handle?: string,
    role: string
}>()
</script>

<template>
    <div class="is-flex is-justify-content-flex-start">
        <ProfilePicture :source="imageSrc ?? ''"/>
        <!-- I was fighting with bulma to get the exact styling I'm after, so I resorted to manual style overrides in the element as to not break the other ones. -->
        <p class="mx-2 has-text-weight-bold">{{ lastName ? firstName + '&nbsp;' + lastName : firstName }}
            <span v-if="handle" class="small">@{{ handle }}</span>
            <span style="line-height: 1.6rem; vertical-align: middle;" class="tag is-rounded mx-1" :class="{'is-danger' : role === 'admin', 'is-success': role==='moderator'}"
                v-if="role !== 'user'">{{ role.replace(RegExp("^[a-z]"),role.charAt(0).toUpperCase()) }}</span>
        </p>
    </div>
</template>

<style scoped></style>