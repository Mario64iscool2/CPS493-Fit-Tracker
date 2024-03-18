<script setup lang="ts">
import { ref } from 'vue'
import { addWorkout, type IWorkout, disciplines } from '@/model/workoutactivity';
import { isImperial, shouldShowModalExc, userRef } from '@/viewmodel/usersession';

defineEmits<{
    submit: []
}>()

const workout = ref({ id: -1, creator: userRef().value.id, postTime: "", discipline: "", msg: "", duration: 0, distance: 0, elevation: 0, reps: 0, weight: 0 })
</script>
<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add a Workout</p>
                <button class="delete" aria-label="close" @click="shouldShowModalExc = false"></button>
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
                                <div class="control">
                                    <div class="select">
                                        <select v-model="workout.discipline" required>
                                            <option v-for="d in disciplines" :value="d">
                                                {{ d.charAt(0).toUpperCase().concat(d.substring(1)) }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-grouped is-grouped-multiline">
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Duration</label>
                                    </div>
                                    <div class="field has-addons">
                                        <div class="control">
                                            <input class="input" type="number" min="0" max="99" maxlength="2"
                                                placeholder="HH">
                                        </div>
                                        <div class="control">
                                            <div class="button is-static">:</div>
                                        </div>
                                        <div class="control">
                                            <input class="input" type="number" min="0" max="59" maxlength="2"
                                                placeholder="mm">
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-grouped"
                                    v-if="['walking', 'running', 'swimming', 'biking', 'hiking'].includes(workout.discipline)">
                                    <div class="field-label is-normal">
                                        <label class="label">Distance</label>
                                    </div>
                                    <div class="field has-addons">
                                        <div class="control">
                                            <input type="text" class="input" v-model="workout.distance">
                                        </div>
                                        <div class="control">
                                            <div class="select">
                                                <select>
                                                    <option
                                                        v-for="u in (isImperial().value) ? ['yd', 'mi'] : ['m', 'km']"
                                                        :value="u">{{ u }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field has-addons"
                                    v-if="['climbing', 'hiking'].includes(workout.discipline)">
                                    <div class="field-label is-normal">
                                        <label class="label">Elevation</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="control">
                                            <input type="text" v-model="workout.elevation" class="input">
                                        </div>
                                        <div class="control">
                                            <div class="button is-static">{{ (isImperial().value) ? 'ft' : 'm' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    margin: 0px;
    padding: 0px;
}

.modal-card form {
    display: contents;
}
</style>