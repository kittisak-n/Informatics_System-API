const dbConnect = require("../../connectDB");
const AD = require("activedirectory2").promiseWrapper;

exports.getAllType = (req, res) => {
  let sql_getAllType = "SELECT * FROM mds_type";
  try {
    dbConnect.query(sql_getAllType, [], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log("++++++++++", results);
        res.json({
          status: true,
          massage: "getAllType success",
          results: results,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getByIdTpye = (req, res) => {};

exports.insertType = (req, res) => {
  let sql = "";
  sql += "INSERT INTO mds_type(type_code,type_name,type_number) \n";
  sql += "VALUES(?, ?, 1)";
  dbConnect.query(
    sql,
    [req.body.type_code, req.body.type_name],
    (err, results) => {
      if (err) {
      } else {
        res.json({
          results: results,
        });
      }
    }
  );
};

exports.updateType = (req, res) => {
  let sql_updateType = "UPDATE mds_type SET type_name=? WHERE type_id = ?";

  try {
    dbConnect.query(
      sql_updateType,
      [req.body.type_name, req.body.type_id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: true,
            massage: "updateType success",
            results: results,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTpye = (req, res) => {};
