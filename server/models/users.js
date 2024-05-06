const fs = require('fs/promises');
const FILENAME = __dirname + '/../data/users.json';

/** @type { Promise<{ items: User[] }> } */
let data =
    fs.access(FILENAME, fs.constants.F_OK)
    .then(() => fs.readFile(FILENAME, 'utf8'))
    .then(content => data = JSON.parse(content)).catch(err => {console.error(err)})

async function save() {
    const dat = await data;
    return fs.writeFile(FILENAME, JSON.stringify(dat))
}

class User {
    constructor(id,f,l,u,e,p,i,r,b,c) {
        /** @type {number} */
        this.id = id;
        /** @type {string} */
        this.firstName = f;
        /** @type {string} */
        this.lastName = l;
        /** @type {string} */
        this.username = u;
        /** @type {string} */
        this.email = e;
        /** @type {string} */
        this.password = p;
        /** @type {string} */
        this.image = i;
        /** @type {string} */
        this.role = r;
        /** @type {string} */
        this.birthday = b;
        /** @type {number[]} */
        this.friends = [];
        /** @type {number} */
        this.creationTimestamp = c;
    }

    /**
     * 
     * @param {string} url 
     * @returns {Promise<boolean>}
     */
    validateImageURL(url) {
        var image = new Image();
        return new Promise((resolve) => {
            
                image.onload = () => {
                    if (image.width > 0) {
                        resolve(true);
                    }
                    this.image = "";
                    resolve(false);
                }
                image.onerror = () => {
                    this.image = "";
                    resolve(false);
                }
                image.src = url;   
        })
    }
    
}

/**
 * @returns {Promise<User[]>}
 * */
async function getAll() {
    const dat = await data;
    return dat.items.map(x => ({...x, password:undefined, email: undefined  }))
}

/**
 * @param {number} id
 * @returns {Promise<User>}
 * */
async function get(id) {
    const dat = await data;
    const result = dat.items.map(x=>({...x, password:undefined })).find((item) => id === item.id);
    return result;
}

async function getFull(id) {
    const dat = await data;
    const result = dat.items.find((item) => id === item.id);
    return result;
}

/**
 * Gets the list of user/pass/id combos.
 * 
 * @returns { Promise<{id:number, username:string,password:string}[]>}
 */
async function getAuth()
{
    const dat = await data;
    return dat.items.map(x=> ({id: x.id, username: x.username, password: x.password}))
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 * */
async function search(q) {
    const dat = await data;
    return (await dat.items).filter(item => 
        new RegExp(q, 'i').test(item.firstName) ||
        new RegExp(q, 'i').test(item.lastName) ||
        new RegExp(q, 'i').test(item.email) ||
        new RegExp(q, 'i').test(item.username)).map(x=>({...x, password:undefined}));
}

/**
 * @param {User} user
 * @returns {Promise<User | string[] | null>}
 * */
async function add(user) {
    let inval = false;
    /** @type string[] */
    let invReasons = [];
    const dat = await data;
    user.id = dat.items.length;
    if((user.username.match(RegExp('\\W*'))))
        inval = true;
        invReasons.push("Username cannot contain whitespace")
    if(dat.items.findIndex((e) => e.username === user.username))
    {
        inval = true;
        invReasons.push("This username is taken")
    }
    if(user.username.length < 6 || user.username.length > 16)
    {
        inval = true;
        invReasons.push("Username must be between 6 and 16 characters in length")
    }
    if(user.email)
    {
        if(user.email.length > 320) 
        {
            inval = true;
            invReasons.push("Email is too long.")
        }
    }
    if(inval)
    {
        return invReasons;
    }

    dat.items.push(user);
    save();
    return user;
}

/**
 * @param {User} user
 * @returns {Promise<User>}
 * */
async function update(user) {
    const dat = await data;
    const index = dat.items.findIndex(item => item.id == user.id);
    if (index >= 0) {
        dat.items[index] = {
            ...dat.items[index],
            ...user
        };
        save();
        return user;
    }
    save();
    return null;
}

/**
 * @param {number} id
 * @returns {Promise<User | null>}
 * */
async function remove(id) {
    const dat = await data;
    dat.then(()=> {
        if(dat.items.find(u => u.id === id)?.admin)
        {
            return null;
        }
    })
    const index = dat.items.findIndex(item => item.id == id);
    if (index >= 0) {
        const deleted = dat.items.splice(index, 1);
        save();
        return deleted[0];
    }
    save();
    return null;
}

module.exports = {
    getAuth, getAll, get, search, add, update, remove, User, getFull
}