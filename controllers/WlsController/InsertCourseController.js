const dbConnect = require("../../connectDB");
exports.InsertCourseCSV = (req, res) => {

    //Insert Course
    let sql_insert_course = "";
    sql_insert_course += `INSERT INTO wls_course(course_code,course_year,course_name,course_unitt,course_lactrue_unit,
            course_lab_unit,course_learning_unit,course_syllabus_id,course_create_by,
            course_create_date,course_update_by,course_update_date)`;
    sql_insert_course += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    //Check Course ซ้ำ ก่อน Insert
    let sql_get_course = "";
    sql_get_course += `SELECT COUNT(course_code) AS Count_course FROM wls_course WHERE course_code = ?`;

    var check_course = 0;
    var last_insert_course_id;
    var last_insert_section_id;
    const xlsxFile = require('read-excel-file/node');
    var header = [];
    var course = [];
    var section = [];
    var section_detail = [];
    var section_person = [];

    xlsxFile('C:\\Users\\HIGH\\Desktop\\FormatInput.xlsx').then((rows) => {
        for (i in rows) {
            for (j in rows[i]) {
                if (i == 0) {
                    header.push(rows[i][j])
                } else if (rows[i][j] != null) {
                    if (j <= 7) {
                        course.push(rows[i][j])
                    } else if (j > 7 && j <= 9) {
                        section.push(rows[i][j])
                    } else if (j > 9 && j <= 14) {
                        section_detail.push(rows[i][j])
                    } else {
                        section_person.push(rows[i][j])
                    }
                }
            }
            if (i > 0) {
                dbConnect.query(sql_insert_course, [
                    course[0], //course_code 
                    course[1], //course_year
                    course[2], //course_name
                    course[3], //course_unitt
                    course[4], //course_lactrue_unit
                    course[5], //course_lab_unit
                    course[6], //course_learning_unit
                    course[7], //course_syllabus_id
                    1, //course_create_by PS_id
                    new Date(), //course_create_date
                    1, //course_update_by PS_id
                    new Date() //course_update_date
                ], (err, results) => {
                    if (err) {
                        res.json({
                            status: false,
                            message: "Insert Fail",
                            results: err,
                        });
                    } else {
                        res.json({
                            status: true,
                            message: "Insert Success",
                            results: results
                        });
                        last_insert_course_id = results.insertId;
                    }
                });
            }
        }
    })
}