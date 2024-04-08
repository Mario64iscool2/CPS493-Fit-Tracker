<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    source: string
}>()

const goodImage = ref(false);


async function validateImageURL(url: string) {
    var image = new Image();
    return new Promise<boolean>((resolve) => {
        
            image.onload = () => {
                if (image.width > 0) {
                    resolve(true);
                }
                resolve(false);
            }
            image.onerror = () => {
                resolve(false)
            }
            image.src = url;   
    })
    

}
(async () => {
    goodImage.value = await validateImageURL(props.source);
})();
</script>

<template>
    <img class="icon" :src="(goodImage ? source : '/no-profile-image.png')" />
</template>