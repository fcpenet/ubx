const db = require('../models/');
var networkDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateNetwork: updateNetwork
}

function findAll() {
    return db.network.findAll({include: ["coins"]});
}

function findById(id) {
    return db.network.findByPk(id, {include: ["coins"] });
}

function deleteById(id) {
    return db.network.destroy({ where: { id: id } });
}

function create(network) {
    var newNetwork = new db.network(network);
    return newNetwork.save();
}

function updateNetwork(network, id) {
    var updateNetwork = {
        name: network.name,
        description: network.description,
    };
    return db.network.update(updateNetwork, { where: { id: id } });
}
module.exports = networkDao;