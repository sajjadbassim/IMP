const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Acounts = sequelize.define('Acounts', {
  ID: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey:true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  FulName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Store_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Company_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Acounts', // Specify the table name here
  timestamps: false, // If you don't have timestamp columns in your table
});

module.exports = Acounts;
