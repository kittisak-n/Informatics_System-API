const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const systemController = require('../../controllers/PmsController/systemController');
const subsystemController = require('../../controllers/PmsController/subsystemController');

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
router.post("/getSystem", systemController.getSystem);
router.post("/getSubSystem", subsystemController.getSubSystem);

module.exports = router;