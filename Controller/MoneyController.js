const Money = require('../models/Money');
const sequelize= require('../db/database');
const { Op } = require("sequelize");

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


  // const getMoneyReport = async (req, res) => {
  //   try {
  //     const id = req.user.ID;
  //     const type = req.user.Type;
  
  //     const options = {
  //       page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
  //       paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
  //     };
  //     let whereClause = {};
  
  //     if (type === 'مندوب' || type === 'بيج') {
  //       whereClause = { ID: id };
  //     } else if (type !== 'موظف') {
  //       return res.send({
  //         success: false,
  //         message: "Access denied For This User .",
  //       });
  //     }
  
  //     const details = await Money.paginate({
  //       ...options,
  //       where: whereClause,
  //       attributes: [
  //         'Order_ID',
  //         'Cust_Name',
  //         'PriceForUs',
  //         'PriceForHim',
  //         'Date',
  //         'Notes',
  //         'Type',
  //       ],
  //     });
  
  //     if (!details || details.length === 0) {
  //       return res.send({
  //         success: true,
  //         message: "No Results",
  //         details: "",
  //       });
  //     }
  
  //     res.send({
  //       success: true,
  //       message: `Delivery details info Town and count For ${type}`,
  //       details,
  //     });
  //   } catch (err) {
  //     // Log the error and send an error message to the client
  //     console.error(err);
  //     res.send({
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // };

  const getMoneyReport = async (req, res) => {
    try {
      const id = req.user.ID;
      const type = req.user.Type;
      // const status = req.query.statos;
      const options = {
        page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
        paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
      };
      let whereClause = {};
  
      if (type === 'مندوب' || type === 'بيج') {
        whereClause = { ID: id ,
          // statos: { [Op.like]: status },
        };
      } else if (type == 'موظف') {
        whereClause = { 
          // statos: { [Op.like]: status },
        };
      }
      else{
        return res.send({
          success: false,
          message: "Access denied For This User .",
        });
      }
  
      const details = await Money.paginate({
        ...options,
        where: whereClause,
        attributes: [
          'Order_ID',
          'Cust_Name',
          'PriceForUs',
          'PriceForHim',
          'Date',
          'Notes',
          'Type',
        ],
      });
  
  
      if (!details || details.length === 0) {
        return res.send({
          success: true,
          message: "No Results",
          details: "",
        });
      }
      const details2 = await Money.findAll({
        where: whereClause,
      });
      let totalPriceForUs = 0;
      let totalPriceForHim = 0;
      let total = 0;
      details2.forEach(item => {
        totalPriceForUs += item.PriceForUs;
        totalPriceForHim += item.PriceForHim;
      });   
      res.send({
        success: true,
        message: `Delivery details info Town and count For ${type}`,
        details,
        totalPriceForUs:totalPriceForUs,
        totalPriceForHim:totalPriceForHim,
        total:totalPriceForHim-totalPriceForUs
      });
    } catch (err) {
      // Log the error and send an error message to the client
      console.error(err);
      res.send({
        success: false,
        message: err.message,
      });
    }
  };



  const getMoneyReportByDate1 = async (req, res) => {
    try {
      console.log("-------------");
      // const id = req.user.ID;
      // const type = req.user.Type;
  
      // const options = {
      //   page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
      //   paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
      // };
      // let whereClause = {};
  
      // if (type === 'مندوب' || type === 'بيج') {
      //   whereClause = { ID: id };
      // } else if (type !== 'موظف') {
      //   return res.send({
      //     success: false,
      //     message: "Access denied For This User .",
      //   });
      // }
  
      // const details = await Money.paginate({
      //   ...options,
      //   where: whereClause,
      
      //   attributes: [
      //     'Order_ID',
      //     'Cust_Name',
      //     'PriceForUs',
      //     'PriceForHim',
      //     'Date',
      //     'Notes',
      //     'Type',
      //   ],
      // });
  
      // if (!details || details.length === 0) {
      //   return res.send({
      //     success: true,
      //     message: "No Results",
      //     details: "",
      //   });
      // }
  
      // res.send({
      //   success: true,
      //   message: `Delivery details info Town and count For ${type}`,
      //   details,
      // });
    } catch (err) {
      // Log the error and send an error message to the client
      console.error(err);
      res.send({
        success: false,
        message: err.message,
      });
    }
  };
  

  // const getMoneyReportByDate = async (req, res) => {
  //   try {
  //     const id = req.user.ID;
  //     const type = req.user.Type;
  
  //     const options = {
  //       page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
  //       paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
  //     };
  //     let whereClause = {};
  
  //     if (type === 'مندوب' || type === 'بيج') {
  //       whereClause = { ID: id };
  //     } else if (type !== 'موظف') {
  //       return res.send({
  //         success: false,
  //         message: "Access denied For This User .",
  //       });
  //     }
  //     const startDate =new Date('01-10-2023'); // تاريخ البداية
  //     const endDate =new Date('08-10-2023'); // تاريخ البداية
  //     const details = await Money.paginate({
  //       ...options,
  //       where: {
  //         ...whereClause,
  //         Date: {
  //           [Op.between]: [startDate, endDate],
  //         },
  //       },
      
  //       attributes: [
  //         'Order_ID',
  //         'Cust_Name',
  //         'PriceForUs',
  //         'PriceForHim',
  //         'Date',
  //         'Notes',
  //         'Type',
  //       ],
  //     });
  
  //     if (!details || details.length === 0) {
  //       return res.send({
  //         success: true,
  //         message: "No Results",
  //         details: "",
  //       });
  //     }
  
  //     res.send({
  //       success: true,
  //       message: `Delivery details info Town and count For ${type}`,
  //       details,
  //     });
  //   } catch (err) {
  //     // Log the error and send an error message to the client
  //     console.error(err);
  //     res.send({
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // };

  module.exports = {
    getAllMoney,
    getlMoneyById,
    getMoneyReport,

  };


