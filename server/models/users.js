/** @type { { items: User[] } } */
const data = require('../data/users.json');

/**
 * @typedef {import('../../client/src/model/users').User} User
 * */

/**
 * @returns {User[]}
 * */
function getAll() {
    return data.items.map(x=> ({
        ...x, password: undefined, admin: undefined,
    }))
}

/**
 * @param {number} id
 * @returns {User}
 * */
function get(id) {
    return data.items.find(item => item.id === id);
}

/**
 * @param {string} q
 * @returns {User[]}
 * */
function search(q) {
    return getAll().filter(item => 
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email) );
}

/**
 * @param {User} user
 * @returns {User}
 * */
function add(user) {
    user.id = data.items.length + 1;
    data.items.push(user);
    return user;
}

/**
 * @param {User} user
 * @returns {User}
 * */
function update(user) {
    const index = data.items.findIndex(item => item.id == user.id);
    if (index >= 0) {
        data.items[index] = {
            ...data.items[index],
            ...user
        };
        return user;
    }
    return null;
}

/**
 * @param {number} id
 * @returns {User | null}
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
    getAll, get, search, add, update, remove
}