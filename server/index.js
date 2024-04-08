const express = require('express');
const users = require('./controllers/users');
const workouts = require('./controllers/workouts');

const app = express();
const PORT = 3000;

app.use(express.json())

app.get('/', (req,res) => {
    res.send()
}).use('/api/v1/users',users).use('/api/v1/workouts',workouts);

app.listen(PORT, () => {
    console.log("Listening to port %d on localhost",PORT)
})