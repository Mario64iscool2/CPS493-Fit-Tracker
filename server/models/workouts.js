const fs = require('fs/promises');
const FILENAME = __dirname + '/../data/workouts.json';
const DATANAME = __dirname + '/../data/likes.json';

/** @type { Promise<{ items: import('../controllers/workouts').IWorkout[] }> } */
let data =
    fs.access(FILENAME, fs.constants.F_OK)
    .then(() => fs.readFile(FILENAME, 'utf8'))
    .then(content => data = JSON.parse(content)).catch(err => {console.error(err)})

/** @typedef { {id: number, likes: number} } LikeMap  */

/** @type { Promise<{ items: {id: number, likes: number}[]}} */
let data2 =
    fs.access(DATANAME, fs.constants.F_OK)
    .then(()=> fs.readFile(DATANAME, 'utf8'))
    .then(content => data2 = JSON.parse(content)).catch(err => {console.error(err)})


/**
 * @typedef {import('../../client/src/model/workoutactivity').IWorkout} Workout
 * */

/**
 * @typedef {import('../../client/src/model/workoutactivity').Discipline} Discipline
 */

/**
 * @returns {Promise<Workout[]>}
 * */
async function getAll() {
    const dat = await data;
    return dat.items.map(x => ({...x }))
}

/**
 * @param {number} u 
 * @param { Discipline[] | undefined } d
*/
async function getFiltered(u, d) {
    const dat = await data;
    let res = dat.items.filter(item => {
        if(d !== undefined && d.length > 0)
        {
            return item.creator === u && d.includes(item.discipline)
        }
        else
        {
            return item.creator === u
        }
    })
    return res;
}


/**
 * @param {number} id
 * @returns {Workout}
 * */
function get(id) {
    return data.items.find(item => item.id == id);
}


/**
 * @param {Workout} workout
 * @returns {Workout}
 * */
function add(workout) {
    workout.id = data.items.length + 1;
    data.items.push(workout);
    return workout;
}

/**
 * @param {Workout} workout
 * @returns {Workout}
 * */
function update(workout) {
    const index = data.items.findIndex(item => item.id == workout.id);
    if (index >= 0) {
        data.items[index] = {
            ...data.items[index],
            ...workout
        };
        return workout;
    }
    return null;
}

/**
 * @param {number} id
 * @returns {Workout | null}
 * */
async function remove(id) {
    const dat = await data;
    const index = dat.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = data.items.splice(index, 1);
        return deleted[0];
    }
    return null;
}

async function like(id)
{
    const dat = await data;
    const dat2 = await data2;
    const item = dat.items.find(item => item.id == id)
    /** @type { LikeMap } */
    let item2 = dat2.items.find(item => item.id == id)
    if(!(item && item2))
    {
        if(!item)
        {
            //Abort this operation as we're trying to like a deleted post.
            return;
        }
        if(!item2)
        {
            //If a like counter for this post doesn't exist, create it.
            item2 = { id: item.id, likes:0 }
        }
    }
}

async function getLikes(id)
{
    const dat = await data2;
    const item = dat.items.find(item => item.id == id)
    if(item)
    {
        return item.likes;
    }
    return null;
}

module.exports = {
    getAll, get, getFiltered, add, update, remove, like, getLikes
}