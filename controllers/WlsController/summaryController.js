const dbConnect = require("../../connectDB");

exports.Get_person_by_id = (req, res) => {
  let sql_get_person = "";
  sql_get_person +=
    "SELECT person_id,person_firstname_TH,person_lastname_TH \n";
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
    res.json({
      status: false,
      message: "Fail get_summary",
      results: err,
    });
  }
},
  // ดึงข้อมูล get_summary
  exports.get_summary = (req, res) => {
    let sql_get_summary = "";
    sql_get_summary +=
      "SELECT wls_schedule.schedule_per_credit,wls_schedule.schedule_start_date,wls_schedule.schedule_id,wls_schedule.schedule_name,wls_summary.summary_year,pms_position.position_name,wls_summary.summary_id,wls_summary.summary_total,wls_summary.summary_total_calculate,wls_summary.summary_total_around, wls_summary.summary_total_extra,wls_summary.summary_bonus,wls_summary.summary_salary,wls_summary.summary_lesson,wls_summary.summary_create_date,CONCAT(pms_prefix.pf_name,' ',pms_person.person_firstname_TH,' ',pms_person.person_lastname_TH) AS person_name,pms_person.person_address,ifs_provinces.name_th AS provinces_name,ifs_amphures.name_th AS amphures_name,ifs_districts.name_th AS districts_name,ifs_districts.zip_code\nFROM wls_summary\n";
    sql_get_summary +=
      "LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id\n";
    sql_get_summary +=
      "RIGHT JOIN pms_person ON wls_summary.person_id = pms_person.person_id\n";
    sql_get_summary +=
      "LEFT JOIN pms_position ON pms_person.person_position = pms_position.position_id\n";
    sql_get_summary +=
      "LEFT JOIN pms_prefix ON pms_person.prefix_id = pms_prefix.pf_id\n";
    sql_get_summary +=
      "LEFT JOIN ifs_provinces ON pms_person.person_province = ifs_provinces.id\n";
    sql_get_summary +=
      "LEFT JOIN ifs_amphures ON pms_person.person_amphur = ifs_amphures.id\n";
    sql_get_summary +=
      "LEFT JOIN ifs_districts ON pms_person.person_district = ifs_districts.id \n";
      sql_get_summary += "WHERE pms_person.person_position = 11 \n"
    sql_get_summary += "GROUP BY pms_person.person_id\n";
    sql_get_summary += "ORDER BY wls_summary.summary_create_date DESC";

    // SELECT wls_summary.summary_id,wls_schedule.schedule_id,wls_summary.summary_total,wls_summary.summary_total_calculate,wls_summary.summary_total_around, wls_summary.summary_total_extra,wls_summary.summary_bonus,wls_summary.summary_salary,wls_summary.summary_lesson,wls_summary.summary_create_date,CONCAT(pms_prefix.pf_name,' ',pms_person.person_firstname_TH,' ',pms_person.person_lastname_TH) AS person_name,pms_person.person_address,ifs_provinces.name_th AS provinces_name,ifs_amphures.name_th AS amphures_name,ifs_districts.name_th AS districts_name,ifs_districts.zip_code
    // FROM wls_summary
    // LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id
    // LEFT JOIN pms_person ON wls_summary.person_id = pms_person.person_id
    // LEFT JOIN pms_position ON pms_person.person_position = pms_position.position_id
    // LEFT JOIN pms_prefix ON pms_person.prefix = pms_prefix.pf_id
    // LEFT JOIN ifs_provinces ON pms_person.person_province = ifs_provinces.id
    // LEFT JOIN ifs_amphures ON pms_person.person_amphur = ifs_amphures.id
    // LEFT JOIN ifs_districts ON pms_person.person_district = ifs_districts.id
    // GROUP BY person_id
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
  },
  // ดึงข้อมูล get_summary_by_year
  exports.get_summary_by_year = (req, res) => {
    let sql_get_summary_by_year = "";
    sql_get_summary_by_year +=
      "SELECT wls_schedule.schedule_per_credit,wls_schedule.schedule_start_date,wls_schedule.schedule_id,wls_schedule.schedule_name,wls_summary.summary_year,pms_position.position_name,wls_summary.summary_id,wls_summary.summary_total,wls_summary.summary_total_calculate,wls_summary.summary_total_around, wls_summary.summary_total_extra,wls_summary.summary_bonus,wls_summary.summary_salary,wls_summary.summary_lesson,wls_summary.summary_create_date,CONCAT(pms_prefix.pf_name,' ',pms_person.person_firstname_TH,' ',pms_person.person_lastname_TH) AS person_name,pms_person.person_address,ifs_provinces.name_th AS provinces_name,ifs_amphures.name_th AS amphures_name,ifs_districts.name_th AS districts_name,ifs_districts.zip_code\nFROM wls_summary\n";
    sql_get_summary_by_year +=
      "LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id\n";
    sql_get_summary_by_year +=
      "RIGHT JOIN pms_person ON wls_summary.person_id = pms_person.person_id\n";
    sql_get_summary_by_year +=
      "LEFT JOIN pms_position ON pms_person.person_position = pms_position.position_id\n";
    sql_get_summary_by_year +=
      "LEFT JOIN pms_prefix ON pms_person.prefix_id = pms_prefix.pf_id\n";
    sql_get_summary_by_year +=
      "LEFT JOIN ifs_provinces ON pms_person.person_province = ifs_provinces.id\n";
    sql_get_summary_by_year +=
      "LEFT JOIN ifs_amphures ON pms_person.person_amphur = ifs_amphures.id\n";
    sql_get_summary_by_year +=
      "LEFT JOIN ifs_districts ON pms_person.person_district = ifs_districts.id\n";
    sql_get_summary_by_year += "WHERE wls_summary.summary_year = ? \n";

    sql_get_summary_by_year += "GROUP BY wls_summary.person_id\n";
    sql_get_summary_by_year += "ORDER BY wls_summary.summary_create_date DESC";

    // SELECT wls_summary.summary_id,wls_schedule.schedule_id,wls_summary.summary_total,wls_summary.summary_total_calculate,wls_summary.summary_total_around, wls_summary.summary_total_extra,wls_summary.summary_bonus,wls_summary.summary_salary,wls_summary.summary_lesson,wls_summary.summary_create_date,CONCAT(pms_prefix.pf_name,' ',pms_person.person_firstname_TH,' ',pms_person.person_lastname_TH) AS person_name,pms_person.person_address,ifs_provinces.name_th AS provinces_name,ifs_amphures.name_th AS amphures_name,ifs_districts.name_th AS districts_name,ifs_districts.zip_code
    // FROM wls_summary
    // LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id
    // LEFT JOIN pms_person ON wls_summary.person_id = pms_person.person_id
    // LEFT JOIN pms_position ON pms_person.person_position = pms_position.position_id
    // LEFT JOIN pms_prefix ON pms_person.prefix = pms_prefix.pf_id
    // LEFT JOIN ifs_provinces ON pms_person.person_province = ifs_provinces.id
    // LEFT JOIN ifs_amphures ON pms_person.person_amphur = ifs_amphures.id
    // LEFT JOIN ifs_districts ON pms_person.person_district = ifs_districts.id
    // GROUP BY person_id
    try {
      dbConnect.query(
        sql_get_summary_by_year,
        [req.body.summary_year],
        (err, results) => {
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
        }
      );
    } catch (err) {
      console.log(err);
      res.json({
        status: false,
        message: "Fail get_summary",
        results: err,
      });
    }
  },
  // get_summary_detail_by_summary_id
  exports.get_summary_detail_by_summary_id = (req, res) => {
    let sql_get_summary_detail_by_summary_id = "";
    sql_get_summary_detail_by_summary_id +=
      "SELECT wls_summary_detail.summary_detail_id,wls_summary_detail.summary_detail_seq, summary_detail_date,wls_summary_detail.summary_detail_create_date\n";
    sql_get_summary_detail_by_summary_id += "FROM wls_summary_detail \n";
    sql_get_summary_detail_by_summary_id +=
      "LEFT JOIN wls_summary ON wls_summary_detail.summary_id = wls_summary.summary_id \n";
    sql_get_summary_detail_by_summary_id +=
      "WHERE wls_summary_detail.summary_id = ?\n";
    sql_get_summary_detail_by_summary_id +=
      "ORDER BY wls_summary_detail.summary_detail_date";
    //   SELECT *
    // FROM wls_summary_detail
    // LEFT JOIN wls_summary ON wls_summary_detail.summary_id = wls_summary.summary_id
    // WHERE wls_summary_detail.summary_id = 1

    try {
      dbConnect.query(
        sql_get_summary_detail_by_summary_id,
        [req.body.summary_id],
        (err, results) => {
          if (err) {
            res.json({
              status: false,
              message: "sql_get_summary_detail_by_summary_id fail",
              results: err,
            });
          } else {
            res.json({
              status: true,
              message: "sql_get_summary_detail_by_summary_id sucesses",
              results: results,
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.json({
        status: false,
        message: "Fail sql_get_summary_detail_by_summary_id",
        results: err,
      });
    }
  },

  exports.get_summary_by_person_id = (req, res) => {
    let sql_get_summary_by_person_id = "";
    sql_get_summary_by_person_id +=
      "SELECT wls_schedule.schedule_per_credit,wls_schedule.schedule_start_date,wls_schedule.schedule_id,wls_schedule.schedule_name,wls_summary.summary_year,pms_position.position_name,wls_summary.summary_id,wls_summary.summary_total,wls_summary.summary_total_calculate,wls_summary.summary_total_around, wls_summary.summary_total_extra,wls_summary.summary_bonus,wls_summary.summary_salary,wls_summary.summary_lesson,wls_summary.summary_create_date,CONCAT(pms_prefix.pf_name,' ',pms_person.person_firstname_TH,' ',pms_person.person_lastname_TH) AS person_name,pms_person.person_address,ifs_provinces.name_th AS provinces_name,ifs_amphures.name_th AS amphures_name,ifs_districts.name_th AS districts_name,ifs_districts.zip_code\nFROM wls_summary\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN pms_person ON wls_summary.person_id = pms_person.person_id\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN pms_position ON pms_person.person_position = pms_position.position_id\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN pms_prefix ON pms_person.prefix_id = pms_prefix.pf_id\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN ifs_provinces ON pms_person.person_province = ifs_provinces.id\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN ifs_amphures ON pms_person.person_amphur = ifs_amphures.id\n";
    sql_get_summary_by_person_id +=
      "LEFT JOIN ifs_districts ON pms_person.person_district = ifs_districts.id\n";
    sql_get_summary_by_person_id += "WHERE wal_summary.person_id = ?\n";
    sql_get_summary_by_person_id += "GROUP BY wls_summary.person_id";

    // SELECT wls_summary.summary_id,wls_schedule.schedule_id,wls_summary.summary_total,wls_summary.summary_total_calculate,wls_summary.summary_total_around, wls_summary.summary_total_extra,wls_summary.summary_bonus,wls_summary.summary_salary,wls_summary.summary_lesson,wls_summary.summary_create_date,CONCAT(pms_prefix.pf_name,' ',pms_person.person_firstname_TH,' ',pms_person.person_lastname_TH) AS person_name,pms_person.person_address,ifs_provinces.name_th AS provinces_name,ifs_amphures.name_th AS amphures_name,ifs_districts.name_th AS districts_name,ifs_districts.zip_code
    // FROM wls_summary
    // LEFT JOIN wls_schedule ON wls_summary.schedule_id = wls_schedule.schedule_id
    // LEFT JOIN pms_person ON wls_summary.person_id = pms_person.person_id
    // LEFT JOIN pms_position ON pms_person.person_position = pms_position.position_id
    // LEFT JOIN pms_prefix ON pms_person.prefix = pms_prefix.pf_id
    // LEFT JOIN ifs_provinces ON pms_person.person_province = ifs_provinces.id
    // LEFT JOIN ifs_amphures ON pms_person.person_amphur = ifs_amphures.id
    // LEFT JOIN ifs_districts ON pms_person.person_district = ifs_districts.id
    // GROUP BY person_id
    try {
      dbConnect.query(
        sql_get_summary_by_person_id,
        [req.body.person_id],
        (err, results) => {
          if (err) {
            res.json({
              status: false,
              message: "get_summary_person_id fail",
              results: err,
            });
          } else {
            res.json({
              status: true,
              message: "get_summary_person_id sucesses",
              results: results,
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.json({
        status: false,
        message: "Fail sql_get_summary_person_id",
        results: err,
      });
    }
  }
