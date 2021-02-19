const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllPositionAccess = (req, res) => {
    let sql_getAll_PositionAccess = '';
    sql_getAll_PositionAccess = 'select ppa.postion_access_id, ppa.postion_access_name_TH '
    sql_getAll_PositionAccess = 'from pms_postion_access ppa'

    try {
        dbConnect.query(sql_getAll_PositionAccess, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'insert PositionAccess fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get all PositionAccess success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'user PositionAccess fail',
            results: err
        });
    }
}

exports.getByIdPositionAccess = (req, res) => {
    let sql_getById_PositionAccess = '';
    sql_getById_PositionAccess = 'select ppa.postion_access_id, ppa.postion_access_name_TH '
    sql_getById_PositionAccess = 'from pms_postion_access ppa'
    sql_getById_PositionAccess = 'where ppa.postion_access_id = ?'

    try {
        dbConnect.query(sql_getById_PositionAccess, [req.body.postion_access_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'insert PositionAccess fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get all PositionAccess success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'user PositionAccess fail',
            results: err
        });
    }
}

exports.insertPositionAccess = (req, res) => {
    let sql_insert_PositionAccess = ''
    sql_insert_PositionAccess += 'insert into pms_postion_access(postion_access_name_TH, postion_access_name_EN, postion_access_create_by, postion_access_create_date, postion_access_update_by, postion_access_update_date) ';
    sql_insert_PositionAccess += 'values(?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())';

    let sql_get_last_id_sql_insert_PositionAccess = "select ppa.postion_access_id from pms_postion_access ppa order by ppa.postion_access_id DESC limit 1"

    try {
        dbConnect.query(sql_insert_PositionAccess, [req.body.postion_access_name_TH, req.body.postion_access_name_EN, req.body.postion_access_create_by, req.body.postion_access_update_by], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'insert PositionAccess fail',
                    results: err
                });
            } else {
                dbConnect.query(sql_get_last_id_sql_insert_PositionAccess, (err, results) => {
                    res.json({
                        status: true,
                        message: 'user PositionAccess success and return last insert id',
                        results: results
                    });
                })
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'user PositionAccess fail',
            results: err
        });
    }
}

exports.updatePositionAccess = (req, res) => {

    let sql_update_PositionAccess = '';
    sql_update_PositionAccess = 'update pms_postion_access';
    sql_update_PositionAccess = 'set postion_access_name_TH = ?, postion_access_name_EN = ?, postion_access_update_by = ?, postion_access_update_date = CURRENT_TIMESTAMP()'
    sql_update_PositionAccess = 'where postion_access_id = ?'

    try {
        dbConnect.query(sql_update_PositionAccess, [req.body.postion_access_name_TH, req.body.postion_access_name_EN, req.body.postion_access_update_by, req.body.postion_access_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'update PositionAccess fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'update PositionAccess success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'user PositionAccess fail',
            results: err
        });
    }
}

exports.deletePositionAccess = (req, res) => {

    let sql_delete_PositionAccess = '';
    sql_delete_PositionAccess = 'delete from pms_postion_access where postion_access_id = ?;'

    try {
        dbConnect.query(sql_delete_PositionAccess, [req.body.postion_access_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'update PositionAccess fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'delete PositionAccess success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'user PositionAccess fail',
            results: err
        });
    }
}