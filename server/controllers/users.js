const users = require('../models/users')
const express = require('express');
const app = express.Router();

/** 
 * @typedef {import('../../client/src/model/users').User} User 
 * @typedef {import('../../client/src/model/transportTypes').DataEnvelope<User> } UserDataEnvelope
 * @typedef {import('../../client/src/model/transportTypes').DataListEnvelope<User> } UserDataListEnvelope
 * */

app
    .get('/', (req, res, next) => {
        users.getAll()
            .then(all => {
                /** @type { UserDataListEnvelope } */
                const response = {
                    data: all,
                    totalCount: all.length,
                    isSuccess: true,
                }
                res.send(response);
            }).catch(next);
    })
    .get('/search', (req, res, next) => {

        const search = req.query.q;
        if (typeof search !== 'string') throw new Error('search is required');
        users.search(search).then(result => {
            /** @type { UserDataListEnvelope } */
            const response = {
                data: result,
                totalCount: result.length,
                isSuccess: true,
            }
            res.send(response);
        }).catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        users.get(+id).then(u => {
            /** @type { UserDataEnvelope } */
            const response = {
                data: u,
                isSuccess: true,
            }
            res.send(response);
        })
    })
    .get('/:id/friends', (req, res, next) => {
        const id = req.params.id;
        users.get(+id).then(u => {
            
        })
    })
    .post('/', (req, res, next) => {
        const user = req.body;
        users.add(user).then(result => {
            /** @type { UserDataEnvelope } */
            const response = {
                data: result,
                isSuccess: true,
            }

            res.send(response);
        }).catch(next);
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
        users.remove(+id).then(result => {

        }).catch();


        /** @type { UserDataEnvelope } */
        const response = {
            data: result,
            isSuccess: true,
        }

        res.send(response);
    })




module.exports = app