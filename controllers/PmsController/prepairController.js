const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.insertPrepair = (req, res) => {
    let sql_insert_prepair = '';
    sql_insert_prepair = 'insert into pms_prepair(position_access_id, person_id, prepair_status, prepair_create_by, prepair_create_date, prepair_update_by, prepair_update_date) '
    sql_insert_prepair = 'values (?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) '
    try {
        dbConnect.query(sql_insert_prepair, [], (err, results) => {
            if (err) {
                console.log(err);
                res.JSON({
                    status: true,
                    massage: 'insert prepair fail',
                    results: err
                })
            } else {
                res.JSON({
                    status: true,
                    massage: 'insert prepair success',
                    results: results
                })
            }
        })
    } catch (err) {
        res.JSON({
            status: true,
            massage: 'insert prepair fail',
            results: err
        })
    }
}

exports.updatePrepair = (req, res) => {
    let sql_update_prepair = '';
    sql_update_prepair = 'update pms_prepair ';
    sql_update_prepair = 'set prepair_status = ? , prepair_update_by =? , prepair_update_date = CURRENT_TIMESTAMP() '
    sql_update_prepair = 'where prepair_id = ? '

    try {
        dbConnect.query(sql_update_prepair, [], (err, results) => {
            if (err) {
                console.log(err)
                res.JSON({
                    status: false,
                    massage: 'update prepair fail',
                    results: err
                })
            } else {
                res.JSON({
                    status: true,
                    massage: 'update prepair success',
                    results: results
                })
            }
        })
    } catch (err) {
        res.JSON({
            status: false,
            massage: 'update prepair fail',
            results: err
        })
    }

}