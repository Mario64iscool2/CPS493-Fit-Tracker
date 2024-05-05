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
        workouts.getAll().then((all) => {
            /** @type { WorkoutDataListEnvelope } */
            const response = {
                data: all,
                totalCount: all.length,
                isSuccess: true,
            }
            res.send(response);
        })
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
    .post('/:id', (req, res, next) => {
        const id = req.params.id;
        const operation = req.body.operation;
        if (operation == "like")
        {
            workouts.like(+id).then((likes) => {
                /** @type { DataEnvelope } */
                const response = {
                    data: likes,
                    isSuccess: data? true : false
                }
                res.send(response)
            }
            )
        }
        res.status(400).send('Invalid Operation!')
    })
    .get('/user/:id', (req, res, next) => {
        const id = req.params.id;
        workouts.getFiltered(+id).then((filtered) => {
            /** @type { WorkoutDataListEnvelope } */
            const response = {
                data: filtered,
                totalCount: filtered.length,
                isSuccess: true,
            }
            res.send(response);
        })
    })
    .get('/filter', (req, res, next) => {
        const userWorkouts = workouts.getFiltered(req.get('u'), req.get('d'));
        /** @type { WorkoutDataListEnvelope } */
        const response = {
            data: userWorkouts,
            totalCount: userWorkouts.length,
            isSuccess: true
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
        const workout = req.body;
        workout.id = req.params.id;
        const result = workouts.update(workout);

        /** @type { WorkoutDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }

        res.send(response);
    })
    .delete('/:id', (req, res, next) => {
        const id = req.params.id;
        const result = workouts.remove(+id);


        /** @type { WorkoutDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }

        res.send(response);
    })




module.exports = app