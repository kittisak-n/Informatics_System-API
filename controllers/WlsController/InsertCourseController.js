const dbConnect = require("../../connectDB");


exports.InsertCourseCSV = (req, res) => {

    //Check Course ซ้ำ ก่อน Insert
    let sql_get_course = "";
    sql_get_course += `SELECT COUNT(course_code) AS count_course FROM wls_course WHERE course_code = ?`;

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
    //Value (88810159,59,logicalthinking,3,1,2,3,0,60160154,2-10-21,60160154,2-10-21)

    //Insert Section
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

    //Insert Section Detail
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

    let sql_insert_section_person = "";
    sql_insert_section_person += `INSERT INTO wls_section_person(section_id, 
        person_id, 
        person_postion_id, 
        section_person_time,
        section_person_create_by,
        section_person_create_date, 
        section_person_update_id, 
        section_person_update_date)`
    sql_insert_section_person += `VALUES(?,?,?,?,?,?,?,?)`

    var all_course = req.body.course

    all_course.forEach(ele => {

        dbConnect.query(sql_get_course, ele.รหัสวิชา, function (err, result) {
            if (err) {
                res.json({
                    status: false,
                    message: "Get course Fail",
                    results: err,
                });
            } else {
                console.log(result[0].count_course)
                if (result[0].count_course == 0) {
                    dbConnect.query(sql_insert_course, [
                        ele.รหัสวิชา, //course_code 
                        ele.ปีหลักสูตร, //course_year
                        ele.ชื่อวิชา, //course_name
                        ele.หน่วยกิต, //course_unitt
                        ele.หน่วยกิตบรรยาย, //course_lactrue_unit
                        ele.หน่วยกิตปฏิบัติ, //course_lab_unit
                        ele.หน่วยกิตเรียนรู้ด้วยตัวเอง, //course_learning_unit
                        ele.ประเภทรายวิชา,//course_syllabus_id
                        1, //course_create_by PS_id
                        new Date(), //course_create_date2
                        1, //course_update_by PS_id
                        new Date() //course_update_date
                    ], (err, results) => {
                        if (err) {
                            res.json({
                                status: false,
                                message: "Insert Course Fail",
                                results: err,
                            });
                        } else {
                            console.log("Section", results.insertId)
                            console.log("Section Number", ele.กลุ่ม)
                            dbConnect.query(sql_insert_section, [
                                results.insertId,
                                ele.กลุ่ม,
                                ele.จำนวนที่ลงทะเบียน,
                                1, //section_term
                                1, //section_year
                                1, //section_status
                                1,
                                new Date(),
                                1,
                                new Date()
                            ], (err, results) => {
                                if (err) {
                                    res.json({
                                        status: false,
                                        message: "Insert Section Fail",
                                        results: err,
                                    });
                                } else {
                                    console.log("Section Id", results.insertId)
                                    dbConnect.query(sql_insert_section_detail, [
                                        results.insertId,
                                        ele.รายละเอียดกลุ่มเรียน,
                                        ele.วัน,
                                        ele.เวลาเริ่มเรียน,
                                        ele.เวลาเลิกเรียน,
                                        ele.ห้อง,
                                        1,
                                        new Date(),
                                        1,
                                        new Date()
                                    ], (err, results) => {
                                        if (err) {
                                            res.json({
                                                status: false,
                                                message: "Insert Section Detail Fail",
                                                results: err,
                                            });
                                        } else {
                                            dbConnect.query(sql_insert_section_person, [
                                                results.insertId,
                                                1, //person id
                                                1, //person_postion_id
                                                1, //section_person_time
                                                1, //section_person_create_by
                                                new Date(), //section_person_create_date
                                                1, //section_person_update_id
                                                new Date(), //section_person_update_date
                                            ], (err, results) => {
                                                if (err) {
                                                    res.json({
                                                        status: false,
                                                        message: "Insert Section Detail Fail",
                                                        results: err,
                                                    });
                                                }
                                                else {
                                                    console.log("Insert Complete")
                                                }
                                            }) //Insert Section person
                                        }
                                    }) //Insert Section Detail
                                }
                            }) //Section Insetrt
                        }
                    }) //Course Insert
                }
            }
        }) //Check course depicate

    });
}