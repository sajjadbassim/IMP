const express = require('express');
const router = express.Router();
const AcountsController = require('../Controller/acountsController');
const {isAuthenticatedUser} = require('../middlewares/isAuth');

// GET all acounts
router.get('/',isAuthenticatedUser ,AcountsController.getAllAcounts);

// GET a specific acount By ID
router.get('/byId',isAuthenticatedUser, AcountsController.getAcountById);

// GET a specific acount By Type
router.get('/byType',isAuthenticatedUser, AcountsController.getAcountByType);

// GET a specific acount By Type AND ID
router.get('/byTypeAndId',isAuthenticatedUser, AcountsController.getAcountByTypeAndId);

router.post('/login', AcountsController.login);

// router.get('/isAuth', isAuthenticatedUser, (req, res, next) => {
//     const token = req.header('token') || null
//     res.json(
//         { 
//             token: token,
//             success: true,
//             message: 'Auth successful', 
//            // user: req.user,
//             // sessionID: req.sessionID,
//             // session: req.session
//         }

//     )
//     //console.log(user.ID);

// });
module.exports = router;
