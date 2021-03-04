const dbConnect = require("../../connectDB");


exports.InsertCourseExcel = (req, res) => {
    try {
        req.body.course.forEach(ele => {
            getCourseId(ele.course_code, function (result) {
                if (result.length === 0) {
                    console.log('Insert Course Process');
                    InsertCourse(ele, function (result) {
                        ele.course_id = result
                        InsertSection(ele, function (result) {
                            ele.date.forEach(function (ele) {
                                ele.section_id = result;
                                InsertSectionDetail(ele, function (results) {
                                    console.log(results);
                                })
                                InsertSectionPserson(ele, function (results) {
                                    console.log(results);
                                })
                            })
                        });
                    })
                } else {
                    console.log('Insert Duplicate Course Process');
                    getCourseId(ele.course_code, function (result) {
                        ele.course_id = result[0].course_id
                        getCountSectionDuplicate(ele, function (result) {
                            console.log("Count Sectoion :", result[0].count_section)
                            if (result[0].count_section == 0) {
                                InsertSection(ele, function (result) {
                                    ele.date.forEach(function (ele) {
                                        ele.section_id = result;
                                        InsertSectionDetail(ele, function (results) {
                                            console.log(results);
                                        })
                                        InsertSectionPserson(ele, function (results) {
                                            console.log(results);
                                        })
                                    })
                                });
                            } else {
                                console.log("Count Sectoion Duplicate")
                                getSectionId(ele, function (result) {
                                    console.log("Section ID :", result[0].section_id)
                                    ele.section_id = result[0].section_id
                                    ele.date.forEach(function (ele) {
                                        ele.section_id = result[0].section_id
                                        InsertSectionDetail(ele, function (results) {
                                            console.log(results);
                                        })
                                        InsertSectionPserson(ele, function (results) {
                                            console.log(results);
                                        })
                                    })
                                })
                            }
                        })
                    })
                }
            })
        });
    } catch (error) {
        console.log(error)
    }
}
const getCourseId = (value, callback) => {
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
async function getSectionId(value, callback) {
    let sql_get_id_section = "";
    sql_get_id_section += `SELECT section_id FROM wls_section WHERE section_number = ?`;

    try {
        dbConnect.query(sql_get_id_section, value.section_number, function (err, result) {
            if (err) {
                res.json({
                    status: false,
                    message: "Get course Fail",
                    results: err,
                });
                throw err;
            } else {
                callback(result)
            }
        })
    } catch (error) {
        callback(false)
    }
}
async function getCountSectionDuplicate(value, callback) {
    let sql_get_id_section = "";
    sql_get_id_section += `SELECT COUNT(section_course_id) as count_section FROM wls_section WHERE section_course_id  = ?`;

    try {
        dbConnect.query(sql_get_id_section, value.course_code, function (err, result) {
            if (err) {
                res.json({
                    status: false,
                    message: "Get course Fail",
                    results: err,
                });
                throw (err)
            } else {
                callback(result)
            }
        })
    } catch (error) {
        callback(false)
    }

}
const InsertCourse = (ele, callback) => {
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
            ele.section_unit, //course_unitt
            ele.section_lac_unit, //course_lactrue_unit
            ele.section_lab_unit, //course_lab_unit
            ele.section_self_unit, //course_learning_unit
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
const InsertSection = (ele, callback) => {
    let sql_insert_section = "";
    sql_insert_section += `INSERT INTO wls_section(section_course_id, 
        section_number, 
        section_student, 
        section_term, 
        section_year,
        section_status, 
        section_create_by, 
        section_create_date, 
        section_update_by, 
        section_update_date)`
    sql_insert_section += `VALUES(?,?,?,?,?,?,?,?,?,?)`

    try {
        dbConnect.query(sql_insert_section, [
            ele.course_id,
            ele.section_number,
            ele.section_student,
            1, //section_term
            1, //section_year
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
async function InsertSectionDetail(ele, callback) {
    let sql_insert_section_detail = "";
    sql_insert_section_detail += `INSERT INTO wls_section_detail(section_id, 
        section_detail_description, 
        section_detail_day, 
        section_detail_start_time, 
        section_detail_end_time,
        section_detail_room,
        section_detail_create_by, 
        section_detail_create_date, 
        section_detail_update_by, 
        section_detail_update_date)`
    sql_insert_section_detail += `VALUES(?,?,?,?,?,?,?,?,?,?)`

    try {
        dbConnect.query(sql_insert_section_detail, [
            ele.section_id,
            ele.course_detail,
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
async function InsertSectionPserson(ele, callback) {
    let sql_insert_section_person = "";
    sql_insert_section_person += `INSERT INTO wls_section_person(section_id, 
        person_id, 
        person_postion_id,
        section_person_create_by,
        section_person_create_date, 
        section_person_update_id, 
        section_person_update_date)`
    sql_insert_section_person += `VALUES(?,?,?,?,?,?,?)`

    dbConnect.query(sql_insert_section_person, [
        ele.section_id,
        1, //person id
        1, //person_postion_id
        1, //section_person_time
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
exports.get_course_detail = (req, res) => {

}