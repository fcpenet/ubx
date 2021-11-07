const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coin.controller');

router.post('/', coinController.addCoin);
router.get('/', coinController.findCoins);
router.get('/:id', coinController.findCoinById);
router.put('/:id', coinController.updateCoin);
router.delete('/:id', coinController.deleteById);

module.exports = router;