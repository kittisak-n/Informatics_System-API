const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();

const userController = require('../../controllers/MpsController/personController');
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
router.post("/checkUser", userController.LoginUser);


module.exports = router;