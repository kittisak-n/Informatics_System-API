const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getRequisitionOrderByPersonId = (req, res) => {
    let sql = '';
    sql += 'SELECT (@row_number:=@row_number + 1) AS num, rqt.requisition_id, rqt.requisition_code, rqt.requisition_detail, rqt.requisition_total, rqt.requisition_status, rqt.requisition_create_date \n';
    sql += 'from mds_requisition_order rqt,\n';
    sql += '(SELECT @row_number:=0) AS t \n';
    sql += 'WHERE rqt.requisition_create_by = ' + req.body.requisition_create_by + ' AND rqt.requisition_status = ' + req.body.requisition_status + '\n'
    sql += 'AND rqt.requisition_code LIKE "%' + req.body.requisition_code + '%"'
    sql += 'ORDER BY rqt.requisition_create_date DESC'
    try {
        let data = {
            sql: sql,
            start: req.body.start,
            end: req.body.end
        }
        RequisitionOrderGet(data, function(result) {
            res.json({
                status: true,
                results: result
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            massage: error
        })
    }
}
exports.getRequisitionOrderAll = (req, res) => {
    let sql = '';
    sql += 'SELECT (@row_number:=@row_number + 1) AS num, rqt.requisition_id,rqt.requisition_code, ps.person_firstname_TH as name ,rqt.requisition_detail, rqt.requisition_total, rqt.requisition_status, rqt.requisition_create_date \n';
    sql += 'FROM mds_requisition_order rqt\n';
    sql += 'LEFT JOIN pms_person ps on ps.person_id = rqt.requisition_create_by, \n'
    sql += '(SELECT @row_number:=0) AS t \n';
    sql += 'WHERE rqt.requisition_status = ' + req.body.requisition_status + '\n'
    sql += 'AND rqt.requisition_code LIKE "%' + req.body.requisition_code + '%" \n';
    sql += 'ORDER BY rqt.requisition_create_date ASC'

    try {
        let data = {
            sql: sql,
            start: req.body.start,
            end: req.body.end
        }
        RequisitionOrderGet(data, function(result) {
            res.json({
                status: true,
                results: result
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            massage: error
        })
    }
}

exports.getRequisitionOrderAllByDate = (req, res) => {
    let sql = '';
    sql += 'SELECT (@row_number:=@row_number + 1) AS num, rqt.requisition_id,rqt.requisition_code, ps.person_firstname_TH as name ,rqt.requisition_detail, rqt.requisition_total, rqt.requisition_status, rqt.requisition_create_date \n';
    sql += 'FROM mds_requisition_order rqt\n';
    sql += 'LEFT JOIN pms_person ps on ps.person_id = rqt.requisition_create_by, \n'
    sql += '(SELECT @row_number:=0) AS t \n';
    sql += 'WHERE rqt.requisition_code LIKE "%' + req.body.requisition_code + '%" \n';
    sql += 'AND rqt.requisition_create_date BETWEEN "' + req.body.dateStart + '" AND "' + req.body.dateEnd + '" \n';
    sql += 'ORDER BY rqt.requisition_create_date ASC'
    try {
        let data = {
            sql: sql,
            start: req.body.start,
            end: req.body.end
        }
        RequisitionOrderGet(data, function(result) {
            res.json({
                status: true,
                results: result
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            massage: error
        })
    }
}

exports.getTotalRequisitionOrder = (req, res) => {
    let sql = '';
    sql += 'SELECT COUNT(rqt.requisition_id) as total, SUM(IF(rqt.requisition_status = ' + req.body.requisition_status_1 + ' , 1 ,0)) as await, SUM(IF(rqt.requisition_status = ' + req.body.requisition_status_2 + ' , 1 ,0)) as success \n';
    sql += 'FROM mds_requisition_order rqt\n';
    sql += 'LEFT JOIN pms_person ps on ps.person_id = rqt.requisition_create_by \n'
    sql += req.body.requisition_create_by ? 'WHERE rqt.requisition_create_by = ' + req.body.requisition_create_by + '\n' : ''
    try {
        dbConnect.query(sql, [], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    status: true,
                    results: results
                })
            }
        })
    } catch (error) {
        res.json({
            status: false,
            massage: error
        })
    }


}

exports.getPerpageRequisitionOrder = (req, res) => {
    let sql = '';
    sql += 'SELECT COUNT(num) as total\n';
    sql += 'FROM ('
    sql += 'SELECT (@row_number:=@row_number + 1) AS num \n';
    sql += 'FROM mds_requisition_order rqt\n';
    sql += 'LEFT JOIN pms_person ps on ps.person_id = rqt.requisition_create_by, \n'
    sql += '(SELECT @row_number:=0) AS t \n';
    sql += 'WHERE rqt.requisition_status = ' + req.body.requisition_status + '\n'
    sql += 'AND rqt.requisition_code LIKE "%' + req.body.requisition_code + '%" \n';
    sql += req.body.requisition_create_by ? 'AND rqt.requisition_create_by = ' + req.body.requisition_create_by + '\n' : '\n'
    sql += ') query_table \n'
    try {
        dbConnect.query(sql, [], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    status: true,
                    results: results
                })
            }
        })
    } catch (error) {
        res.json({
            status: false,
            massage: error
        })
    }


}

