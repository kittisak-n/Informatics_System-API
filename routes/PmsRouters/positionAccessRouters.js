const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const positionaccessController = require('../../controllers/PmsController/positionaccessController');

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

// /* test get username password by ID */
router.post("/insertPositionAccess", positionaccessController.insertPositionAccess);
router.post("/getAllPositionAccess", positionaccessController.getAllPositionAccess);
router.post("/getByIdPositionAccess", positionaccessController.getByIdPositionAccess);



module.exports = router;