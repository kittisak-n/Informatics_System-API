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
    console.log(req.body)
    let sql_insert_PositionAccess = ''
    sql_insert_PositionAccess += 'insert into pms_postion_access(postion_access_name_TH, postion_access_create_by, postion_access_create_date, postion_access_update_by, postion_access_update_date) \n';
    sql_insert_PositionAccess += 'values(?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())';

    let sql_insert_access = '';
    sql_insert_access += 'insert pms_access(position_access_id,system_id,sub_system_id,access_status,access_create_by,access_create_date,access_update_by,access_update_date) \n'
    sql_insert_access += 'values(?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())';

    try {
        dbConnect.query(sql_insert_PositionAccess, [req.body.positionAccess.name_positionaccess, req.body.positionAccess.create_by, req.body.positionAccess.create_by], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results.insertId);
                req.body.system.forEach(function (ele, index) {
                    if (index == (req.body.system.length - 1)) {
                        dbConnect.query(sql_insert_access, [results.insertId, ele.system_id, ele.sub_system_id, 1, req.body.positionAccess.create_by, req.body.positionAccess.create_by], (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({
                                    status: true,
                                })
                            }
                        })
                    } else {
                        dbConnect.query(sql_insert_access, [results.insertId, ele.system_id, ele.sub_system_id, 1, req.body.positionAccess.create_by, req.body.positionAccess.create_by], (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(results)
                            }
                        })
                    }
                });
            }
        });
    } catch (error) {
        console.log(error)
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