exports.getPerpageRequisitionOrderByDate = (req, res) => {
    let sql = '';
    sql += 'SELECT COUNT(num) as total\n';
    sql += 'FROM ('
    sql += 'SELECT (@row_number:=@row_number + 1) AS num \n';
    sql += 'FROM mds_requisition_order rqt\n';
    sql += 'LEFT JOIN pms_person ps on ps.person_id = rqt.requisition_create_by, \n'
    sql += '(SELECT @row_number:=0) AS t \n';
    sql += 'WHERE rqt.requisition_code LIKE "%' + req.body.requisition_code + '%" \n';
    sql += 'AND rqt.requisition_create_date BETWEEN "' + req.body.dateStart + '" AND "' + req.body.dateEnd + '" \n';
    sql += ') query_table \n'
    try {
        dbConnect.query(sql, [], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    status: true,
                    results: results
                })
            }
        })
    } catch (error) {
        res.json({
            status: false,
            massage: error
        })
    }
}

exports.insertRequisitionOrder = (req, res) => {
    try {
        RequisitionOrderinsert(req.body, function(results) {
            req.body.material_list.forEach(function(ele, index) {
                let data = {
                    requisition_id: results.insertId,
                    material_id: ele.material_id,
                    requisition_material_amount: ele.material_reveal,
                    requisition_material_note: ele.material_note,
                    requisition_material_create_by: req.body.requisition_create_by
                }
                RequisitionOrderMaterialinsert(data, function(result) {
                    if (index == req.body.material_list.length - 1 && result) {
                        console.log('insert success')
                        updateGencode('', function(result) {
                            res.json({
                                status: true,
                                massage: 'insert success',
                            })
                        })
                    } else if (result) {
                        console.log('insert success')
                    } else {
                        throw err;
                    }
                })
            });
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: true,
            massage: 'insert fail',
        })
    }

}

exports.updateRequisitionOrder = (req, res) => {
    try {
        RequisitionOrdercheckStatus(req.body, function(result) {
            if (result) {
                let data = {
                    requisition_status: req.body.requisition_status,
                    requisition_id: req.body.requisition_id,
                    requisition_update_by: req.body.requisition_material_create_by,
                }
                RequisitionOrderUpdate(data, function(result) {
                    if (result) {
                        console.log(req.body.requisition_status);
                        if (req.body.requisition_status === 3) {
                            req.body.disbursement_material.forEach(function(ele, index) {
                                let Material = {
                                    requisition_material_id: ele.requisition_material_id,
                                    purchase_order_material_id: 0,
                                    purchase_order_material_balance_amount: 0,
                                    material_id: ele.material_id,
                                    material_adjust_amount: ele.disbursement_export,
                                    update_by: req.body.requisition_material_create_by,
                                }
                                RequisitionOrderMaterialUpdate(Material, function(result) {
                                    if (result) {
                                        if (index == req.body.disbursement_material.length - 1) {
                                            res.json({
                                                status: true,
                                                massage: 'ทำรายการเบิกจ่ายสำเร็จ'
                                            })
                                        } else {
                                            console.log('success');
                                        }
                                    } else {
                                        throw new error();
                                    }
                                })
                            })
                        } else {
                            console.log(123)
                            res.json({
                                status: true,
                                massage: 'ทำรายการเบิกจ่ายสำเร็จ'
                            })
                        }
                    } else {
                        throw new error();
                    }
                })
            } else {
                console.log(1)
                res.json({
                    status: false,
                    massage: 'ไม่สามารถทำการอนุมัติรายการได้'
                })
            }
        })
    } catch (error) {
        res.json({
            status: false,
            massage: 'ไม่สามารถทำการอนุมัติรายการได้'
        })
    }
}

