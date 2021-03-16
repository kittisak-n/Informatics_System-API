const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const purchaseOrderController = require('../../controllers/MdsController/purchaseOrderController');
const purchaseOrderMeterialController = require('../../controllers/MdsController/purchaseOrderMeterialController');
const { route } = require("./typeRouters");
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
router.post("/getPurchaseOrderTotal", purchaseOrderController.getPurchaseOrderTotal);
router.post("/getByCondition", purchaseOrderController.getPurchaseOrderByCondition);
router.post("/getRecordPurchaseOrder", purchaseOrderController.getRecordPurchaseOrder);
router.post("/insertPurchaseOrder", purchaseOrderController.insertPurchaseOrder);
router.post("/getByID", purchaseOrderMeterialController.getByID);
router.post("/getPurchaseOrderMeterialByIdMeterial", purchaseOrderMeterialController.getPurchaseOrdermaterialById);
router.post("/genChartByMonth", purchaseOrderController.genChartByMonth);

module.exports = router;