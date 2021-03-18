const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const personController = require('../../controllers/PmsController/personController');
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
router.post("/checkUser", personController.checkUser);
router.post("/searcLdaphPerson", personController.searcLdaphPerson);
router.post("/getAllPerson", personController.getAllPerson);
router.post("/getPrefixTh", personController.getPrefixTh);

router.post("/getAmphures", personController.getAmphures);
router.post("/getDistricts", personController.getDistricts);
router.post("/getProvinces", personController.getProvinces);

router.post("/getPosition", personController.getPosition);
router.post("/getByIdPerson", personController.getByIdPerson);
router.post("/getpositionAccess", personController.getpositionAccess);
router.post("/getSystemByIdPerson", personController.getSystemByIdPerson);

router.post("/insertPerson", personController.insertPerson);
router.post("/updatePerson", personController.updatePerson);
router.post("/closePersonId", personController.closePersonId);
router.post("/changeStatusPositionAccess", personController.changeStatusPositionAccess);

router.post("/deletePerson", personController.deletePerson);
router.post("/deletePrepair", personController.deletePrepair);

router.post("/getPervinceId", personController.getPervinceId);
router.post("/getAmphureId", personController.getAmphureId);
router.post("/getDistrictId", personController.getDistrictId);
router.post("/getPrefixId", personController.getPrefixId);
router.post("/getPositionId", personController.getPositionId);
router.post("/getPositionName", personController.getPositionName);
router.post("/getPostionAccessById", personController.getPostionAccessById);
router.post("/updatePermission", personController.updatePermission);
router.post("/checkPerson", personController.checkPerson);

module.exports = router;