exports.deleteRequisitionOrder = (req, res) => {
    try {
        RequisitionOrdercheckStatus(req.body, function(result) {
            if (result) {
                let data = {
                    requisition_status: 0,
                    requisition_update_by: req.body.requisition_update_by,
                    requisition_id: req.body.requisition_id
                }
                RequisitionOrderUpdate(data, function(result) {
                    res.json({
                        status: true,
                        massage: 'ทำการลบรายการสำเร็จ'
                    })
                })
            } else {
                res.json({
                    status: false,
                    massage: 'ไม่สามารถทำการลบรายการได้'
                })
            }
        })
    } catch (error) {
        res.json({
            status: false,
            massage: 'ไม่สามารถทำการลบรายการได้'
        })
    }
}

const RequisitionOrderGet = (value, callback) => {
    let sql = '';
    sql += 'SELECT * \n';
    sql += 'FROM ( \n';
    sql += value.sql;
    sql += ') as qurey_table \n';
    sql += 'WHERE qurey_table.num BETWEEN ? AND ?'
    try {
        dbConnect.query(sql, [value.start, value.end], (err, results) => {
            if (err) {
                throw err;
            } else {
                callback(results);
            }
        })
    } catch (error) {
        console.log(error);
        callback(error);
    }
}

const RequisitionOrderinsert = (value, callback) => {
    let sql = '';
    sql += 'INSERT INTO mds_requisition_order (requisition_code, requisition_detail, requisition_total, requisition_status, requisition_create_by, requisition_create_date, requisition_update_by, requisition_update_date) \n '
    sql += 'VALUES((SELECT concat(code_name,LPAD(code_number,4,"0"),YEAR(CURDATE())) as code FROM mds_gencode WHERE code_id = 1), ?, ?, 1, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) \n';

    try {
        dbConnect.query(sql, [value.material_note, value.material_list.length, value.requisition_create_by, value.requisition_create_by], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                callback(results)
            }
        })
    } catch (error) {
        console.log(error)
        callback(error);
    }
}

const RequisitionOrderMaterialinsert = (value, callback) => {
    let sql = '';
    sql += 'INSERT INTO mds_requisition_order_material (requisition_id, material_id, requisition_material_amount, requisition_material_note, requisition_material_create_by, requisition_material_create_date, requisition_material_update_by, requisition_material_update_date) \n'
    sql += 'VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP());'

    try {
        dbConnect.query(sql, [value.requisition_id, value.material_id, value.requisition_material_amount, value.requisition_material_note, value.requisition_material_create_by, value.requisition_material_create_by], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            } else {

                callback(true)
            }
        })
    } catch (error) {
        callback(error);
    }
}

const updateGencode = (value, callback) => {
    let sql = '';
    sql += 'UPDATE mds_gencode \n';
    sql += 'SET code_number = code_number + 1 \n';
    sql += 'WHERE code_id = 1 \n';
    try {
        dbConnect.query(sql, [], (err, results) => {
            if (err) {
                console.log(err)
                throw err;
            } else {
                callback(true)
            }
        })
    } catch (error) {
        callback(error)
    }
}

const RequisitionOrderUpdate = (value, callback) => {
        let sql = '';
        sql += 'UPDATE mds_requisition_order \n';
        sql += 'SET requisition_status = ?, requisition_update_by = ?, requisition_update_date = CURRENT_TIMESTAMP() \n';
        sql += 'WHERE requisition_id = ?'
        try {
            dbConnect.query(sql, [value.requisition_status, value.requisition_update_by, value.requisition_id], (err, results) => {
                if (err) {
                    throw err
                } else {
                    callback(true)
                }
            })
        } catch (error) {
            console.log(error);
            callback(false);
        }
    }
    // so.1
const RequisitionOrderMaterialUpdate = (value, callback) => {
    let sql = '';
    sql += 'UPDATE mds_requisition_order_material \n';
    sql += 'SET requisition_material_export_amount = ?, requisition_material_note = ?, requisition_material_update_by = ?, requisition_material_update_date = CURRENT_TIMESTAMP() \n';
    sql += 'WHERE requisition_material_id = ? \n'
    try {
        dbConnect.query(sql, [value.material_adjust_amount, value.requisition_material_note, value.update_by, value.requisition_material_id], (err, result) => {
            if (err) {
                throw err;
            } else {
                MaterialUpdate(value, function(result) {
                    callback(result);
                })
            }
        })
    } catch (error) {
        console.log(error)
        callback(false)
    }
}

