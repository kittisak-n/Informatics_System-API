const dbConnect = require("../../connectDB");

exports.Get_detail_summary = (req, res) => {
  console.log(req);
  let sql_get_person = "";
  sql_get_person +=
    "SELECT pms_person.person_id,pms_person.person_firstname_TH,pms_person.person_lastname_TH,pms_postion.postition_name,wls_summary.summary_total,wls_summary.summary_total_around,wls_summary.summary_total_extra,wls_summary.summary_bonus \n ";
  sql_get_person += "FROM pms_person \n";
  sql_get_person +=
    "LEFT JOIN pms_postion ON pms_person.person_position = pms_postion.postion_id \n";
  sql_get_person +=
    "LEFT JOIN wls_summary ON pms_person.person_id = wls_summary.person_id \n";
  sql_get_person += "WHERE pms_person.person_id != 1";
  try {
    dbConnect.query(sql_get_person, [], (err, results) => {
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
  } catch (err) {
    console.log(err);
  }
};
