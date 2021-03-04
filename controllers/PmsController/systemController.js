const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.getSystem = (req, res) => {
    let sql_get_system = '';
    sql_get_system += 'SELECT system_id,system_name_TH \n';
    sql_get_system += 'FROM pms_system \n';

    try {
        dbConnect.query(sql_get_system, [], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    status: true,
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}
