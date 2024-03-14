<script setup lang="ts">
import { ref } from 'vue'
import { addWorkout, type IWorkout, disciplines } from '@/model/workoutactivity';
import { shouldShowModalExc, userRef } from '@/viewmodel/usersession';

defineEmits<{
    submit : []
}>()

const workout = ref({id:-1,creator:userRef().value.id,postTime:"",discipline:"",msg:"",duration:0,distance:0,elevation:0,reps:0,weight:0})
</script>
<template>
    <div class="modal" >
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add a Workout</p>
                <button class="delete" aria-label="close" @click="shouldShowModalExc=false"></button>
            </header>
            <form @submit.prevent="addWorkout(workout)">
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column is-three-quarters">
                        <div class="field">
                            <label class="label">Message</label>
                            <div class="control">
                                <textarea class="textarea" placeholder="What would you like to say?"
                                v-model="workout.msg" maxlength="250"></textarea>
                            </div>
                        </div>
                        <div class="field">
                                <label class="label">Type</label>
                            <div class="field-body">
                            <div class="control">
                                <div>
                                    <select class="select is-fullwidth" v-model="workout.discipline" required>
                                    <option class="option is-large" v-for="d in disciplines" :value="d">{{ d.charAt(0).toUpperCase().concat(d.substring(1)) }}</option>
                                </select>
                                </div>
                            </div>
                            <div class="field-body control">
                                <div class="field-label is-normal">
                                <label class="label">Duration</label>
                            </div>
                                <div class="control is-expanded">
                                <input class="input" type="number" min="0" max="99" maxlength="2">
                            </div>
                            <div class="control">
                                <div class="field-label is-normal label">&nbsp;:&nbsp;</div>
                            </div>
                            <div class="control is-grouped">
                                <input class="input" type="number" min="0" max="59" maxlength="2">
                            </div></div>
                            
                            </div> 
                        </div>
                        <div class="field is-horizontal">
                                                       
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <input class="button is-primary" type="submit" value="Save Changes" formmethod="dialog"></input>
                </div>
            </footer>
        </form>
    </div>
    </div>
</template>

<style scoped>
dialog {
    background-color: transparent;
    border: transparent;
    margin:0px;
    padding: 0px;
}

.modal-card form {
    display: contents;
}
</style>