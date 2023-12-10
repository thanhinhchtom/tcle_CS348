const sequelize = require('../connection');
const { Sequelize } = require('sequelize');

const in_products = sequelize.define('input_storage', {
  product_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  quantity: Sequelize.INTEGER,
  person_id: Sequelize.INTEGER,
});

module.exports = in_products;