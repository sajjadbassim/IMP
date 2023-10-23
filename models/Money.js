const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Money = sequelize.define('Money', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey:true,
  },
  Order_ID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PriceForUs: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  PriceForHim: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Money', // Specify the table name here
  timestamps: false, // If you don't have timestamp columns in your table
});


module.exports = Money;
