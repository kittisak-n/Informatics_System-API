const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const router = express.Router();

const criteria = require('../../controllers/WlsController/criteriaController');

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());



router.post("/Add_schedule", criteria.Add_schedule);

router.post("/Add_schedule_detail", criteria.Add_schedule_detail );

router.post("/Add_schedule_condition", criteria.Add_schedule_condition );

router.post("/Get_all_schedule", criteria.Get_all_schedule );

router.post("/Get_schedule_by_Id", criteria.Get_schedule_by_Id );

router.post("/Get_schedule_detail_by_scheduleID", criteria.Get_schedule_detail_by_scheduleID );

router.post("/Get_condition_by_schedule_detail_id", criteria.Get_condition_by_schedule_detail_id );

router.post("/Update_status_schedule", criteria.Update_status_schedule );



module.exports = router;