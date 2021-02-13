const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const router = express.Router();

const criteria = require('../../controllers/WlsController/criteriaController');
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


router.post("/Add_criteria", criteria.Add_criteria, (req,res) => {

    res.send(res)
});

router.post("/Get_criteria_show_detail", criteria.Get_criteria_show_detail , (req,res) => {

    res.send(res)
});


router.post("/Get_criteria_detail_by_scheduleID", criteria.Get_criteria_detail_by_scheduleID , (req,res) => {

    res.send(res)
});


module.exports = router;