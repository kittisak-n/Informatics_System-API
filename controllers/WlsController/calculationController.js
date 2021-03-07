const dbConnect = require("../../connectDB");
exports.Get_person_by_Id = (req, res) => {
  let sql_get_person = "";
  sql_get_person +=
    "SELECT person_firstname_TH, person_lastname_TH, person_id\n";
  sql_get_person += "FROM pms_person \n";
  sql_get_person += "WHERE person_id = ?";

  try {
    dbConnect.query(sql_get_person, [req.body.person_id], (err, results) => {
      if (err) {
        res.json({
          status: false,
          message: "sql_get_person fail",
          results: err,
        });
      } else {
        res.json({
          status: true,
          message: "sql_get_person sucesses",
          results: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.Get_course_by_Id = (req, res) => {
  let sql_get_course = "";
  sql_get_course +=
    "SELECT wls_course.course_id, wls_course.course_code, wls_course.course_name, wls_course.course_unitt, COUNT(wls_course.course_code) AS count_group, wls_course.course_lactrue_unit, wls_course.course_lab_unit, wls_section.section_student\n";
  sql_get_course += "FROM wls_course \n";
  sql_get_course +=
    "LEFT JOIN wls_section ON wls_course.course_id = wls_section.section_course_id\n";
  sql_get_course +=
    "LEFT JOIN wls_section_detail ON wls_section.section_id = wls_section_detail.section_id \n";
  sql_get_course +=
    "LEFT JOIN wls_section_person ON wls_section.section_id = wls_section_person.section_id \n";
  sql_get_course += "WHERE wls_section_person.person_id = ?\n";
  sql_get_course += "GROUP BY wls_course.course_code";

  try {
    dbConnect.query(sql_get_course, [req.body.person_id], (err, results) => {
      if (err) {
        res.json({
          status: false,
          message: "sql_get_course fail",
          results: err,
        });
      } else {
        res.json({
          status: true,
          message: "sql_get_course sucesses",
          results: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.Get_subcourse_by_course_id = (req, res) => {
  let sql_get_subcourse = "";
  sql_get_subcourse +=
    "SELECT section_course_id,CONCAT(section_detail_day,' ',section_detail_start_time,'-',section_detail_end_time,' ',section_detail_room) AS time, section_number, section_student, section_person_time \n";
  sql_get_subcourse += "FROM wls_section\n";
  sql_get_subcourse += "LEFT JOIN wls_section_detail\n";
  sql_get_subcourse +=
    "ON wls_section.section_id = wls_section_detail.section_id\n";
  sql_get_subcourse += "LEFT JOIN wls_section_person\n";
  sql_get_subcourse +=
    "ON wls_section.section_id = wls_section_person.section_id\n";
  sql_get_subcourse += "WHERE wls_section.section_course_id = ?\n";
  sql_get_subcourse += "AND wls_section_person.person_id = ?\n";
  try {
    dbConnect.query(
      sql_get_subcourse,
      [req.body.section_course_id, req.body.person_id],
      (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_get_subcourse fail",
            results: err,
          });
        } else {
          res.json({
            status: true,
            message: "sql_get_subcourse sucesses",
            results: results,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.Get_countgroup_by_Id = (req, res) => {
  let sql_get_countgroup = "";
  sql_get_countgroup += "SELECT  COUNT() \n";
  sql_get_countgroup += "FROM wls_section_person \n";
  sql_get_countgroup += "WHERE stp.person_id = ?";

  try {
    dbConnect.query(
      sql_get_countgroup,
      [req.body.person_id],
      (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_get_countgroup fail",
            results: err,
          });
        } else {
          res.json({
            status: true,
            message: "sql_get_countgroup sucesses",
            results: results,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.Get_group_by_Id = (req, res) => {
  let sql_get_group = "";
  sql_get_group += "SELECT section_number \n";
  sql_get_group += "FROM wls_section st\n";
  sql_get_group +=
    "LEFT JOIN wls_course c ON st.section_course_id = c.course_id \n";
  sql_get_group += "WHERE c.course_id = ?";

  try {
    dbConnect.query(sql_get_group, [req.body.course_id], (err, results) => {
      if (err) {
        res.json({
          status: false,
          message: "sql_get_group fail",
          results: err,
        });
      } else {
        res.json({
          status: true,
          message: "sql_get_group sucesses",
          results: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.Get_dataCal_by_Id = (req, res) => {
  let sql_get_dataCal = "";
  sql_get_dataCal +=
    "SELECT wc.course_code, wc.course_name, wc.course_syllabus_id,wc.course_lactrue_unit, wc.course_lab_unit, ws.section_student, wsp.section_person_lec, wsp.section_person_lab, wsp.section_person_time, pp.person_firstname_TH, pp.person_lastname_TH \n";
  sql_get_dataCal += "FROM wls_course wc \n";
  sql_get_dataCal +=
    "LEFT JOIN wls_section ws ON wc.course_id = ws.section_course_id \n";
  sql_get_dataCal +=
    "LEFT JOIN wls_section_person wsp ON ws.section_id = wsp.section_id \n";
  sql_get_dataCal +=
    "LEFT JOIN wls_summary wsm ON wsp.person_id = wsm.person_id \n";
  sql_get_dataCal +=
    "LEFT JOIN pms_person pp ON wsp.person_id = pp.person_id \n";
  sql_get_dataCal += "WHERE wsm.person_id = ?";
  try {
    dbConnect.query(sql_get_dataCal, [req.body.person_id], (err, results) => {
      if (err) {
        res.json({
          status: false,
          message: "sql_get_dataCal fail",
          results: err,
        });
      } else {
        res.json({
          status: true,
          message: "sql_get_dataCal sucesses",
          results: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// exports.Insert_section_person_by_Id = (req, res) => {
//   let Insert_section_person_by_Id = "";
//   Insert_section_person_by_Id +=
//     "INSERT INTO wls_section_person(section_person_time,section_person_lec,section_person_lab)";
//   Insert_section_person_by_Id += "VALUES (?,?,?)";

//   try {
//     dbConnect.query(
//       Insert_section_person_by_Id,
//       [
//         // req.body.person_id,
//         req.body.section_person_time,
//         req.body.section_person_lec,
//         req.body.section_person_lab,
//       ],
//       (err, results) => {
//         if (err) {
//           res.json({
//             status: false,
//             message: "insert fail",
//             results: err,
//           });
//         } else {
//           res.json({
//             status: true,
//             message: "insert sucesses",
//             results: results,
//           });
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