// so.2
const MaterialUpdate = (value, callback) => {
    let sql = '';
    sql += `update mds_material \n`;
    sql += `set material_export = material_export+(?),material_balance=material_balance+(?),material_update_by=?,material_update_date=CURRENT_TIMESTAMP() \n`;
    sql += `where material_id = ? \n`
    try {
        dbConnect.query(sql, [parseInt(value.material_adjust_amount), parseInt(value.material_adjust_amount) * -1, value.update_by, value.material_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                PurchaseOrderMaterialGetByMaterialId(value, function(result) {
                    if (result) {
                        callback(true)
                    } else {
                        callback(false)
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// so.3
const PurchaseOrderMaterialGetByMaterialId = (value, callback) => {
    let sql = '';
    sql += 'SELECT purchase_order_material_id, purchase_order_material_balance_amount \n';
    sql += 'FROM mds_purchase_order_material \n';
    sql += 'WHERE material_id = ? AND purchase_order_material_balance_amount != 0 \n';
    sql += 'ORDER BY purchase_order_material_create_date ASC \n';
    sql += 'LIMIT 1 \n';
    try {
        dbConnect.query(sql, [value.material_id], (err, results) => {
            if (err) {
                throw err;
            } else {
                console.log('so3')
                console.log(results);
                value.purchase_order_material_id = results[0].purchase_order_material_id;
                value.purchase_order_material_balance_amount = results[0].purchase_order_material_balance_amount;
                PurchaseOrderMaterialUpdate(value, function(result) {
                    if (result) {
                        callback(true)
                    } else {
                        callback(false)
                    }
                })
            }
        })
    } catch (error) {
        callback(false)
    }
}

// so.4
const PurchaseOrderMaterialUpdate = (value, callback) => {
    console.log('so 4')
    console.log(value);
    let sql = '';
    sql += 'update mds_purchase_order_material \n';
    sql += 'set purchase_order_material_export_amount = IF(purchase_order_material_export_amount+(?) > purchase_order_material_import_amount, purchase_order_material_import_amount, purchase_order_material_export_amount+(?)), \n'
    sql += 'purchase_order_material_balance_amount = IF(purchase_order_material_balance_amount+(?) < 0, 0, purchase_order_material_balance_amount+(?)), \n'
    sql += 'purchase_order_material_update_by = ?, purchase_order_material_update_date = CURRENT_TIMESTAMP() \n';
    sql += 'where purchase_order_material_id  = ? \n'
    try {
        dbConnect.query(sql, [parseInt(value.material_adjust_amount), parseInt(value.material_adjust_amount), parseInt(value.material_adjust_amount) * -1, parseInt(value.material_adjust_amount) * -1, value.update_by, value.purchase_order_material_id], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                if ((value.purchase_order_material_balance_amount - value.material_adjust_amount) < 0) {
                    value.material_adjust_amount = value.material_adjust_amount - value.purchase_order_material_balance_amount;
                    value.purchase_order_material_balance_amount = 0;
                    PurchaseOrderMaterialGetByMaterialId(value, function(result) {
                        if (result) {
                            AdjustInsert(value, function(result) {
                                if (result) {
                                    callback(true);
                                } else {
                                    throw new error();
                                }
                            })
                        } else {
                            callback(false)
                        }
                    })
                } else {
                    console.log('so4--------')
                    value.purchase_order_material_balance_amount = value.purchase_order_material_balance_amount - value.material_adjust_amount;
                    AdjustInsert(value, function(result) {
                        if (result.status && result.balance == 0) {
                            callback(true);
                        } else {
                            throw new error();
                        }
                    })

                }
            }
        })
    } catch (error) {
        callback(false)
    }
}

// so.5
const AdjustInsert = (value, callback) => {
    let sql = '';
    sql += `INSERT INTO mds_material_adjust (purchase_order_material_id, material_adjust_type, material_adjust_amount, material_adjust_balance, material_adjust_create_by, material_adjust_create_date, material_adjust_update_by, material_adjust_update_date) \n`
    sql += `VALUES (?, 3, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP());`

    try {
        dbConnect.query(sql, [value.purchase_order_material_id, value.material_adjust_amount, value.purchase_order_material_balance_amount, value.update_by, value.update_by], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                callback({
                    status: true,
                    balance: value.purchase_order_material_balance_amount - value.material_adjust_amount
                })

            }
        })
    } catch (error) {
        console.log(error)
    }
}


const RequisitionOrdercheckStatus = (value, callback) => {
    let sql = '';
    sql += 'SELECT requisition_status \n';
    sql += 'FROM mds_requisition_order \n';
    sql += 'WHERE requisition_id = ?';
    try {
        dbConnect.query(sql, [value.requisition_id], (err, results) => {
            if (err) {
                throw err
            } else {
                if (results[0].requisition_status === 1) {
                    callback(true);
                } else {
                    if (value.requisition_status === 4) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
        callback(false);
    }

}