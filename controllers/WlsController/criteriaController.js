const dbConnect = require("../../connectDB");

// เพิ่มกำหนดการณ์
(exports.Add_criteria = (req, res) => {
  let sql_add_criteria = "";
  sql_add_criteria +=
    "INSERT INTO wls_schedule(schedule_name,schedule_start_date,schedule_general_min,schedule_general_max,schedule_status,schedule_create_by,schedule_create_date,schedule_update_by,schedule_update_date)";
  sql_add_criteria += "VALUES (?,?,?,?,?,?,?,?,?,?";
  // 'VALUES (?,?,?,1,18,1,"Komsan Tesana",NOW(),"update by","NOW()"'

  let sql_add_criteria_detail =
    "INSERT INTO wls_schedule_detail(schedule_id,schedule_detail_type,schedule_detail_subject,schedule_detail_min,schedule_detail_max,schedule_detail_create_by,schedule_detail_create_date,schedule_detail_update_by,schedule_detail_update_date) ";
  sql_add_criteria_detail += "VALUES (?,?,?,?,?,?,?,?,?)";

  //  VALUES (1,0,1,20,50,"komsan",NOW(),"komsan",NOW())

  let sql_add_criteria_condition =
    "INSERT INTO wls_schedule_condition(schedule_condition_detail_id,schedule_condition_min,schedule_condition_max,schedule_condition_weight_per_credit)";
  sql_add_criteria_condition += "VALUES (?,?,?,?)";

  // VALUES (1,1,10,0.0015),(1,11,30,0.0015)

  try {
    console.log(
      "criteria_name:" + req.body.criteria_name + "\n",
      "criteria_start_date:" + req.body.criteria_start_date + "\n",
      "criteria_creat_by:" + req.body.criteria_creat_by + "\n",
      "criteria_rate_per_credit:" + req.body.criteria_rate_per_credit + "\n",
      "nmp_minimum: " + req.body.nmp_minimum + "\n",
      "nmp_maximum: " + req.body.nmp_maximum + "\n"
    );
    // วิชาใน

    console.log(
      "========================== วิชาใน ========================== \n"
    );
    console.log(req.body.criteria_Internal);
    console.log(" Lab \n");
    req.body.criteria_Internal.lab.condition.forEach((data) => {
      console.log(data);
    });
    console.log(" lecture \n");
    req.body.criteria_Internal.lecture.condition.forEach((data) => {
      console.log(data);
    });

    // วิชานอก

    console.log(
      "========================== วิชานอก ========================== \n"
    );
    console.log(req.body.criteria_external);
    console.log("Lab \n");
    req.body.criteria_external.lab.condition.forEach((data) => {
      console.log(data);
    });
    console.log("lecture \n");
    req.body.criteria_external.lecture.condition.forEach((data) => {
      console.log(data);
    });

    res.json({
      status: true,
      message: "Add_criteria suscesses !!",
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "Fail Add_criteria",
      results: err,
    });
  }
}),
  // ดึงข้อมูล schedule ทั้งหมด
  (exports.Get_criteria_show_detail = (req, res) => {
    let sql_get_schedule = "SELECT * FROM wls_schedule ";

    let data_schedule;

    try {
      dbConnect.query(sql_get_schedule, (err, results) => {
        if (err) {
          res.json({
            status: false,
            message: "sql_get_schedule fail",
            results: err,
          });
        } else {
          console.log(results);
        }
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: false,
        message: "Fail call Get_criteria",
        results: err,
      });
    }
  });

