const coinDao = require('../dao/coin.dao');
var coinController = {
    addCoin: addCoin,
    findCoins: findCoins,
    findCoinById: findCoinById,
    updateCoin: updateCoin,
    deleteById: deleteById,
    findCoinsByNetwork: findCoinsByNetwork
}

function addCoin(req, res) {
    let coin = req.body;
    let networkId = req.body.networkId;
    coinDao.create(networkId, coin).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findCoinById(req, res) {
    coinDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    coinDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Coin deleted successfully",
                coin: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateCoin(req, res) {
    coinDao.updateCoin(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Coin updated successfully",
                coin: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findCoins(req, res) {
    coinDao.findByNetwork(req.query.networkId).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findCoinsByNetwork(req, res) {
    coinDao.findByNetwork(req.query.networkId).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = coinController;