const sequelize = require('../connection');
const { Sequelize } = require('sequelize');

const people = sequelize.define('people', {
  person_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = people;