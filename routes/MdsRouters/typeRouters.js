const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const typeController = require('../../controllers/MdsController/typeController');
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
router.post("/getAlltype", typeController.getAllType);
router.post("/insertType", typeController.insertType);
router.post("/updateType", typeController.updateType);

module.exports = router;