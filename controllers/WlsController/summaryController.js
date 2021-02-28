const dbConnect = require("../../connectDB");

// ดึงข้อมูล get_summary
exports.get_summary =  (req, res) => {
  let sql_get_summary = "";
  sql_get_summary += "SELECT * \nFROM wls_summary\n";
  sql_get_summary +=
    "LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id\n";
  sql_get_summary +=
    "LEFT JOIN pms_person ON wls_summary.person_id = wls_summary.person_id\n";
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
