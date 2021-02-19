const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.insertAccess = (req, res) => {
    let sql_insert_access = '';
    sql_insert_access = 'insert into pms_access(position_access_id, system_id, sub_system_id, access_status, access_create_by, access_create_date, access_update_by, access_update_date) ';
    sql_insert_access = 'values(?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) ';

    try {
        dbConnect.query(sql_insert_access, [req.position_access_id, req.system_id, req.sub_system_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'insert access fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'insert access fail',
                    results: err
                });
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: 'insert access fail',
            results: err
        });
    }
}

exports.updateAccess = (req, res) => {
    let sql_update_access = '';
    sql_update_access = 'update pms_access ';
    sql_update_access = 'set access_status = ?, access_update_by = ?, access_update_date = ? '
    sql_update_access = 'where access_id = ? and position_access_id = ?'

    try {
        dbConnect.query(sql_update_access, [req.body.access_status, req.body.access_update_by, req.body.access_id, req.body.position_access_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'update access fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'update access fail',
                    results: err
                });
            }
        })
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: 'insert access fail',
            results: err
        });
    }
}