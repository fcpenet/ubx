
const express = require('express');
const router = express.Router();
const networkRoutes = require('./networks.route');

router.use('/networks', networkRoutes);
module.exports = router;