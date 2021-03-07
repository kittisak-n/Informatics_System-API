const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const router = express.Router();
const calculation = require('../../controllers/WlsController/calculationController');
module.exports = router;
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.post("/Get_course_by_Id", calculation.Get_course_by_Id);
router.post("/Get_group_by_Id", calculation.Get_group_by_Id);
router.post("/Get_dataCal_by_Id", calculation.Get_dataCal_by_Id);
router.post("/Get_person_by_Id", calculation.Get_person_by_Id);
router.post("/Get_subcourse_by_course_id", calculation.Get_subcourse_by_course_id);




