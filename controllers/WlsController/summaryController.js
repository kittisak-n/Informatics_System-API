const dbConnect = require("../../connectDB");



exports.Get_person_by_id = (req, res) => {
  let sql_get_person = "";
  sql_get_person += "SELECT person_id,person_firstname_TH,person_lastname_TH \n";
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
  }  catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail get_summary",
      results: err,
    });
  }
},
// ดึงข้อมูล get_summary
exports.get_summary =  (req, res) => {
  let sql_get_summary = "";
  sql_get_summary += "SELECT * \nFROM wls_summary\n";
  sql_get_summary +=
    "LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id\n";
  sql_get_summary +=
    "LEFT JOIN pms_person ON wls_summary.person_id = pms_person.person_id\n";
    sql_get_summary +=
    "LEFT JOIN pms_postion ON pms_person.person_position = pms_postion.position_id\n";
    

  try {
     dbConnect.query(sql_get_summary, (err, results) => {
      if (err) {
        res.json({
          status: false,
          message: "get_summary fail",
          results: err,
        });
      } else {

        res.json({
          status: true,
          message: "get_summary sucesses",
          results: results,
        });
      }
    });

  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail get_summary",
      results: err,
    });
  }
};