// ดึงข้อมูลด้วย ID schedule
exports.Get_criteria_detail_by_scheduleID = (req, res) => {
  let array = {
    schedule: {},
    criteria_Internal: {},
    criteria_external: {},
  };
  // ดึงข้อมูล กำหนดการ
  let sql_get_schedule = "";
  sql_get_schedule +=
    "SELECT schedule_id,schedule_name,schedule_start_date,schedule_per_credit,schedule_general_min,schedule_general_max,schedule_create_by\n";
  sql_get_schedule += "FROM wls_schedule \n";
  sql_get_schedule += "WHERE schedule_id = ?";

  // ดึงข้อมูลส่วน detail
  let sql_get_schedule_detail = "";
  sql_get_schedule_detail += "SELECT *\n";
  sql_get_schedule_detail += "FROM wls_schedule_detail\n";
  sql_get_schedule_detail += "WHERE schedule_id = ?";

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

  // ส่วนของข้อมูลที่จะถูกส่งไปยัง FONT END
  let schedule_id = null;
  let schedule_name = null;
  let schedule_start_date = null;
  let schedule_create_by = null;
  let schedule_per_credit = null;

  //  กำหนดภาระงานเพื่อการจ่ายค่าตอบแทนสอนเกินของคณาจารย์ประจำที่ไม่ได้ดำรงตำแหน่งบริหาร
  let schedule_general_min = null;
  let schedule_general_max = null;
  // วิชาในหลักสูตร
  let criteria_Internal = {
    lab: {
      Bachelor: null,
      Graduate: null,

      condition: [],
    },
    lecture: {
      Bachelor: null,
      Graduate: null,

      condition: [],
    },
  };

  // วิชานอกหลักสูตร
  let criteria_external = {
    lab: {
      Bachelor: null,
      Graduate: null,

      condition: [],
    },
    lecture: {
      Bachelor: null,
      Graduate: null,

      condition: [],
    },
  };

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

            dbConnect.query(
              sql_get_schedule_detail,
              [data.schedule_id],
              (err, results) => {
                if (err) {
                  res.json({
                    status: false,
                    message: "sql_get_schedule_detailfail",
                    results: err,
                  });
                } else {
                  results.forEach((data) => {
                    if (data.schedule_detail_type == 0) {
                      // 0 วิชาใน
                      if (data.schedule_detail_subject == 0) {
                        // 0 lucther
                        criteria_Internal.lecture.Bachelor =
                          data.schedule_detail_bachelor;
                        criteria_Internal.lecture.Graduate =
                          data.schedule_detail_graduate;
                        dbConnect.query(
                          sql_get_condition,
                          [data.schedule_detail_id],
                          (err, results) => {
                            if (err) {
                              results.json({
                                status: false,
                                message: "sql_get_condition fail",
                                results: err,
                              });
                            } else {
                              let index = 0;
                              results.forEach((data) => {
                                let array_data = {
                                  key: index + 1,
                                  Minimum_number_students:
                                    data.schedule_condition_min,
                                  Maximum_number_students:
                                    data.schedule_condition_max,
                                  Weight_per_credit:
                                    data.schedule_condition_weight_per_credit,
                                };
                                criteria_Internal.lecture.condition.push(
                                  array_data
                                );

                                index++;
                              });
                            }
                          }
                        );
                      } else if (data.schedule_detail_subject == 1) {
                        // 1 lab

                        criteria_Internal.lab.Bachelor =
                          data.schedule_detail_bachelor;
                        criteria_Internal.lab.Graduate =
                          data.schedule_detail_graduate;

                        dbConnect.query(
                          sql_get_condition,
                          [data.schedule_detail_id],
                          (err, results) => {
                            if (err) {
                              results.json({
                                status: false,
                                message: "sql_get_condition fail",
                                results: err,
                              });
                            } else {
                              results.forEach(function (data, index) {
                                if (index != results.length - 1) {
                                  let array_data = {
                                    key: index + 1,
                                    Minimum_number_students:
                                      data.schedule_condition_min,
                                    Maximum_number_students:
                                      data.schedule_condition_max,
                                    Weight_per_credit:
                                      data.schedule_condition_weight_per_credit,
                                  };
                                  criteria_Internal.lab.condition.push(
                                    array_data
                                  );
                                } else {
                                  let array_data = {
                                    key: index + 1,
                                    Minimum_number_students:
                                      data.schedule_condition_min,
                                    Maximum_number_students:
                                      data.schedule_condition_max,
                                    Weight_per_credit:
                                      data.schedule_condition_weight_per_credit,
                                  };
                                  criteria_Internal.lab.condition.push(
                                    array_data
                                  );
                                  array.criteria_Internal = criteria_Internal;
                                  array.criteria_external = criteria_external;
                                  res.json({
                                    status: true,
                                    message: "success",
                                    results: array,
                                  });
                                }
                              });
                            }
                          }
                        );
                      }
                    } else if (data.schedule_detail_type == 1) {
                      //  1 วิชานอก

                      if (data.schedule_detail_subject == 0) {
                        // 0 lucther

                        criteria_external.lecture.Bachelor =
                          data.schedule_detail_bachelor;
                        criteria_external.lecture.Graduate =
                          data.schedule_detail_graduate;

                        dbConnect.query(
                          sql_get_condition,
                          [data.schedule_detail_id],
                          (err, results) => {
                            if (err) {
                              results.json({
                                status: false,
                                message: "sql_get_condition fail",
                                results: err,
                              });
                            } else {
                              let index = 0;
                              results.forEach((data) => {
                                let array_data = {
                                  key: index + 1,
                                  Minimum_number_students:
                                    data.schedule_condition_min,
                                  Maximum_number_students:
                                    data.schedule_condition_max,
                                  Weight_per_credit:
                                    data.schedule_condition_weight_per_credit,
                                };

                                index++;

                                criteria_external.lecture.condition.push(
                                  array_data
                                );

                                // comment แล้วเห็นค่าทั้งหมด
                                console.log(
                                  "========================================== วิชานอก =========================================="
                                );
                                console.log(criteria_external);
                                console.log(
                                  "========================================== วิชาใน =========================================="
                                );
                                console.log(criteria_Internal);
                              });
                            }
                          }
                        );
                      } else if (data.schedule_detail_subject == 1) {
                        // 1 lab

                        criteria_external.lab.Bachelor =
                          data.schedule_detail_bachelor;
                        criteria_external.lab.Graduate =
                          data.schedule_detail_graduate;

                        dbConnect.query(
                          sql_get_condition,
                          [data.schedule_detail_id],
                          (err, results) => {
                            if (err) {
                              results.json({
                                status: false,
                                message: "sql_get_condition fail",
                                results: err,
                              });
                            } else {
                              let index = 0;
                              results.forEach((data) => {
                                let array_data = {
                                  key: index + 1,
                                  Minimum_number_students:
                                    data.schedule_condition_min,
                                  Maximum_number_students:
                                    data.schedule_condition_max,
                                  Weight_per_credit:
                                    data.schedule_condition_weight_per_credit,
                                };
                                criteria_external.lab.condition.push(
                                  array_data
                                );

                                index++;
                              });
                            }
                          }
                        );
                      }
                    }
                  });
                }
              }
            );
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
