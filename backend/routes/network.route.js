const express = require('express');
const router = express.Router();
const networkController = require('../controllers/network.controller');

router.post('/', networkController.addNetwork);
router.get('/', networkController.findNetworks);
router.get('/:id', networkController.findNetworkById);
router.put('/:id', networkController.updateNetwork);
router.delete('/:id', networkController.deleteById);

module.exports = router;