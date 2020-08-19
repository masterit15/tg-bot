const Sequelize = require("sequelize");
const sequelize = require('../db')
const Site = sequelize.define("sites", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  url: { type: Sequelize.STRING, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: true },
  chatId: { type: Sequelize.INTEGER, allowNull: true }
})

module.exports = Site