const dbConnect = require("../../connectDB");
exports.edit_person_section = (req, res) => {
    let sql_edit_person_section = ""
    sql_edit_person_section = `UPDATE wls_section_person as person
    SET  person.section_person_unit = ? , person.section_person_lecture_unit = ? , person.section_person_lab_unit = ? , person.section_person_learning_unit = ? 
    WHERE person.person_id = ? AND person.section_id = ?`

    try {
        dbConnect.query(sql_edit_person_section, [req.body.unit, req.body.lecture_unit, req.body.lab_unit, req.body.learning_unit, req.body.person_id, req.body.section_id], (err, results) => {
            if (err) {
                res.json({
                    status: false,
                    message: "edit unit Fail",
                    results: err,
                });
                throw (err)
            } else {
                res.json({
                    status: true,
                });
            }
        })
    } catch (error) {
        console.log(error)
    }
}
exports.get_subject_unit_by_person_id = (req, res) => {
    console.log("person", req.body.person_id)

    let sql_get_subject_unit_by_person_id = "";
    sql_get_subject_unit_by_person_id = `SELECT section.section_id , person.person_id , 
    person.section_person_unit , person.section_person_lecture_unit , person.section_person_lab_unit ,person.section_person_learning_unit 
    FROM wls_section_person AS person
    LEFT JOIN wls_section AS section
    ON person.section_id = section.section_id
    WHERE person.person_id = ? AND section.section_id = ?`
    try {
        dbConnect.query(sql_get_subject_unit_by_person_id, [req.body.person_id, req.body.section_id], (err, results) => {
            if (err) {
                res.json({
                    status: false,
                    message: "Get Subject Fail",
                    results: err,
                });
                throw (err)
            } else {
                res.json({
                    status: true,
                    message: "Get Subject",
                    results: results,
                });
            }
        })
    } catch (error) {
        console.log(error)
    }
}
exports.get_subject_by_person_id = (req, res) => {
    console.log(req.body.person_id)
    let sql_get_subject_by_person_id = "";
    sql_get_subject_by_person_id = `SELECT section.section_id , section.section_number , 
    section.section_name , person.person_id , 
    person.section_person_unit , person.section_person_lecture_unit , 
    person.section_person_lab_unit ,person.section_person_learning_unit , 
    course.course_code , course.course_name
    FROM wls_section_person AS person
    LEFT JOIN wls_section AS section
    ON person.section_id = section.section_id
    LEFT JOIN wls_course AS course
    ON section.section_course_id = course.course_id
    WHERE person.person_id = ? AND section.section_status = 1
    GROUP BY section.section_number `


    try {
        dbConnect.query(sql_get_subject_by_person_id, [req.body.person_id], (err, results) => {
            if (err) {
                res.json({
                    status: false,
                    message: "Get Subject Fail",
                    results: err,
                });
                throw (err)
            } else {
                res.json({
                    status: true,
                    message: "Get Subject",
                    results: results,
                });
            }
        })
    } catch (error) {
        console.log(error)
    }

}
exports.get_all_course = (req, res) => {
    let sql_get_all_course = "";
    sql_get_all_course += `SELECT * FROM wls_course `

    dbConnect.query(sql_get_all_course, (err, results) => {
        if (err) {
            res.json({
                status: false,
                message: "Get Fail",
                results: err,
            });
        } else {
            res.json({
                status: true,
                message: "Get Success",
                results: results
            });
        }
    })
}
exports.get_section_by_course_id = (req, res) => {
    console.log(req.body.course_id)
    try {
        get_section(req.body.course_id, function (result) {
            console.log(result)
            res.json({
                results: result
            })
        })
    } catch (error) {
        callback(error)
    }
}
exports.change_status_section = (req, res) => {
    let change_section_status = "";
    change_section_status = `UPDATE wls_section SET section_status = 0  WHERE section_id = ?;`
    try {
        console.log("Section ID :", req.body.section_id)
        dbConnect.query(change_section_status, [req.body.section_id], (err, results) => {
        })
    } catch (error) {
        console.log(error)
    }
}
exports.InsertCourseExcel = (req, res) => {
    // Check Section ซ้ำ ก่อน Insert
    console.log(req.body.course)

    try {
        req.body.course.forEach(function (course, index) {
            getCourseId(course.course_code, function (results) {
                console.log(results)
                if (results.length === 0) {
                    InsertCourse(course, function (results) {
                        course.course_id = results;
                        // console.log(course.course_section)
                        course.course_section.forEach(function (section, index) {
                            InsertSection(section, course.course_id, req.body.course_term, req.body.course_year, function (results) {
                                section.section_id = results
                                section.section_date.forEach(function (section_date, index) {
                                    InsertSectionDetail(section_date, section.section_id, function (results) {
                                        getPersonId(section_date, function (results) {
                                            console.log(results);
                                            section_date.course_person = results[0].person_id
                                            section_date.course_person_position = results[0].person_position
                                            InsertSectionPserson(section_date, section.section_id, function (results) {

                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                } else {
                    console.log('insert dup');
                    getCourseId(course.course_code, function (results) {
                        course.course_id = results[0].course_id
                        course.course_section.forEach(function (section, index) {
                            getCountSectionDuplicate(course.course_id, section.section_number, function (results) {
                                console.log("Count Sectoion :", results[0].count_section) // Check count section
                                // if (results[0].count_section == 0) { // Add New section
                                InsertSection(section, course.course_id, req.body.course_term, req.body.course_year, function (results) {
                                    section.section_id = results
                                    section.section_date.forEach(function (section_date, index) {
                                        InsertSectionDetail(section_date, section.section_id, function (results) {
                                            getPersonId(section_date, function (results) {
                                                console.log(results);
                                                section_date.course_person = results[0].person_id
                                                section_date.course_person_position = results[0].person_position
                                                InsertSectionPserson(section_date, section.section_id, function (results) {

                                                })
                                            })
                                        })
                                    })
                                })
                                // }
                            })
                        })

                    })
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// Call start All Function ----------------------------------------------------------------------------------------------------------------------------------
const getCourseId = (value, callback) => {
    console.log(value);
    //Check Course ซ้ำ ก่อน Insert
    let sqlGetCourseId = "";
    sqlGetCourseId += `SELECT course_id FROM wls_course WHERE course_code = ?`;
    try {
        dbConnect.query(sqlGetCourseId, [value], function (err, results) {
            if (err) {
                throw err;
            } else {
                callback(results)
            }
        })
    } catch (error) {
        callback(false)
    }
}
async function getPersonId(value, callback) {
    let sql_get_person = "";
    sql_get_person += `SELECT person_id , person_position FROM pms_person WHERE person_username  = ?`;

    try {
        dbConnect.query(sql_get_person, value.course_person, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    message: "Get Person Fail",
                    results: err,
                });
                throw (err)
            } else {
                callback(results)
            }
        })
    } catch (error) {
        callback(false)
    }
}
async function getCountSectionDuplicate(course_id, section_number, callback) {
    let sql_get_id_section = "";
    sql_get_id_section += `SELECT COUNT(section_course_id) as count_section FROM wls_section WHERE section_course_id  = ? AND section_number = ?`;

    try {
        dbConnect.query(sql_get_id_section, [course_id, section_number], function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    message: "Get course Fail",
                    results: err,
                });
                throw (err)
            } else {
                callback(results)
            }
        })
    } catch (error) {
        callback(false)
    }
}
async function getSectionId(value, callback) {
    //Get Section ID
    let sql_get_id_section = "";
    sql_get_id_section += `SELECT section_id FROM wls_section WHERE section_number = ?`;

    dbConnect.query(sql_get_id_section, course.กลุ่ม, function (err, result) {
        if (err) {
            res.json({
                status: false,
                message: "Get course Fail",
                results: err,
            });
        } else { }
    })
}


const InsertCourse = (ele, callback) => {
    //Insert Course
    let sql_insert_course = "";
    sql_insert_course += `INSERT INTO wls_course(course_code,
    course_year,
    course_name,
    course_unit,
    course_lecture_unit,
    course_lab_unit,
    course_learning_unit,
    course_syllabus_id,
    course_create_by,
    course_create_date,
    course_update_by,
    course_update_date)`;
    sql_insert_course += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    try {
        dbConnect.query(sql_insert_course, [
            ele.course_code, //course_code 
            ele.course_year, //course_year
            ele.course_name, //course_name
            ele.course_unit, //course_unitt
            ele.course_lac_unit, //course_lactrue_unit
            ele.course_lab_unit, //course_lab_unit
            ele.course_self_unit, //course_learning_unit
            ele.course_type,//course_syllabus_id
            1, //course_create_by PS_id
            new Date(), //course_create_date2
            1, //course_update_by PS_id
            new Date() //course_update_date
        ], (err, results) => {
            if (err) {
                throw err
            } else {
                callback(results.insertId)
            }
        })
    } catch (error) {
        callback(error)
    }

}

const InsertSection = (ele, course_id, section_term, section_year, callback) => {

    //Insert Section
    let sql_insert_section = "";
    sql_insert_section += `INSERT INTO wls_section(section_course_id, 
        section_number,
        section_name,
        section_student,
        section_term,
        section_year,
        section_status, 
        section_create_by, 
        section_create_date, 
        section_update_by, 
        section_update_date)`
    sql_insert_section += `VALUES(?,?,?,?,?,?,?,?,?,?,?)`

    try {
        dbConnect.query(sql_insert_section, [
            course_id,
            ele.section_number,
            ele.section_detail,
            ele.section_student,
            section_term, //section_term
            section_year, //section_year
            1, //section_status
            1,
            new Date(),
            1,
            new Date()
        ], (err, results) => {
            if (err) {
                throw err;
            } else {
                callback(results.insertId)
            }
        })
    } catch (error) {
        callback(error);
    }
}

async function InsertSectionDetail(ele, section_id, callback) {

    //Insert Section Detail
    let sql_insert_section_detail = "";
    sql_insert_section_detail += `INSERT INTO wls_section_detail(section_id, 
        section_detail_day, 
        section_detail_start_time, 
        section_detail_end_time,
        section_detail_room,
        section_detail_create_by, 
        section_detail_create_date, 
        section_detail_update_by, 
        section_detail_update_date)`
    sql_insert_section_detail += `VALUES(?,?,?,?,?,?,?,?,?)`

    try {
        dbConnect.query(sql_insert_section_detail, [
            section_id,
            ele.section_date,
            ele.section_start,
            ele.section_end,
            ele.section_room,
            1,
            new Date(),
            1,
            new Date()
        ], (err, results) => {
            if (err) {
                throw err;
            } else {
                callback(results.insertId)
            }
        })
    } catch (error) {
        callback(error)
    }

}

async function InsertSectionPserson(ele, section_id, callback) {

    //Insert Section Person
    let sql_insert_section_person = "";
    sql_insert_section_person += `INSERT INTO wls_section_person(section_id, 
        person_id, 
        person_postion_id,
        section_person_unit,
        section_person_lecture_unit,
        section_person_lab_unit,
        section_person_learning_unit,
        section_person_create_by,
        section_person_create_date, 
        section_person_update_id, 
        section_person_update_date)`
    sql_insert_section_person += `VALUES(?,?,?,?,?,?,?,?,?,?,?)`

    try {
        dbConnect.query(sql_insert_section_person, [
            section_id,
            ele.course_person, //person id
            ele.person_position, //person_postion_id
            0,
            0,
            0,
            0,
            1, //section_person_create_by
            new Date(), //section_person_create_date
            1, //section_person_update_id
            new Date(), //section_person_update_date
        ], (err, results) => {
            if (err) {
                throw err
            }
            else {
                console.log("Insert Complete")
                callback(true)
            }
        })
    } catch (error) {
        callback(error)
    }

}
const get_section = (value, callback) => {
    console.log(value);
    let get_section = "";
    get_section += `SELECT section_id, section_number, section_student , section_name
                    FROM wls_section
                    WHERE section_course_id = ? and section_status = 1`;
    try {
        dbConnect.query(get_section, [value], (err, results) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                console.log("result length", results.length)
                let course_detail = [];
                if (results.length == 0) {
                    callback(0)
                } else {
                    results.forEach(function (ele, index) {
                        if (index != results.length - 1) {
                            get_section_detail(ele.section_id, function (result) {
                                course_detail.push({
                                    section_id: ele.section_id,
                                    section_number: ele.section_number,
                                    section_student: ele.section_student,
                                    section_name: ele.section_name,
                                    section_date: result
                                })
                            })
                        } else {
                            get_section_detail(ele.section_id, function (result) {
                                course_detail.push({
                                    section_id: ele.section_id,
                                    section_number: ele.section_number,
                                    section_student: ele.section_student,
                                    section_name: ele.section_name,
                                    section_date: result
                                })
                                callback(course_detail);
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        console.log(error)
        callback(error)
    }
}
const get_section_detail = (value, callback) => {
    let get_section_detail = ``;
    get_section_detail += ` SELECT  section_detail_day,section_detail_start_time,section_detail_end_time,section_detail_room
                            FROM wls_section_detail
                            where section_id = ?`
    try {
        dbConnect.query(get_section_detail, [value], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                callback(results)
            }
        });
    } catch (error) {
        callback(error);
    }
}

