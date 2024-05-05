const users = require('./users')

/** @param {{username: string, password: string}} u  */
async function login(u) {
    console.log({u})
    const auths = await users.getAuth();
    const userCheck = auths.find((user)=>user.username === u.username)
    console.log({userCheck})
    if (userCheck === undefined) {
        return new Promise.reject('No Such User');
    }
    if (userCheck.password === u.password) {
        return users.get(userCheck.id);
    }
    else {
        return new Promise.reject('No Match');    
    }
}

module.exports = { login }