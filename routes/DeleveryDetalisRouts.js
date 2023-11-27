const express = require('express');
const router = express.Router();
const DeleveryDetalisController = require('../Controller/DeleveryDetalisController');
const {isAuthenticatedUser} = require('../middlewares/isAuth');

// GET all acounts
router.get('/getbyID',isAuthenticatedUser, DeleveryDetalisController.getbyID);
router.get('/getstatos',isAuthenticatedUser, DeleveryDetalisController.getDetalisStatosAndCount);
router.get('/gettown',isAuthenticatedUser, DeleveryDetalisController.geDetalisTown);
router.get('/getpagename',isAuthenticatedUser, DeleveryDetalisController.geDetalisPageNameAndCount);
router.get('/getTaxiDriver',isAuthenticatedUser, DeleveryDetalisController.geDetalisTaxiDriverAndCount);
router.get('/DetalisbyCity',isAuthenticatedUser, DeleveryDetalisController.getDetalisbyCity);
router.get('/DetalisbyPageName',isAuthenticatedUser, DeleveryDetalisController.getDetalisbyPageName);
router.get('/DetalisbyTaxiDriver',isAuthenticatedUser, DeleveryDetalisController.getDetalisbyTaxiDriver);
router.get('/DetalisReport',isAuthenticatedUser, DeleveryDetalisController.getDetalisReport);

router.get('/getDetalis',isAuthenticatedUser, DeleveryDetalisController.getDetalisbyStatus);
router.get('/getStatusAndOrderID',isAuthenticatedUser, DeleveryDetalisController.getStatusAndOrderID);

router.get('/searchByOrderID_Phone',isAuthenticatedUser, DeleveryDetalisController.searchByOrderID_Phone);

router.put('/DeleveryDone',isAuthenticatedUser, DeleveryDetalisController.DeliveryDone);
router.put('/DeliveryDoneWithChange',isAuthenticatedUser, DeleveryDetalisController.DeliveryDoneWithChange);
router.put('/DeliveryReturn',isAuthenticatedUser, DeleveryDetalisController.DeliveryReturn);
router.put('/DeliveryPartialReturn',isAuthenticatedUser, DeleveryDetalisController.DeliveryPartialReturn);
//router.put('/ChangePriceAndDelivery',isAuthenticatedUser, DeleveryDetalisController.ChangePriceAndDelivery);
module.exports = router;
