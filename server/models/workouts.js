/** @type { { items: IWorkout[] } } */
const data = require('../data/workouts.json');

/**
 * @typedef {import('../../client/src/model/workoutactivity').IWorkout} Workout
 * */

/**
 * @returns {Workout[]}
 * */
function getAll() {
    return data.items.map(x=> ({
    }))
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
function remove(id) {
    const index = data.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = data.items.splice(index, 1);
        return deleted[0];
    }
    return null;
}

module.exports = {
    getAll, get, add, update, remove
}