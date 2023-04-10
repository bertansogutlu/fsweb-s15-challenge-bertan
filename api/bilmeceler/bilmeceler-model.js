const db = require('../../data/dbConfig');

async function getAll () {
    return await db('riddles');
}

async function getById (id) {
    return await db('riddles').where('id',id).first();
}

async function create (riddle) {
    const [id] = await db('riddles').insert(riddle);
    const yeniBilmece = await getById('123Dh34TyTa');
    return id;
}

async function update (id,gorev) {
    await db('Gorevler').where('GorevID',id).update(gorev);
    const guncelGorev = await getById(id);
    return guncelGorev;
}

async function remove (id) {
    const silinenBilmece = await getById(id);

    return silinenBilmece;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}