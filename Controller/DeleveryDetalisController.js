const { Op } = require("sequelize");
const DeleveryDetalis = require('../models/DeleveryDetalis');
const sequelize= require('../db/database');

// Controller for getting all accounts
const getbyID = async (req, res) => {
  try {
    const id = req.query.id; // Assuming you're passing the detail ID as a route parameter
  
    const detail = await DeleveryDetalis.findByPk(id);
  
    if (!detail) {
      res.send({
        success: false,
        message: "Detail not found!",
      });
    } else {
      res.send({
        success: true,
        message: "Detail info",
        detail: detail,
      });
    }
  } catch (err) {
    // Error Logger: Log the error and send an appropriate response
    console.error(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
  };

// Controller for getting delivery details by User_Name

// const getDeleveryDetalis = async (req, res) => {
//   try {
//     const fullName = req.user.FulName;

//     const [results, metadata] = await sequelize.query(`SELECT * FROM Delevery_Detalis WHERE PageName = N'${fullName}'`);
//     const details = results;
//     console.log(results);

//     if (details.length === 0) {
//       res.send({
//         success: false,
//         message: "Details not found!",
//       });
//     } else {
//       res.send({
//         success: true,
//         message: "Details info",
//         details: details,
//       });
//     }
//   } catch (err) {
//     // ! Error Logger send message: error and send User id for join
//     res.send({
//       success: false,
//       message: err.message,
//     });
//   }
// };

const getDetalisStatosAndCount = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    var  query="";
    if (type === 'موظف') {
    var query = "WHERE User_Name = N'" + fullName +"'" ;
    var query = "" ;

    } else if (type === 'مندوب') {
      var query = "WHERE taxiDriver = N'" + fullName +"' AND StatosPayTaxy!=N'تم التسديد' AND Statos!=N'راجع إلى العميل' and Statos!=N'راجع الى المخزن'" ;
    } else if (type === 'بيج') {
      var query = "WHERE PageName = N'" + fullName +"'" ;
    }  else {
      res.send({
        success: false,
        message: "Access denied For This User .",
      });
     }
      const [results, metadata] = await sequelize.query(`SELECT distinct(statos) , count(*) as count FROM Delevery_Detalis  ${query} Group By statos`);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
          details: "",
        });
      }
      
    res.send({
        success: true,
        message: `Delivery details info statos and count For ${type}`,
        details: details,
      });
      console.log("🚀 ~ file: DeleveryDetalisController.js:86 ~ getDetalisStatosAndCount ~ details:", details)

    }
  catch (err) {
    // ! Error Logger send message: error and send User id for join
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const geDetalisTown = async (req, res) => {

  try {

    const fullName = req.user.FulName;
    const type = req.user.Type;
    let statos = req.query.statos;

    // Check if statos is undefined or null
    if (typeof statos === 'undefined' || statos === '') {
      res.send({
        success: false,
        message: " statos is 'undefined' OR null",
      });
    }
    var  query="";
    if (type === 'موظف') {
      //  query = "WHERE User_Name = N'" + fullName +"' AND statos like N'" + statos +"'" ;
      var query = "WHERE statos like N'" + statos +"'" ;
    } else if (type === 'مندوب') {
       query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
        res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }

      const [results, metadata] = await sequelize.query(`SELECT City , count(*) as count FROM Delevery_Detalis  ${query}  Group By City `);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
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

const geDetalisPageNameAndCount = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const statos = req.query.statos;
    
    // Check if statos is undefined or empty
    if (typeof statos === 'undefined' || statos === '') {
      return res.send({
        success: false,
        message: "statos is 'undefined' or null",
      });
    }

    var query = "";
    if (type === 'موظف') {
      // query = "WHERE User_Name = N'" + fullName + "' AND statos like N'" + statos + "'";
      var query = "WHERE statos like N'" + statos + "'" ;
    } else if (type === 'مندوب') {
      query = "WHERE taxiDriver = N'" + fullName + "' AND statos like N'" + statos + "'";
    } else if (type === 'بيج') {
      query = "WHERE PageName = N'" + fullName + "' AND statos like N'" + statos + "'";
    } else {
      return res.send({
        success: false,
        message: "Access denied for this user.",
      });
    }

    const [results, metadata] = await sequelize.query(`SELECT PageName, COUNT(*) as count FROM Delevery_Detalis  ${query} GROUP BY PageName`);
    const details = results;
    if (!results || results.length === 0) {
      return res.send({
        details: "",
      });
    }
    return res.send({
      success: true,
      message: `Delivery details info Town and count for ${type}`,
      details: details,
    });
  } catch (err) {
    // ! Error Logger send message: error and send User id for join
    res.send({
      success: false,
      message: err.message,
    });
  }
};


const geDetalisTaxiDriverAndCount = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const statos = req.query.statos ;
        // Check if statos is undefined or null
        if (typeof statos === 'undefined' || statos === '') {
          return res.send({
            success: false,
            message: "statos is 'undefined' or null",
          });
        }  
    var  query="";
    if (type === 'موظف') {
      //  query = "WHERE User_Name = N'" + fullName +"' AND statos like N'" + statos +"'" ;
      var query = "WHERE statos like N'" + statos + "'" ;
    } else if (type === 'مندوب') {
       query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
      return  res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT TaxiDriver , count(*) as count FROM Delevery_Detalis  ${query}  Group By TaxiDriver `);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
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

const getDetalisbyCity = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const city = req.query.city ;
    const statos = req.query.statos ;
        // Check if statos is undefined or null
        if (typeof statos === 'undefined' || statos === '') {
          return res.send({
            success: false,
            message: "statos is 'undefined' or null",
          });
        }
                // Check if city is undefined or null
                if (typeof city === 'undefined' || city === '') {
                  return res.send({
                    success: false,
                    message: "city is 'undefined' or null",
                  });
                }
    var  query="";
    if (type === 'موظف') {
      //  query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
      var query = "WHERE statos like N'" + statos +"' AND city like N'" + city + "'" ;
    } else if (type === 'مندوب') {
       query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
    } else if (type === 'بيج') {
       query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
    }    else {
      return res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,TaxiNotes,TaxiDriverPhone,PagePhone,PageNotes,CustName,TaxiNotes,statos from Delevery_Detalis  ${query}  order by Order_ID ASC `);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
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

const getDetalisbyPageName = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const statos = req.query.statos ;
    const PageName = req.query.PageName;

        // Check if statos is undefined or null
        if (typeof statos === 'undefined' || statos === '') {
          return res.send({
            success: false,
            message: "statos is 'undefined' or null",
          });
        }    
          //Check if PageName is undefined or null
          if (typeof PageName === 'undefined' || PageName === '') {
            return res.send({
              success: false,
              message: "PageName is 'undefined' or null",
            });
          }   
    var  query="";
    if (type === 'موظف') {
      //  query = "WHERE User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND PageName like N'"+ PageName +"%'" ;
     query = "WHERE statos like N'" + statos +"' AND PageName like N'"+ PageName +"%'" ;
    } else if (type === 'مندوب') {
       query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"' AND PageName like N'"+ PageName +"%'" ;
    } else if (type === 'بيج') {
       query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
      return  res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,TaxiNotes,TaxiDriverPhone,PagePhone,PageNotes,CustName,TaxiNotes,statos  from Delevery_Detalis  ${query}  order by Order_ID ASC `);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
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

const getDetalisbyTaxiDriver = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const statos = req.query.statos ;
    const TaxiDriver = req.query.TaxiDriver;

        // Check if statos is undefined or null
        if (typeof statos === 'undefined' || statos === '') {
          return res.send({
            success: false,
            message: "statos is 'undefined' or null",
          });
        } 
                // Check if TaxiDriver is undefined or null
                if (typeof TaxiDriver === 'undefined' || TaxiDriver === '') {
                  return res.send({
                    success: false,
                    message: "TaxiDriver is 'undefined' or null",
                  });
                }    
    
    var  query="";
    if (type === 'موظف') {
      //  query = "WHERE User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND TaxiDriver like N'"+ TaxiDriver +"'" ;
      var query = "WHERE statos like N'" + statos +"' AND TaxiDriver like N'"+ TaxiDriver +"'" ;
    } else if (type === 'مندوب') {
       query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"' AND TaxiDriver like N'"+ TaxiDriver +"'" ;
    }    else {
      return res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,TaxiNotes,TaxiDriverPhone,PagePhone,PageNotes,CustName,TaxiNotes,statos  from Delevery_Detalis  ${query}  order by Order_ID ASC `);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
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

const getDetalisReport = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const status = req.query.statos;

    if (typeof status === 'undefined' || status === '') {
      return res.send({
        success: false,
        message: "status is 'undefined' or null",
      });
    }
    const options = {
      page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
      paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
    };
    let whereClause = {};

    if (type === 'بيج') {
      
      whereClause = {
        PageName: fullName,
        statos: { [Op.like]: status },
      };
    } else if (type === 'مندوب') {
    
      whereClause = {
        taxiDriver: fullName,
        statos: { [Op.like]: status },
      };
    } else if (type === 'موظف') {
      
      whereClause = {
        statos: { [Op.like]: status },
      };
    }

    const details = await DeleveryDetalis.paginate({
      ...options,
      where: whereClause,
      order: [['Order_ID', 'ASC']],
      attributes: [
        'Order_ID',
        'Date',
        'PageName',
        'CustNumber',
        'CustName',
        'City',
        'Town',
        'Price',
        'DriverPrice',
        'PayPrice',
        'TaxiDriver',
        'CheckReturn',
        'QtyReturn',
        'Notes',
        'Statos', // Include this if it's part of your table
      ],
    });

    if (!details || details.length === 0) {
      return res.send({
        details: "",
      });
    }
    const details2 = await DeleveryDetalis.findAll({
    
      where: whereClause,

      order: [['Order_ID', 'ASC']],
     
    });
          let totalPayPrice = 0;
      let totalTaxiPrice = 0;
      let totalPagePrice2 =0;
      let totalDriverPrice =0;

        details2.forEach(item => {
        totalPayPrice += item.PayPrice;
        totalTaxiPrice += item.TaxiPrice2;
        totalPagePrice2+=item.PagePrice2;
        totalDriverPrice+=item.DriverPrice;
        
      }); 
    res.send({
      success: true,
      message: `Delivery details info Town and count For ${type}`,
      details,
      totalPayPrice,
      totalTaxiPrice,
      totalPagePrice2,
      totalDriverPrice,
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

// const getDetalisReportbyDate = async (req, res) => {
//   try {
//     const fullName = req.user.FulName;
//     const type = req.user.Type;
//     const status = req.query.statos;
//     const startDate = req.query.startDate;
//     const endDate = req.query.endDate;

//     if (typeof status === 'undefined' || status === '') {
//       return res.send({
//         success: false,
//         message: "status is 'undefined' or null",
//       });
//     }

//     const options = {
//       page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
//       paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
//     };

//     let whereClause = {
//       statos: { [Op.like]: status },
//     };
//     if (startDate && endDate) {
//       whereClause.Date = {
//         [Op.between]: [startDate, endDate],
//       };
//     }
//     if (type === 'بيج') {
//       whereClause.PageName = fullName;
//     } else if (type === 'مندوب') {
//       whereClause.taxiDriver = fullName;
//     }

//     const details = await DeleveryDetalis.paginate({
//       ...options,
//       where: whereClause,

//       order: [['Order_ID', 'ASC']],
//       attributes: [
//         'Order_ID',
//         'date',
//         'PageName',
//         'CustNumber',
//         'CustName',
//         'City',
//         'Town',
//         'Price',
//         'PayPrice',//
//         'TaxiDriver',
//         'TaxiPrice2',//
//         'CheckReturn',
//         'QtyReturn',
//         'Notes',
//         'Statos',
//         'DriverPrice',
//       ],
//     });
  

//     const details2 = await DeleveryDetalis.findAll({
    
//       where: whereClause,

//       order: [['Order_ID', 'ASC']],
     
//     });
//     if (!details || details.length === 0) {
//       return res.send({
//         details: "",
//       });
//     }
//       let totalPayPrice = 0;
//       let totalTaxiPrice = 0;
//       let totalPagePrice2 =0;
//       let totalDriverPrice =0;

//         details2.forEach(item => {
//         totalPayPrice += item.PayPrice;
//         totalTaxiPrice += item.TaxiPrice2;
//         totalPagePrice2+=item.PagePrice2;
//         totalDriverPrice+=item.DriverPrice;
        
//       }); 
//     res.send({
//       success: true,
//       message: `Delivery details info Town and count For ${type}`,
//       details,
//       totalPayPrice,
//       totalTaxiPrice,
//       totalPagePrice2,
//       totalDriverPrice,
//     });
//   } catch (err) {
//     console.error(err);
//     res.send({
//       success: false,
//       message: err.message,
//     });
//    }
// };


// const getDetalisbyStatus = async (req, res) => {
//   try {
//     const fullName = req.user.FulName;
//     const type = req.user.Type;
//     const statos = req.query.statos ;
//         // Check if statos is undefined or null
//         if (typeof statos === 'undefined' || statos === '') {
//           return res.send({
//             success: false,
//             message: "statos is 'undefined' or null",
//           });
//         }
//     var  query="";
//     if (type === 'موظف') {
//       //  query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
//       var query = "WHERE statos like N'" + statos +"'" ;
//     } else if (type === 'مندوب') {
//        query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"' AND StatosPayTaxy!=N'تم التسديد' " ;
//     } else if (type === 'بيج') {
//        query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"' AND StatosPayTaxy!=N'تم التسديد' " ;
//     }    else {
//       return res.send({
//           success: false,
//           message: "Access denied For This User .",
//         });
//        }
//       const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,CustName,statos from Delevery_Detalis  ${query}  order by Order_ID ASC `);
//       const details = results;
//       if (!results || results.length === 0) {
//         return res.send({
//           details: "",
//         });
//       }
//     res.send({
//         success: true,
//         message: `Delivery details info Town and count For ${type}`,
//         details: details,
//       });
 
//   } 
//   catch (err) {
//     // ! Error Logger send message: error and send User id for join
//     res.send({
//       success: false,
//       message: err.message,
//     });
//   }
// };


const getStatusAndOrderID = async (req, res) => {
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const statos = req.query.statos ;
        // Check if statos is undefined or null
        if (typeof statos === 'undefined' || statos === '') {
          return res.send({
            success: false,
            message: "statos is 'undefined' or null",
          });
        }
    var  query="";
    if (type === 'موظف') {
      //  query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
      var query = "WHERE statos like N'" + statos +"'" ;
    } else if (type === 'مندوب') {
       query = "WHERE taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = "WHERE PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
      return res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,Order_ID,statos from Delevery_Detalis  ${query}  order by Order_ID ASC `);
      const details = results;
      if (!results || results.length === 0) {
        return res.send({
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
const searchByOrderID_Phone = async (req, res) => {
  
  try {
    const fullName = req.user.FulName;
    const type = req.user.Type;
    const txtsearch = req.query.txtsearch;
    const custNumber = req.query.custNumber || ''; // Use the provided custNumber or an empty string if not provided
    let query = {
      Order_ID: txtsearch,
    };
   
    if (type === 'بيج') {
      query.PageName = fullName;
    } else if (type === 'مندوب') {
      query.taxiDriver = fullName;
    }
    else if (type === 'موظف') {
      // query.User_Name = fullName;
    }
     else {
      return res.send({
        success: false,
        message: "Access denied For This User.",
      });
    }
    query = {
      Order_ID: txtsearch,
    };
    const detailsByOrderID = await DeleveryDetalis.findAll({
      where: query,
      order: [['Order_ID', 'ASC']],
    });
  
    if (detailsByOrderID.length > 0) {
      res.send({
        success: true,
        message: `Delivery details info Town and count For ${type} (filtered by Order_ID)`,
        details: detailsByOrderID,
      });
    } 
    else {
      // If no data is found by Order_ID, search again by CustNumber
      query = {
        CustNumber: txtsearch,
      };
  
      const detailsByCustNumber = await DeleveryDetalis.findAll({
        where: query,
        order: [['Order_ID', 'ASC']],
      });
  
      if (detailsByCustNumber.length > 0) {
        res.send({
          success: true,
          message: `Delivery details info Town and count For ${type} (filtered by CustNumber)`,
          details: detailsByCustNumber,
        });
      } else {
        res.send({
          success: true,
          message: `No data found for ${type} (filtered by Order_ID or CustNumber)`,
          details: "",
        });
      }
    }
  } catch (err) {
    // Error Logger: Log the error and send an appropriate response
    console.error(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
  

};

  // const DeliveryDone = async (req, res) => {
  //   try {
  //   const id = req.body.id;
  //   const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details
  //   const statos = deliveryDetails.Statos; 
  //   console.log("🚀 ~ file: DeleveryDetalisController.js:478 ~ DeliveryDone ~ statos:", statos)

  //   if (statos !== "تم التوصيل من قبل المندوب" ) {
  //     return res.send({
  //       success: false,
  //       message: "statos is :"+statos,
  //     });
  //   }
  //   const updatedData = {
  //   Statos: 'تم التوصيل من قبل المندوب',
  //   TaxiNotes: '',
  //   };
  //   const details = await DeleveryDetalis.update(updatedData, {
  //     where: { ID: id },
  //   });
    
  //   if (details === 0) {
  //     res.send({
  //       success: false,
  //       message: "Details not found!",
  //     });
  //   } else {
  //     res.send({
  //       success: true,
  //       message: "Details updated successfully!",
  //     });
  //   }
  // } catch (err) {
  //   res.send({
  //   success: false,
  //   message: err.message,
  //   });
  //   }
  // };
  const getDetalisbyStatus = async (req, res) => {
    try {
      let details
      const fullName = req.user.FulName;
      const type = req.user.Type;
      const statos = req.query.statos;        
      
      const options = {
        page: req.query.page ? parseInt(req.query.page) : 1, // Default 1
        paginate: req.query.paginate ? parseInt(req.query.paginate) : 1, // Default 25
      };
   
  
      // Check if statos is undefined or null
      if (typeof statos === 'undefined' || statos === '') {
        return res.send({
          success: false,
          message: "statos is 'undefined' or null",
        });
      }
 
      if (type === 'موظف') {
         details = await DeleveryDetalis.paginate({
          ...options,
          where: {
            statos: { [Op.like]: statos },
          },
          order: [['Order_ID', 'ASC']],
  
        });
      } else if (type === 'مندوب') {
         details = await DeleveryDetalis.paginate({
          ...options,
          where: {
            taxiDriver: fullName,
            statos: { [Op.like]: statos },
          },
          order: [['Order_ID', 'ASC']],
        });
      } else if (type === 'بيج') {
        
         details = await DeleveryDetalis.paginate({
          ...options,
          where: {
            PageName: fullName,
            statos: { [Op.like]: statos },
          },
          order: [['Order_ID', 'ASC']],
        });
      
      } else {
        return res.send({
          success: false,
          message: "Access denied For This User.",
        });
      }
  
      if (!details || details.length === 0) {
        return res.send({
          details: "",
        });
      }
  
      res.send({
        success: true,
        message: `Delivery details info Town and count For ${type}`,
        details: details,
      });
    } catch (err) {
      // Error Logger: send message and user id for debugging
      res.send({
        success: false,
        message: err.message,
      });
    }
  };
  const DeliveryDone = async (req, res) => {
    try {
      const id = req.body.id;
      const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details  
      
      if (!deliveryDetails) {
        return res.send({
          success: false,
          message: "Details not found!",
        });
      }

      const statos = deliveryDetails.statos;
     
      if (statos === "قيد المعالجة" || statos === "راجع من قبل المندوب") {
        const updatedData = {
          statos: 'تم التوصيل من قبل المندوب',
          TaxiNotes: '',
        };
       
        await DeleveryDetalis.update(updatedData, {
          where: { ID: id },
        });
        return res.send({
          success: true,
          message: "Details updated successfully!",
        });
      } 
      else {
        return res.send({
          success: false,
          message: "هذا الطلب  هو " + statos,
        });
      }
    } 
    catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  };
  
    
  // const DeliveryDoneWithChange = async (req, res) => {
  //   try {
  //     const id = req.body.id;
  //     const payprice = req.body.payprice; // Corrected to req.body.payprice
  //     const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details
  //     const statos = deliveryDetails.Statos;

  //     if (!deliveryDetails) {
  //       return res.send({
  //         success: false,
  //         message: "Details not found!",
  //       });
  //     }
  
  //     const taxiPrice2 = deliveryDetails.TaxiPrice2; // Retrieve the current TaxiPrice2 value
  //     const updatedPagePrice2 = payprice - taxiPrice2; // Calculate the updated PagePrice2 value
  
  //     const updatedData = {
  //       Statos: 'تم التوصيل من قبل المندوب',
  //       PayPrice: payprice,
  //       TaxiNotes: 'تغيير + توصيل',
  //       PagePrice2: updatedPagePrice2, // Add the updated PagePrice2 value
  //     };
  
  //     await DeleveryDetalis.update(updatedData, {
  //       where: { ID: id },
  //     });
  
  //     res.send({
  //       success: true,
  //       message: "Details updated successfully!",
  //     });
  //    } 
  //   catch (err) {
  //     res.send({
  //       success: false,
  //       message: err.message,
  //     });
  //   }
  // };
  
  const DeliveryDoneWithChange = async (req, res) => {
    try {
      const id = req.body.id;
      const payprice = req.body.payprice; // Corrected to req.body.payprice
      const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details
      
      if (!deliveryDetails) {
        return res.send({
          success: false,
          message: "Details not found!",
        });
      }
      const statos = deliveryDetails.statos;
      console.log(deliveryDetails);
      var status_update = "تم التوصيل من قبل المندوب"
      var updatePayPrice = deliveryDetails.PayPrice;
      var Notes;
      var PagePrice2;
      if (statos === "قيد المعالجة"|| statos === "راجع من قبل المندوب") {
   
        const taxiPrice2 = deliveryDetails.TaxiPrice2; // Retrieve the current TaxiPrice2 value
        const updatedPagePrice2 = payprice-taxiPrice2 ; // Calculate the updated PagePrice2 value
          if(payprice === updatePayPrice){
             console.log("===========================================");
            updatePayPrice = deliveryDetails.PayPrice;
            PagePrice2=deliveryDetails.PagePrice2
            Notes='';
          }else{
            console.log("**********************************************");
            updatePayPrice = payprice;
            Notes='تغيير + توصيل';
            PagePrice2 =  updatedPagePrice2;
          
          }

          const updatedData = {
          statos: status_update,
          PayPrice: updatePayPrice,
          Notes: Notes,
          PagePrice2: PagePrice2, // Add the updated PagePrice2 value
        };    
        await DeleveryDetalis.update(updatedData, {
          where: { ID: id },
        });
        res.send({
          success: true,
          message: "Details updated successfully!",
        });
      }
      else {
        return res.send({
          success: false,
          message:"هذا الطلب  هو " + statos,
        });
      } 
  
     } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  };
  
  const DeliveryReturn = async (req, res) => {
    try {
    const id = req.body.id;
    const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details
    if (!deliveryDetails) {
      return res.send({
        success: false,
        message: "Details not found!",
      });
    }
    const statos = deliveryDetails.statos;
    if (statos === "قيد المعالجة" || statos === "راجع من قبل المندوب") {
      
      const updatedData = {
        statos: 'راجع من قبل المندوب',
        Notes: '',
        };
        const details = await DeleveryDetalis.update(updatedData, {
          where: { ID: id },
        });
        res.send({
          success: true,
          message: "Details updated successfully!",
        });
    }
    else {
      return res.send({
        success: false,
        message: "هذا الطلب  هو " + statos,
      });
    }
  } 
  catch (err) {
    res.send({
    success: false,
    message: err.message,
    });
    }
  };
  
  const DeliveryPartialReturn = async (req, res) => {
    try {
      const {id, PayPrice } = req.body;
      const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details
      if (!deliveryDetails) {
        return res.send({
          success: false,
          message: "Details not found!",
        });
      }
      const statos = deliveryDetails.statos;
      if (statos ===  "قيد المعالجة" || statos === "راجع من قبل المندوب")  {  
        const taxiPrice2 = deliveryDetails.TaxiPrice2; // Retrieve the current TaxiPrice2 value
        const updatedPagePrice2 =   PayPrice-taxiPrice2 ; // Calculate the updated PagePrice2 value

        const updatedData = {
        statos: 'راجع من قبل المندوب',
        CheckReturn: 'راجع جزئي',
        PayPrice: PayPrice,
        PagePrice2: updatedPagePrice2,
        Notes: '',
        };
        
        await DeleveryDetalis.update(updatedData, {
          where: { ID: id },
        });
        res.send({
          success: true,
          message: "Details updated successfully!",
        });
      }
      else {
        return res.send({
          success: false,
          message: "هذا الطلب  هو " + statos,
        });
      }

  } 
  catch (err) {
    res.send({
    success: false,
    message: err.message,
    });
    }
  };
 
  // const ChangePriceAndDelivery = async (req, res) => {
  //   try {
  //     //const id = req.body.id;
  //     const {id, PayPrice, PagePrice2 } = req.body;
  //     const deliveryDetails = await DeleveryDetalis.findOne({ where: { ID: id } }); // Retrieve the existing details
  //     if (!deliveryDetails) {
  //       return res.send({
  //         success: false,
  //         message: "Details not found!",
  //       });
  //     }
  //     const statos = deliveryDetails.Statos;
  //     if (statos === "تم التوصيل من قبل المندوب" || statos === "راجع من قبل المندوب") {
  //       const updatedData = {
  //         Statos: 'راجع من قبل المندوب',
  //         CheckReturn: 'راجع جزئي',
  //         PayPrice: PayPrice,
  //         PagePrice2: PagePrice2,
  //         TaxiNotes: 'تغيير + توصيل',
  //         };
  //         const details = await DeleveryDetalis.update(updatedData, {
  //           where: { ID: id },
  //         });
  //       res.send({
  //         success: true,
  //         message: "Details updated successfully!",
  //       });
  //   }
  //   else {
  //     return res.send({
  //       success: false,
  //       message: "Can not update the Statos is : " + statos,
  //     });
  //     }
  // } 
  // catch (err) {
  //   res.send({
  //   success: false,
  //   message: err.message,
  //   });
  //   }
  // };
module.exports = {
    getbyID,
    getDetalisStatosAndCount,
    geDetalisTown,
    geDetalisPageNameAndCount,
    geDetalisTaxiDriverAndCount,
    getDetalisbyCity,
    getDetalisbyPageName,
    getDetalisbyTaxiDriver,
    DeliveryDone,
    DeliveryReturn,
    DeliveryPartialReturn,
   // ChangePriceAndDelivery,
    DeliveryDoneWithChange,
    getDetalisReport,
    searchByOrderID_Phone,
    getDetalisbyStatus,
    getStatusAndOrderID,
    // getDetalisReportbyDate,

  };


