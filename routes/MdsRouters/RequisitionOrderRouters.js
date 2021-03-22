const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();


const requisitionOrderController = require('../../controllers/MdsController/requisitionOrderController');
const requisitionOrderMeterialController = require('../../controllers/MdsController/requisitionOrderMeterialController');

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post("/insertRequisitionOrder", requisitionOrderController.insertRequisitionOrder)
router.post("/getRequisitionOrderByPersonId", requisitionOrderController.getRequisitionOrderByPersonId)
router.post("/getRequisitionOrderAll", requisitionOrderController.getRequisitionOrderAll)
router.post("/getTotalRequisitionOrder", requisitionOrderController.getTotalRequisitionOrder)
router.post("/getPerpageRequisitionOrder", requisitionOrderController.getPerpageRequisitionOrder)
router.post("/getRequisitionOrderAllByDate", requisitionOrderController.getRequisitionOrderAllByDate)
router.post("/getPerpageRequisitionOrderByDate", requisitionOrderController.getPerpageRequisitionOrderByDate);
router.post("/deleteRequisitionOrder", requisitionOrderController.deleteRequisitionOrder)
router.post("/getrequisitionOrderMeterial", requisitionOrderMeterialController.getByIdRequisitionOrdermaterial);
router.post("/updateRequisitionOrder", requisitionOrderController.updateRequisitionOrder);

router.use(bodyParser.json());

module.exports = router;