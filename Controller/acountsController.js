const { Op } = require("sequelize");
const Acounts = require('../models/Acounts');
const { sendToken } = require("../middlewares/sendToken");

// Controller for getting all accounts
const getAllAcounts = async (req, res) => {
  try {
    const acounts = await Acounts.findAll();

    res.json(acounts);

  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for getting a specific account by ID

const getAcountById = async (req, res, next) => {
  try {
   // console.log(req.session.iq);
    const id = req.query.acountId;
    const  acount= await Acounts.findOne({
      where: { id: id },
    });
    if (acount === null) {
      res.send({
        success: false,
        message: "acount not found!",
      });
    } else {
      res.send({
        success: true,
        message: "acount info",
        details: acount,
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

// Controller for getting accounts by type
const getAcountByType = async (req, res) => {
  try {
    const type = req.query.type;
    const  acount= await Acounts.findOne({
      where: { type: type },
    });
    if (acount === null) {
      res.send({
        success: false,
        message: "acount type not found!",
      });
    } else {
      res.send({
        success: true,
        message: "acount  info",
        details: acount,
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

// Controller for getting accounts by type and id
const getAcountByTypeAndId = async (req, res) => {
  const  id   = req.query.id;
  const  type  = req.query.type;

  try {
    const acount = await Acounts.findAll({
      where: {
        [Op.and]: [
          id ? { ID: id } : {},
          type ? { Type: type } : {},
        ],
      },
    });

    if (acount.length === 0) {
      res.status(404).json({ error: 'Type AND ID not found' });
    } else {
      res.json(acount);
    
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { FulName, Password } = req.body;
    const acounts = await Acounts.findOne({
      where: { FulName: FulName,
        Password: Password,
      } ,

    });
    if (!acounts) {
      return res.send({
        success: false,
        message: "Invalid fullname!",
      });
    }

    /**
     * ? this login method with jwt one way hashing
     * @param req.body.password compare with @param user.password from db
     */

    sendToken(req, res, acounts);
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

module.exports = {
  getAllAcounts,
  getAcountById,
  getAcountByType,
  getAcountByTypeAndId,
 login,
};

