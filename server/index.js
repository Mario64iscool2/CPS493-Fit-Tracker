require('dotenv').config({path:["./.env"]});
const express = require('express');
const path = require('path');
const config = require('config');
const auth = require('./controllers/auth');
const users = require('./controllers/users');
const workouts = require('./controllers/workouts');

/** @typedef {import('../client/src/model/transportTypes').DataEnvelope<void> } ErrorDataEnvelope */


const app = express();
const PORT = config.get('port');

app.use(express.static('client/dist'))

app.use(express.json())


.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})


.use('/api/v1/users',users)
.use('/api/v1/workouts',workouts)
.use('/api/v1/auth',auth)
.use((req,res, next) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    next();
})
app.use((err, req, res, next) => {
    console.error(err);
    /** @type {ErrorDataEnvelope} */
    const results = {
        data: null,
        isSuccess: false,
        message: err.message || "Unable to Complete Request"
    };
    res.status(500).send(results);
})


app.listen(PORT, () => {
    console.log("Listening to port %d on localhost",PORT)
})