const auth = require('../models/auth')
const express = require('express');
const { getFull } = require('../models/users');
const app = express.Router();

/** @typedef {import('../../client/src/model/transportTypes').DataEnvelope<User> } UserDataEnvelope */

app.post('/login', (req, res, next) => {
    {
        auth.login({ username: req.body.user, password: req.body.pass })
            .then(user => {
                /** @type { UserDataEnvelope } */
                const response = {
                    data: user,
                    isSuccess: true,
                    message: null
                }

                res.status(200).send(response);
                next();
            })
            .catch((e) => {
                console.log({e});
                res.status(401).send({ data: null, isSuccess: false, message: e ?? "Invalid Username or Password" });
            });
    }
})
.post('/',(req,res,next)=> {
    {
        auth.login({ username: req.body.user, password: req.body.pass })
            .then(user => {
                getFull(user.id).then(u=>
                    {
                        const response = {
                            data: u,
                            isSuccess: true,
                            message: null
                        }
                        res.send(response);
                    }
                )
            })
    }
})
    .post('/register', (req, res, next) => {

    })

module.exports = app;