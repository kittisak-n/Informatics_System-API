const dbConnect = require("../../connectDB");

// เพิ่ม Add_schedules
exports.Add_schedule = (req, res) => {
  let sql_add_criteria = "";
  sql_add_criteria +=
    "INSERT INTO wls_schedule(schedule_name,schedule_start_date,schedule_per_credit,schedule_general_min,schedule_general_max,schedule_status,schedule_create_by,schedule_create_date,schedule_update_by,schedule_update_date)";
  sql_add_criteria += "VALUES (?,?,?,?,?,1,?,?,?,?)";
  // 'VALUES (?,?,?,1,18,1,"Komsan Tesana",NOW(),"update by","NOW()"'

  try {
    dbConnect.query(
      sql_add_schedule_condition,
      [
        req.body.schedule_detail_id,
        req.body.schedule_condition_min,
        req.body.schedule_condition_max,
        req.body.schedule_condition_weight_per_credit,
      ],
      (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_add_schedule_condition fail",
            results: err,
          });
        } else {
          res.json({
            status: true,
            message: "sql_add_schedule_condition sucesses",
            results: results,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail Add_schedule_condition",
      results: err,
  });
  }
};
// ดึงข้อมูล schedule ทั้งหมด
exports.Get_all_schedule = (req, res) => {
  let sql_get_schedule =
    "SELECT * FROM wls_schedule ORDER BY schedule_status DESC ";

  let array = {
    schedule: [],
  };

  try {
    dbConnect.query(sql_get_schedule, (err, results) => {
      if (err) {
        res.json({
          status: false,
          message: "sql_get_schedule fail",
          results: err,
        });
      } else {
        results.forEach((data) => {
          let schedule = {
            schedule_id: data.schedule_id,
            schedule_name: data.schedule_name,
            schedule_start_date: data.schedule_start_date,
            schedule_per_credit: data.schedule_per_credit,
            schedule_general_min: data.schedule_general_min,
            schedule_general_max: data.schedule_general_max,
            schedule_status: data.schedule_status,
            schedule_create_by: data.schedule_create_by,
            schedule_create_date: data.schedule_create_date,
          };

          array.schedule.push(schedule);
        });

        res.json({
          status: true,
          message: "sql_get_schedule successes",
          results: array,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "sql_get_schedule fail",
      results: err,
    });
  }
};

// ดึงข้อมูลด้วย ID schedule
exports.Get_schedule_by_Id = (req, res) => {
  let array = {
    schedule: {},
  };
  // ดึงข้อมูล กำหนดการ
  let sql_get_schedule = "";
  sql_get_schedule +=
    "SELECT schedule_id,schedule_name,schedule_start_date,schedule_per_credit,schedule_general_min,schedule_general_max,schedule_create_by\n";
  sql_get_schedule += "FROM wls_schedule \n";
  sql_get_schedule += "WHERE schedule_id = ?";

  try {
    dbConnect.query(
      sql_get_schedule,
      [req.body.schedule_id],
      (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_get_schedule fail",
            results: err,
          });
        } else {
          results.forEach((data) => {
            let schedule = {
              schedule_id: data.schedule_id,
              schedule_name: data.schedule_name,
              schedule_start_date: data.schedule_start_date,
              schedule_per_credit: data.schedule_per_credit,
              schedule_general_min: data.schedule_general_min,
              schedule_general_max: data.schedule_general_max,
              schedule_create_by: data.schedule_create_by,
            };
            array.schedule = schedule;

            res.json({
              status: true,
              message: "sql_get_schedule successes",
              results: array,
            });
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail call Get_criteria",
      results: err,
    });
  }
};

// ดึงข้อมูล schedule_detail ด้วย scheduleID
exports.Get_schedule_detail_by_scheduleID = (req, res) => {
  // ดึงข้อมูลส่วน detail
  let sql_get_schedule_detail = "";
  sql_get_schedule_detail += "SELECT *\n";
  sql_get_schedule_detail += "FROM wls_schedule_detail\n";
  sql_get_schedule_detail += "WHERE schedule_id = ?";

  let array = {
    schedule_detail: [],
  };

  try {
    dbConnect.query(
      sql_get_schedule_detail,
      [req.body.schedule_id],
      (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_get_schedule_detail fail",
            results: err,
          });
        } else {
          results.forEach((data) => {
            let schedule_detail = {
              schedule_detail_id: data.schedule_detail_id,
              schedule_detail_type: data.schedule_detail_type,
              schedule_detail_subject: data.schedule_detail_subject,
              schedule_detail_bachelor: data.schedule_detail_bachelor,
              schedule_detail_graduate: data.schedule_detail_graduate,
            };
            array.schedule_detail.push(schedule_detail);
          });
          res.json({
            status: true,
            message: "sql_get_schedule successes",
            results: array,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail call Get_criteria",
      results: err,
    });
  }
};
// ดึงข้อมูล condition ด้วย schedule_detail_id .
exports.Get_condition_by_schedule_detail_id = (req, res) => {
  let array = {
    condition: [],
  };
  // ดึงข้อมูลส่วน condition

  let sql_get_condition = "";
  sql_get_condition +=
    "SELECT schedule_condition_id,schedule_condition_min,schedule_condition_max,schedule_condition_weight_per_credit FROM wls_schedule_condition\n";
  sql_get_condition +=
    "LEFT JOIN wls_schedule_detail ON wls_schedule_condition.schedule_condition_detail_id = wls_schedule_detail.schedule_detail_id\n";
  sql_get_condition +=
    "WHERE wls_schedule_condition.schedule_condition_detail_id = ?\n";
  sql_get_condition += "ORDER by schedule_condition_min ASC";
  //    "WHERE wls_schedule_condition.schedule_condition_detail_id = 1"

  try {
    dbConnect.query(
      sql_get_condition,
      [req.body.schedule_detail_id],
      (err, results) => {
        if (err) {
          results.json({
            status: false,
            message: "sql_get_condition fail",
            results: err,
          });
        } else {
          results.forEach((data) => {
            let condition = {
              schedule_condition_id: data.schedule_condition_id,
              schedule_condition_min: data.schedule_condition_min,
              schedule_condition_max: data.schedule_condition_max,
              schedule_condition_weight_per_credit:
                data.schedule_condition_weight_per_credit,
            };
            array.condition.push(condition);
          });

          res.json({
            status: true,
            message: "sql_get_schedule successes",
            results: array,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail get_condition",
      results: err,
    });
  }
};

// อัพเดทข้อมูล schedule ที่มีสถานะใช้งานอยู่ เพื่อเปลี่ยนสถานะก่อนการเพิ่ม 
exports.Update_status_schedule = (req, res) => {

  // ดึงข้อมูล กำหนดการ
  let sql_update_status_schedule = "";
  sql_update_status_schedule += "UPDATE wls_schedule\n";
  sql_update_status_schedule += "SET schedule_status=0\n";
  sql_update_status_schedule += "WHERE schedule_status=1";

  try {
    dbConnect.query(
      sql_update_status_schedule
     ,
      (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_update_status_schedule fail",
            results: err,
          });
        } else {
          res.json({
            status: true,
            message: "sql_update_status_schedule Goodd",
            results: results,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail call Get_criteria",
      results: err,
    });
  }
};



