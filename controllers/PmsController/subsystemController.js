const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.getSubSystem = (req, res) => {
    let sql_get_subsystem = '';
    sql_get_subsystem += 'SELECT sub_system_id,system_id,sub_system_name_TH \n';
    sql_get_subsystem += 'FROM pms_sub_system \n';

    try {
        dbConnect.query(sql_get_subsystem, [], (err, results) => {
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
