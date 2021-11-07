const Sequelize = require('sequelize');
const db = require('../config/db');

const Coin = db.define('coin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Coin;