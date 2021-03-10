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
router.post("/getallcourse", insertcourse.get_all_course);
router.post("/getcoursedetail", insertcourse.get_section_by_course_id);
router.post("/changestatus", insertcourse.change_status_section);
router.post("/getsubject", insertcourse.get_subject_by_person_id);
router.post("/getsubjectunit", insertcourse.get_subject_unit_by_person_id);
router.post("/editpersonsection", insertcourse.edit_person_section);
router.post("/getsectiondetailid", insertcourse.get_section_detail_by_id);
router.post("/editsectiondetail", insertcourse.edit_section_detail);
