// const { Sequelize } = require('sequelize');
 require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,  process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mssql',
//   dialectOptions: {
//     options: {
//       encrypt: false,  // if local set false
//       //trustServerCertificate: true,
//     },
//   },
//   driver: "msnodesqlv8",
// });


// sequelize.sync();
// sequelize.sync({ alter: false,force:false });
// (async() => {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.error("Unable to connect to the database:", error);
//     }
// })();

//module.exports = sequelize;


const { Sequelize } = require('sequelize');

// Define your database connection details
const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false, // Enable on using cloude SQL
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},
  host: process.env.DB_HOST,
  port: process.env.PORT,
  database:  process.env.DB_NAME,
  username:  process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
});

sequelize.sync({ alter: false,force:false });

// Check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  
module.exports = sequelize;
