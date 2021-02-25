const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

//ฟังก็ชัน 
exports.insertAccess = (req, res) => {
    let sql_insert_access = '';
    sql_insert_access += 'insert into pms_access(position_access_id, system_id, sub_system_id, access_status, access_create_by, access_create_date, access_update_by, access_update_date)\n';
    sql_insert_access += 'values(?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) ';

    try {
        dbConnect.query(sql_insert_access, [req.body.position_access_id, req.body.system_id, req.sub_system_id,1,'666','666'], (err, results) => {
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
                    results: results
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
    sql_update_access += 'update pms_access \n';
    sql_update_access += 'set access_status = ?, access_update_by = ?, access_update_date = ? \n'
    sql_update_access += 'where access_id = ? and position_access_id = ?'

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
                    results: results
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