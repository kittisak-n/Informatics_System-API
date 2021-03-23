const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const unitController = require('../../controllers/MdsController/unitController');
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
router.post("/getAllUnit", unitController.getAllUnit);
router.post("/insertUnit", unitController.insertUnit);
router.post("/updateUnit", unitController.updateUnit);

module.exports = router;