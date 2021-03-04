const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const postionaccessController = require('../../controllers/PmsController/postionaccessController');

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
router.post("/insertPositionAccess", postionaccessController.insertPositionAccess);
router.post("/getAllPositionAccess", postionaccessController.getAllPositionAccess);

module.exports = router;