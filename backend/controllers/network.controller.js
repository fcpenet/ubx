const networkDao = require('../dao/network.dao');
var networkController = {
    addNetwork: addNetwork,
    findNetworks: findNetworks,
    findNetworkById: findNetworkById,
    updateNetwork: updateNetwork,
    deleteById: deleteById
}

function addNetwork(req, res) {
    let network = req.body;
    networkDao.create(network).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findNetworkById(req, res) {
    networkDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    networkDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Network deleted successfully",
                network: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateNetwork(req, res) {
    networkDao.updateNetwork(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Network updated successfully",
                network: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findNetworks(req, res) {
    networkDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = networkController;