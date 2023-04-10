const db = require('../../data/dbConfig');
const uuid = require('uuid');

async function getAll () {
    return await db('riddles');
}

async function getById (id) {
    return await db('riddles').where('id',id).first();
}

async function create (riddle) {
    riddle.id = uuid.v4()
    await db('riddles').insert(riddle);
    const yeniBilmece = await getById(riddle.id);
    return yeniBilmece;
}

module.exports = {
    getAll,
    getById,
    create
}