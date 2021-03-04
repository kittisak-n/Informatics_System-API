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
router.post("/getPostionAccess", personController.getPostionAccess);

router.post("/insertPerson",personController.insertPerson);
module.exports = router;