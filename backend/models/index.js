const db = {};

db.network = require("./network.model")
db.coin = require("./coin.model")

db.network.hasMany(db.coin, { as: "coins" });
db.coin.belongsTo(db.network, {
  foreignKey: "networkId",
  as: "network",
});

module.exports = db;