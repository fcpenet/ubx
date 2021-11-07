
const express = require('express');
const router = express.Router();
const networkRoutes = require('./network.route');
const coinRoutes = require('./coin.route');

router.use('/networks', networkRoutes);
router.use('/coins', coinRoutes);
module.exports = router;