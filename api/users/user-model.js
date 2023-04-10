const db = require('../../data/dbConfig');

async function getAll () {
    return await db('users');
}

async function getById (id) {
    return await db('users').select('user_id','username','password').where('user_id',id).first();
}

async function getByName (name) {
    return await db('users').where('username',name).first();
}

async function create (user) {
    const [id] = await db('users').insert(user);
    const newUser = await getById(id);
    return newUser;
}

module.exports = {
    getAll,
    getById,
    getByName,
    create
}