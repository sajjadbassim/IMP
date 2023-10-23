const Money = require('../models/Money');
const sequelize= require('../db/database');

const getAllMoney = async (req, res) => {
    try {
    const money = await Money.findAll();
      if (money === null) {
        res.send({
          success: false,
          message: "money type not found!",
        });
      } else {
        res.send({
          success: true,
          message: "money  info",
          details: money,
        
        });
      }
    } catch (err) {
      // ! Error Logger send message : error and send User id for join
  
      res.send({
        success: false,
        message: err.message,
      });
    }
  };

  const getlMoneyById = async (req, res, next) => {
    try {
     // console.log(req.session.iq);
      const id = req.user.ID;
       console.log(id);
      const  money= await Money.findOne({
        where: { id: id },
      });
      if (money === null) {
        res.send({
          success: false,
          message: "Money not found!",
        });
      } else {
        res.send({
          success: true,
          message: "Money info",
          details: money,
        });
      }
    } catch (err) {
      // ! Error Logger send message : error and send User id for join
  
      res.send({
        success: false,
        message: err.message,
      });
    }
  };


  const getMoneyReport = async (req, res) => {
    try {
      const id = req.user.ID;
      const type = req.user.Type;
    
      
      var  query="";
      if (type === 'موظف') {
         query = "" ;
      } 
      else if (type === 'مندوب') {
         query = "WHERE Money.ID = '"+ id +"'" ;
      } 
      else if (type === 'بيج') {
         query = "WHERE Money.ID = '"+ id +"'" ;
      }    
      else {
          res.send({
            success: false,
            message: "Access denied For This User .",
          });
         }
        const [results, metadata] = await sequelize.query(`SELECT [Order_ID] ,[Cust_Name],[PriceForUs],[PriceForHim],[Date],[Notes],[Type] FROM [Money]  ${query} `);
        const details = results;
        if (!results || results.length === 0) {
          return res.send({
            success: true,
            message: "No Results",
            details: "",
          });
        }
      res.send({
          success: true,
          message: `Delivery details info Town and count For ${type}`,
          details: details,
        });
   
    } 
    catch (err) {
      // ! Error Logger send message: error and send User id for join
      res.send({
        success: false,
        message: err.message,
      });
    }
  };
  module.exports = {
    getAllMoney,
    getlMoneyById,
    getMoneyReport,

  };


