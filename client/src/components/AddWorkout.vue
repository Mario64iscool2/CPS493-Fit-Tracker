<script setup lang="ts">
import { ref } from 'vue'
import { addWorkout, type IWorkout, disciplines, type Discipline } from '@/model/workoutactivity';
import { isImperial, shouldShowModalExc, userRef } from '@/viewmodel/usersession';
import type { LengthImperialUnits } from 'convert-units/definitions/length';
import type { MassImperialUnits } from 'convert-units/definitions/mass';

const props = defineProps<{
    workout?: IWorkout
}>();

defineEmits<{
    submit: []
}>()

const workout = ref({ id: -1, creator: userRef().value.id, postTime: "", discipline: 'biking' as Discipline, msg: "", durationHours: 0, durationMinutes: 0, distance: 0, elevation: 0, reps: 0, weight: 0 })
const units = ref({dist: 'yd' as LengthImperialUnits, elev: 'ft' as LengthImperialUnits, wght: 'lb' as MassImperialUnits});
if(props.workout)
{
    workout.value = { id: props.workout.id, creator: props.workout.creator, postTime: props.workout.postTime, discipline: props.workout.discipline, msg: props.workout.msg, durationHours: Math.round(props.workout.duration/60), durationMinutes: props.workout.duration % 60, distance: props.workout.distance || 0, elevation: props.workout.elevation || 0, reps: props.workout.reps || 0, weight: props.workout.weight || 0 };
}
</script>
<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add a Workout</p>
                <button class="delete" aria-label="close" @click="shouldShowModalExc = false"></button>
            </header>
            <form @submit.prevent="addWorkout(workout,units);">
                <section class="modal-card-body">
                    <div class="content">
                        <div class="field">
                            <label class="label">Message</label>
                            <div class="control">
                                <textarea class="textarea has-fixed-size" placeholder="What would you like to say?"
                                    v-model="workout.msg" maxlength="250">
                                </textarea>
                                <span class="help is-pulled-right" :class="{'is-danger has-text-weight-bold' : workout.msg.length === 250}">{{ workout.msg.length }}/250</span>
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
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
                            </div>
                            <div class="control">
                                <div class="field">
                                    <label class="label">Duration</label>
                                    <div class="field has-addons">
                                        <div class="control" style="width:4.5rem;">
                                            <input class="input has-text-right" type="number" min="0" max="99"
                                                maxlength="2" placeholder="HH" v-model="workout.durationHours">
                                        </div>
                                        <div class="control">
                                            <div class="button is-static">:</div>
                                        </div>
                                        <div class="control">
                                            <input class="input has-text-left" type="number" min="0" max="59"
                                                maxlength="2" placeholder="mm" style="width:4.5rem;" v-model="workout.durationMinutes">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-grouped" v-if="!['weightlifting'].includes(workout.discipline)">
                            <div class="control"
                                v-if="['walking', 'running', 'swimming', 'biking', 'hiking'].includes(workout.discipline)">
                                <div class="field">
                                    <label class="label">Distance</label>
                                    <div class="field has-addons">
                                        <div class="control" style="width: 7rem;">
                                            <input type="text" class="input" v-model.number="workout.distance" />
                                        </div>
                                        <div class="control">
                                            <div class="select">
                                                <select v-model="units.dist">
                                                    <option
                                                        v-for="u in (isImperial().value) ? ['yd', 'mi'] : ['m', 'km']"
                                                        :value="u">{{ u }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="control" v-if="['climbing', 'hiking'].includes(workout.discipline)">
                                <div class="field">
                                    <label class="label">Elevation</label>
                                    <div class="field has-addons">
                                        <div class="control" style="width: 7rem;">
                                            <input type="text" v-model.number="workout.elevation" class="input">
                                        </div>
                                        <div class="control">
                                            <div class="button is-static">{{ (isImperial().value) ? 'ft' : 'm' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field" v-if="['weightlifting'].includes(workout.discipline)">
                            <label class="label">Weight</label>
                            <div class="field is-grouped">
                                <div class="control">
                                    <div class="field has-addons">
                                        <div class="control" style="width:6rem;">
                                            <input type="text" v-model.number="workout.weight" class="input">
                                        </div>
                                        <div class="control">
                                            <div class="button is-static">{{ (isImperial().value) ? 'lbs' : 'kgs'
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="control">
                                    <div class="field has-addons">
                                        <div class="control" style="width:4rem;">
                                            <input type="number" v-model="workout.reps" class="input">
                                        </div>
                                        <div class="control">
                                            <div class="button is-static">reps
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
                        <input class="button is-primary" type="submit" value="Save Changes" formmethod="dialog" @submit.prevent="workout.postTime=new Date(Date.now()).toJSON(); shouldShowModalExc = false"></input>
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