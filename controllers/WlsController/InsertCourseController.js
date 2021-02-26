const dbConnect = require("../../connectDB");
exports.InsertCourseCSV = (req, res) => {

    //Check Course ซ้ำ ก่อน Insert
    let sql_get_course = "";
    sql_get_course += `SELECT COUNT(course_code) AS Count_course FROM wls_course WHERE course_code = ?`;

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


    var all_course = req.body
    var size_of_course_object = Object.keys(all_course.course).length;

    var check_course = 0;
    var last_insert_course_id;
    var last_insert_section_id;

    for (var i = 0; i < size_of_course_object; i++) {
        console.log(all_course.course[i].ประเภทรายวิชา)

        dbConnect.query(sql_insert_course, [
            all_course.course[i].รหัสวิชา, //course_code 
            all_course.course[i].ปีหลักสูตร, //course_year
            all_course.course[i].ชื่อวิชา, //course_name
            all_course.course[i].หน่วยกิต, //course_unitt
            all_course.course[i].หน่วยกิตบรรยาย, //course_lactrue_unit
            all_course.course[i].หน่วยกิตปฏิบัติ, //course_lab_unit
            all_course.course[i].หน่วยกิตเรียนรู้ด้วยตัวเอง, //course_learning_unit
            all_course.course[i].ประเภทรายวิชา,//course_syllabus_id
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
                last_insert_course_id = results.insertId;
                console.log("Section", last_insert_course_id)
                // dbConnect.query(sql_insert_course, [
                //     last_insert_course_id,
                //     all_course.course[i].กลุ่ม,
                //     all_course.course[i].จำนวนที่ลงทะเบียน,
                //     1,
                //     1,
                //     1,
                //     1,
                //     new Date(),
                //     1,
                //     new Date()
                // ], (err, results) => {

                // })
            }
        })
    }
}
    // xlsxFile('C:\\Users\\HIGH\\Desktop\\FormatInput.xlsx').then((rows) => {
    //     console.log(rows)
    //     for (i in rows) {

    //         course = []
    //         section = []
    //         section_detail = []

    //         for (j in rows[i]) {
    //             if (i == 0) {
    //                 header.push(rows[i][j])
    //             } else if (rows[i][j] != null) {
    //                 if (j <= 7) {
    //                     course.push(rows[i][j])
    //                 } else if (j > 7 && j <= 9) {
    //                     section.push(rows[i][j])
    //                 } else if (j > 9 && j <= 14) {
    //                     section_detail.push(rows[i][j])
    //                 } else {
    //                     section_person.push(rows[i][j])
    //                 }
    //             }
    //         }
    //         console.log(section);
    //         if (i > 0) {
    //             dbConnect.query(sql_insert_course, [
    //                 course[0], //course_code 
    //                 course[1], //course_year
    //                 course[2], //course_name
    //                 course[3], //course_unitt
    //                 course[4], //course_lactrue_unit
    //                 course[5], //course_lab_unit
    //                 course[6], //course_learning_unit
    //                 course[7], //course_syllabus_id
    //                 1, //course_create_by PS_id
    //                 new Date(), //course_create_date
    //                 1, //course_update_by PS_id
    //                 new Date() //course_update_date
    //             ], (err, results) => {
    //                 if (err) {
    //                     res.json({
    //                         status: false,
    //                         message: "Insert Course Fail",
    //                         results: err,
    //                     });
    //                 } else {
    //                     last_insert_course_id = results.insertId;
    //                     dbConnect.query(sql_insert_section, [
    //                         last_insert_course_id,
    //                         section[0], //Section_number 
    //                         section[1], //Section_student
    //                         1, //section_term
    //                         2021,//section_year
    //                         1,//section_status
    //                         1, //section_create_by PS_id
    //                         new Date(), //section_create_date
    //                         1, //section_update_by PS_id
    //                         new Date() //section_update_date
    //                     ], (err, results) => {
    //                         if (err) {
    //                             res.json({
    //                                 status: false,
    //                                 message: "Insert Section Fail",
    //                                 results: err,
    //                             });
    //                         } else {

    //                             // last_insert_section_id = results.insertId;
    //                             // console.log(last_insert_section_id)

    //                             // dbConnect.query(sql_insert_section_detail, [
    //                             //     last_insert_section_id,
    //                             //     section_detail[0],
    //                             //     section_detail[1],
    //                             //     section_detail[2],
    //                             //     section_detail[3],
    //                             //     section_detail[4],
    //                             //     1, //section_create_by PS_id
    //                             //     new Date(), //section_create_date
    //                             //     1, //section_update_by PS_id
    //                             //     new Date() //section_update_date
    //                             // ], (err, results) => {
    //                             //     if (err) {
    //                             //         res.json({
    //                             //             status: false,
    //                             //             message: "Insert Course Detail Fail",
    //                             //             results: err,
    //                             //         });
    //                             //     } else {
    //                             //         res.json({
    //                             //             status: true,
    //                             //             message: "Pass course Detail",
    //                             //         });

    //                             //     }
    //                             // })
    //                         }
    //                     })
    //                 }
    //             });
    //         }

    //         // console.log(section)

    //         // if (i > 0) {
    //         //     start_date = moment(section_detail[2])
    //         //     end_date = moment(section_detail[3])
    //         //     console.log(start_date.utc().format("hh:mm"))
    //         //     console.log(course[1])

    //         //     dbConnect.query(sql_get_course, course[0], function (err, result) {
    //         //         if (err) {
    //         //             res.json({
    //         //                 status: false,
    //         //                 message: "Get course Fail",
    //         //                 results: err,
    //         //             });
    //         //         } else {
    //         //             check_course = result[0].Count_course
    //         //             if (check_course == 0) {
    //         //                 //Insert Course
    //         //                 dbConnect.query(sql_insert_course, [
    //         //                     course[0], //course_code 
    //         //                     course[1], //course_year
    //         //                     course[2], //course_name
    //         //                     course[3], //course_unitt
    //         //                     course[4], //course_lactrue_unit
    //         //                     course[5], //course_lab_unit
    //         //                     course[6], //course_learning_unit
    //         //                     course[7], //course_syllabus_id
    //         //                     1, //course_create_by PS_id
    //         //                     new Date(), //course_create_date
    //         //                     1, //course_update_by PS_id
    //         //                     new Date() //course_update_date
    //         //                 ], (err, results) => {
    //         //                     if (err) {
    //         //                         res.json({
    //         //                             status: false,
    //         //                             message: "Insert Course Fail",
    //         //                             results: err,
    //         //                         });
    //         //                     } else {
    //         //                         //     //Insert Section
    //         //                         //     last_insert_course_id = results.insertId;
    //         //                         //     dbConnect.query(sql_insert_section, [
    //         //                         //         last_insert_course_id,
    //         //                         //         section[0], //Section_number 
    //         //                         //         section[1], //Section_student
    //         //                         //         1, //section_term
    //         //                         //         2021,//section_year
    //         //                         //         1,//section_status
    //         //                         //         1, //section_create_by PS_id
    //         //                         //         new Date(), //section_create_date
    //         //                         //         1, //section_update_by PS_id
    //         //                         //         new Date() //section_update_date
    //         //                         //     ], (err, results) => {
    //         //                         //         if (err) {
    //         //                         //             res.json({
    //         //                         //                 status: false,
    //         //                         //                 message: "Insert Course Fail",
    //         //                         //                 results: err,
    //         //                         //             });
    //         //     } else {
    //         //         last_insert_section_id = results.insertId;
    //         //         console.log(last_insert_section_id)

    //         //         dbConnect.query(sql_insert_section_detail, [
    //         //             last_insert_section_id,
    //         //             section_detail[0],
    //         //             section_detail[1],
    //         //             section_detail[2],
    //         //             section_detail[3],
    //         //             section_detail[4],
    //         //             1, //section_create_by PS_id
    //         //             new Date(), //section_create_date
    //         //             1, //section_update_by PS_id
    //         //             new Date() //section_update_date
    //         //         ], (err, results) => {
    //         //             if (err) {
    //         //                 res.json({
    //         //                     status: false,
    //         //                     message: "Insert Course Detail Fail",
    //         //                     results: err,
    //         //                 });
    //         //             } else {
    //         //                 res.json({
    //         //                     status: true,
    //         //                     message: "Pass course Detail",
    //         //                 });

    //         //             }
    //         //         })
    //         //     }
    //         // })
    //         //                     }
    //         //                 });
    //         //             } else {
    //         //                 try {
    //         //                     res.json({
    //         //                         status: true,
    //         //                         message: "Duplicate course",
    //         //                     });
    //         //                 }
    //         //                 catch (err) {
    //         //                     res.json({
    //         //                         status: false,
    //         //                         message: "Fail check Duplicate course",
    //         //                         results: err,
    //         //                     });
    //         //                 }
    //         //             }
    //         //         }
    //         //     });
    //         // }
    //     }
    // })