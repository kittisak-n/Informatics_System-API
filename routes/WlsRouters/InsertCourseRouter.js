const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const router = express.Router();
module.exports = router;
const insertcourse = require('../../controllers/WlsController/InsertCourseController');
/* test get username password by ID */

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post("/insertcourse", insertcourse.InsertCourseExcel);