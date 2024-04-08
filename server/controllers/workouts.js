const workouts = require('../models/workouts')
const express = require('express');
const app = express.Router();

/** 
 * @typedef {import('../../client/src/model/workoutactivity').IWorkout} IWorkout 
 * @typedef {import('../../client/src/model/transportTypes').DataEnvelope<IWorkout> } WorkoutDataEnvelope
 * @typedef {import('../../client/src/model/transportTypes').DataListEnvelope<IWorkout> } WorkoutDataListEnvelope
 * */

app
    .get('/', (req, res, next) => {
        const all = workouts.getAll();
        /** @type { WorkoutDataListEnvelope } */
        const response = {
            data: all,
            totalCount: all.length,
            isSuccess: true,
        }
        res.send(response);
        
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        /** @type { WorkoutDataEnvelope } */
        const response = {
            data: workouts.get(+id),
            isSuccess: true,
        }
        res.send(response);
    })
    .post('/', (req, res, next) => {
        const workout = req.body;
        const result = workouts.add(workout);

        /** @type { WorkoutDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }
        
        res.send(response);
    })
    .patch('/:id', (req, res, next) => {
        const user = req.body;
        user.id = req.params.id;
        const result = users.update(user);

        /** @type { UserDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }
        
        res.send(response);
    })
    .delete('/:id', (req, res, next) => {
        const id = req.params.id;
        const result = users.remove(+id);

        
        /** @type { UserDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }
        
        res.send(response);
    })




module.exports = app