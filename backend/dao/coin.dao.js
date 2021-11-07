const db = require('../models/');
var coinDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateCoin: updateCoin,
    findByNetwork: findByNetwork
}

function findAll() {
    return db.coin.findAll();
}

function findById(id) {
    return db.coin.findByPk(id);
}

function findByNetwork(networkId) {
    const options = {
        where: {}
    };

    if (networkId !== undefined && networkId !== null && networkId !== '') 
        options.where.networkId = networkId;

    return db.coin.findAll(options)
}

function deleteById(id) {
    return db.coin.destroy({ where: { id: id } });
}

function create(networkId, coin) {
    var newCoin = new db.coin({name: coin.name, description: coin.description, networkId: networkId});
    return newCoin.save();
}

function updateCoin(coin, id) {
    var updateCoin = {
        name: coin.name,
        description: coin.description,
    };
    return db.coin.update(updateCoin, { where: { id: id } });
}
module.exports = coinDao;