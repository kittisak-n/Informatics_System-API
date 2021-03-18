const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const materialController = require('../../controllers/MdsController/materialController');
const meterialAdjustController = require('../../controllers/MdsController/meterialAdjustController');
const purchaseOrderMeterialController = require('../../controllers/MdsController/purchaseOrderMeterialController');

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
router.post("/getMaterialDetail", materialController.getByMaterialCode);
router.post("/getMaterialimport", purchaseOrderMeterialController.getPurchaseOrdermaterialById);
router.post("/getAdjustlist", meterialAdjustController.getAdjustByMaterialCode)
router.post("/insertAdjust", meterialAdjustController.insertmaterialAdjust)
router.post("/deleteAdjust", meterialAdjustController.deleteMaterialAdjust)
module.exports = router;