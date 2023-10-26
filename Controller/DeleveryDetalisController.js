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
   
    var query = " User_Name = N'" + fullName +"'" ;
    } else if (type === 'مندوب') {
      var query = " taxiDriver = N'" + fullName +"' AND StatosPay!=N'تم التسديد' AND Statos!=N'راجع إلى العميل' and Statos!=N'راجع الى المخزن'" ;
    } else if (type === 'بيج') {
      var query = " PageName = N'" + fullName +"'" ;
    }  else {
      res.send({
        success: false,
        message: "Access denied For This User .",
      });
     }
      const [results, metadata] = await sequelize.query(`SELECT distinct(statos) , count(*) as count FROM Delevery_Detalis WHERE ${query} Group By statos`);
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
       query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"'" ;
    } else if (type === 'مندوب') {
       query = " taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = " PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
        res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }

      const [results, metadata] = await sequelize.query(`SELECT City , count(*) as count FROM Delevery_Detalis WHERE ${query}  Group By City `);
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
      query = "User_Name = N'" + fullName + "' AND statos like N'" + statos + "'";
    } else if (type === 'مندوب') {
      query = "taxiDriver = N'" + fullName + "' AND statos like N'" + statos + "'";
    } else if (type === 'بيج') {
      query = "PageName = N'" + fullName + "' AND statos like N'" + statos + "'";
    } else {
      return res.send({
        success: false,
        message: "Access denied for this user.",
      });
    }

    const [results, metadata] = await sequelize.query(`SELECT PageName, COUNT(*) as count FROM Delevery_Detalis WHERE ${query} GROUP BY PageName`);
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
       query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"'" ;
    } else if (type === 'مندوب') {
       query = " taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = " PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
      return  res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT TaxiDriver , count(*) as count FROM Delevery_Detalis WHERE ${query}  Group By TaxiDriver `);
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
       query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
    } else if (type === 'مندوب') {
       query = " taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
    } else if (type === 'بيج') {
       query = " PageName = N'" + fullName +"'AND statos like N'" + statos +"' AND city like N'" + city + "'" ;
    }    else {
      return res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,City+'-'+Town+'-'+Location As Address,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,TaxiNotes,TaxiDriverPhone,PagePhone,PageNotes,CustName,TaxiNotes,statos from Delevery_Detalis WHERE ${query}  order by Order_ID ASC `);
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
       query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND PageName like N'"+ PageName +"%'" ;
    } else if (type === 'مندوب') {
       query = " taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"' AND PageName like N'"+ PageName +"%'" ;
    } else if (type === 'بيج') {
       query = " PageName = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    }    else {
      return  res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,City+'-'+Town+'-'+Location As Address,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,TaxiNotes,TaxiDriverPhone,PagePhone,PageNotes,CustName,TaxiNotes,statos  from Delevery_Detalis WHERE ${query}  order by Order_ID ASC `);
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
       query = " User_Name = N'" + fullName +"' AND statos like N'" + statos +"' AND TaxiDriver like N'"+ TaxiDriver +"'" ;
    } else if (type === 'مندوب') {
       query = " taxiDriver = N'" + fullName +"'AND statos like N'" + statos +"'" ;
    } else if (type === 'بيج') {
       query = " PageName = N'" + fullName +"'AND statos like N'" + statos +"' AND TaxiDriver like N'"+ TaxiDriver +"'" ;
    }    else {
      return res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(`SELECT ID,date,time,User_Name,Order_ID,City,Price2,Town,City+'-'+Town+'-'+Location As Address,PageName,PagePrice2,TaxiDriver,TaxiPrice2,PayPrice,StatosPay,CheckReturn,Store_ID,Company_ID,CustNumber,TaxiNotes,TaxiDriverPhone,PagePhone,PageNotes,CustName,TaxiNotes,statos  from Delevery_Detalis WHERE ${query}  order by Order_ID ASC `);
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

    var  query="";
    var str;
    if (type === 'بيج') {
      query = " PageName = N'" + fullName +"'" ;
      var str=`SELECT [Order_ID],[Date] ,[PageName],[CustNumber],[CustName],[City]+'-'+[Town] as Address,Price,PagePrice,PagePrice2,TaxiPrice,TaxiPrice2,[PayPrice],[TaxiDriver],[CheckReturn],[QtyReturn],[Notes] from Delevery_Detalis WHERE ${query}  order by Order_ID ASC `;
   }
    else if (type === 'مندوب') {
       query = " taxiDriver = N'" + fullName +"'" ;
       var str=`SELECT [Order_ID],[Date],[PageName],[CustNumber],[CustName],[City],[Town],Price,DriverPrice,[PayPrice],[TaxiDriver],[CheckReturn],[QtyReturn],[Notes],Statos from Delevery_Detalis WHERE ${query}  order by Order_ID ASC `;

    }     
    else {
      return res.send({
          success: false,
          message: "Access denied For This User .",
        });
       }
      const [results, metadata] = await sequelize.query(str);
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
      query.User_Name = fullName;
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
      const statos = deliveryDetails.Statos;
      if (statos === "قيد المعالجة") {
        const updatedData = {
          Statos: 'تم التوصيل من قبل المندوب',
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
      const statos = deliveryDetails.Statos;
      if (statos === "قيد المعالجة") {
   
        const taxiPrice2 = deliveryDetails.TaxiPrice2; // Retrieve the current TaxiPrice2 value
        const updatedPagePrice2 = taxiPrice2 - payprice ; // Calculate the updated PagePrice2 value
    
        const updatedData = {
          Statos: 'تم التوصيل من قبل المندوب',
          PayPrice: payprice,
          TaxiNotes: 'تغيير + توصيل',
          PagePrice2: updatedPagePrice2, // Add the updated PagePrice2 value
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
    const statos = deliveryDetails.Statos;
    if (statos === "قيد المعالجة") {
      
      const updatedData = {
        Statos: 'راجع من قبل المندوب',
        TaxiNotes: '',
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
      const statos = deliveryDetails.Statos;
      if (statos ===  "قيد المعالجة") {  
        const taxiPrice2 = deliveryDetails.TaxiPrice2; // Retrieve the current TaxiPrice2 value
        const updatedPagePrice2 = taxiPrice2 - PayPrice ; // Calculate the updated PagePrice2 value
    
        const updatedData = {
        Statos: 'راجع من قبل المندوب',
        CheckReturn: 'راجع جزئي',
        PayPrice: PayPrice,
        PagePrice2: updatedPagePrice2,
        TaxiNotes: '',
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

  };


