const Network = require('../models/Network');
var networkDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateNetwork: updateNetwork
}

function findAll() {
    return Network.findAll();
}

function findById(id) {
    return Network.findByPk(id);
}

function deleteById(id) {
    return Network.destroy({ where: { id: id } });
}

function create(network) {
    var newNetwork = new Network(network);
    return newNetwork.save();
}

function updateNetwork(network, id) {
    var updateNetwork = {
        name: network.name,
        description: network.description,
    };
    return Network.update(updateNetwork, { where: { id: id } });
}
module.exports = networkDao;