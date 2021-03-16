const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const materialController = require('../../controllers/MdsController/materialController');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

/* test get username password by ID */
router.post("/getMaterialTotal", materialController.getMaterialTotal);
router.post("/getRecordMaterial", materialController.getRecordMaterial);
router.post("/getMaterialByCondition", materialController.getMaterialByCondition);
router.post("/getByMaterialCode", materialController.getByMaterialCode);
router.post("/getMaterialOption", materialController.getMaterialOption);
router.post("/insertMaterial", materialController.insertmaterial);
router.post("/updateMaterial", materialController.updatematerial);
router.post("/getMaterialgenChart", materialController.getMaterialgenChart);
router.post("/getMt", materialController.getMt);
module.exports = router;