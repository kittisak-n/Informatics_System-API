const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllTpye = (req, res) => {
    let sql_getAll_type = "SELECT * FROM mds_type"
    try {
        dbConnect.query(sql_getAll_type, [], (err, results) => {
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

exports.getByIdTpye = (req, res) => {

}

exports.insertTpye = (req, res) => {
    let sql = '';
    sql += 'INSERT INTO mds_type(type_code,type_name,type_number) \n';
    sql += 'VALUES(?, ?, 1)';
    dbConnect.query(sql, [req.body.type_code, req.body.type_name], (err, results) => {
        if (err) {

        } else {
            res.json({
                results: results
            })
        }
    })
}

exports.updateTpye = (req, res) => {

}

exports.deleteTpye = (req, res) => {

}