// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/database');

// const DeliveryDetails = sequelize.define('DeliveryDetails', {
//   ID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   Date: {
//     type: DataTypes.DATE,
//   },
//   User_Name: {
//     type: DataTypes.STRING,
//   },
//   Order_ID: {
//     type: DataTypes.INTEGER,
//   },

//   PageName: {
//     type: DataTypes.STRING,
//   },
//   CustNumber: {
//     type: DataTypes.INTEGER,
//   },
//   City: {
//     type: DataTypes.STRING,
//   },
//   Town: {
//     type: DataTypes.STRING,
//   },
//   Price2: {
//     type: DataTypes.FLOAT,
//   },
//   TaxiDriver: {
//     type: DataTypes.STRING,
//   },
//   TaxiPrice2: {
//     type: DataTypes.FLOAT,
//   },
//   PagePrice2: {
//     type: DataTypes.FLOAT,
//   },
//   Statos: {
//     type: DataTypes.STRING,
//   },
//   StatosPay: {
//     type: DataTypes.STRING,
//   },
//   CheckReturn: {
//     type: DataTypes.BOOLEAN,
//   },
//   Store_ID: {
//     type: DataTypes.INTEGER,
//   },
//   Company_ID: {
//     type: DataTypes.INTEGER,
//   },
// });
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const DeliveryDetails = sequelize.define('Delevery_Detalis', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Date: {
    type: DataTypes.DATE,
  },
  Time: {
    type: DataTypes.TIME,
  },
  User_Name: {
    type: DataTypes.STRING,
  },
  Order_ID: {
    type: DataTypes.INTEGER,
  },
  PageName: {
    type: DataTypes.STRING,
  },
  CustNumber: {
    type: DataTypes.INTEGER,
  },
  City: {
    type: DataTypes.STRING,
  },
  Town: {
    type: DataTypes.STRING,
  },
  Price2: {
    type: DataTypes.FLOAT,
  },
  TaxiDriver: {
    type: DataTypes.STRING,
  },
  TaxiPrice2: {
    type: DataTypes.FLOAT,
  },
  PagePrice2: {
    type: DataTypes.FLOAT,
  },  
  PayPrice: {
    type: DataTypes.FLOAT,
  },
  Statos: {
    type: DataTypes.STRING,
  },
  StatosPay: {
    type: DataTypes.STRING,
  },
  CheckReturn: {
    type: DataTypes.STRING,
  },
  Store_ID: {
    type: DataTypes.INTEGER,
  },
  Company_ID: {
    type: DataTypes.INTEGER,
  },
  TaxiNotes: {
    type: DataTypes.STRING,
  },
}, 
{
  timestamps: false, // Disable timestamps
});

module.exports = DeliveryDetails;

