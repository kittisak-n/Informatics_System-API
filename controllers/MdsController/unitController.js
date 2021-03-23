const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllUnit = (req, res) => {
    let sql_getAllUnit = "SELECT * FROM mds_unit"
    try {
        dbConnect.query(sql_getAllUnit, [], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                
             
                res.json({
                    status: true,
                    massage: 'get all unit success',
                    results: results,
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getByIdUnit = (req, res) => {

}

exports.insertUnit = (req, res) => {
    let sql = '';
    sql += 'INSERT INTO mds_unit(unit_name) \n';
    sql += 'VALUES(?)';
    dbConnect.query(sql, [req.body.unit_name], (err, results) => {
        if (err) {

        } else {
            res.json({
                results: results
            })
        }
    })
}

exports.updateUnit = (req, res) => {
    let sql_updateUnit = "UPDATE mds_unit SET unit_name=? WHERE unit_id = ?";

    try {
      dbConnect.query(sql_updateUnit, [req.body.unit_name,req.body.unit_id], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: true,
            massage: "updateUnit success",
            results: results,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
}

exports.deleteUnit = (req, res) => {

}