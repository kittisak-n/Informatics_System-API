const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.get_sub_system = (err, req){
    let sql_get_sub_system = '';
    sql_get_sub_system += 'SELECT system_id,system_name_TH \n';
    sql_get_sub_system += 'FROM pms_system \n';

    try {
        dbConnect.query(sql_get_sub_system, [], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                results.json({
                    status: true,
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}