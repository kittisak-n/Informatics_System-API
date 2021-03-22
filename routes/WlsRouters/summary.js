const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const router = express.Router();
const summary = require('../../controllers/WlsController/summaryController');
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


router.post("/Get_person_by_id", summary.Get_person_by_id);
router.post("/get_summary", summary.get_summary);
router.post("/get_summary_detail_by_summary_id", summary.get_summary_detail_by_summary_id);

router.post("/get_summary_by_person_id", summary.get_summary_by_person_id);

router.post("/get_summary_by_year", summary.get_summary_by_year);

router.post("/get_summary_of_report", summary.get_summary_of_report);
router.post("/get_summary_of_report", summary.get_summary_of_report);
