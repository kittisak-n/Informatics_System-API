const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;



exports.getAdjustByMaterialCode = (req, res) => {
    try {
        getAdjust(req.body, function(result) {
            res.json({
                status: true,
                results: result
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            results: error
        })
    }
}


exports.insertmaterialAdjust = (req, res) => {
    try {
        insertAdjust(req.body, function(result) {
            res.json({
                status: true,
                results: result.insertId
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            massage: error,
        })
    }
}

exports.deleteMaterialAdjust = (req, res) => {
    console.log(req.body)
    try {
        deleteAdjust(req.body, function(result) {
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

const getAdjust = (value, callback) => {
    let sql = '';
    sql += "SELECT mad.material_adjust_id as adjust_id, mad.material_adjust_create_date as adjust_date, mad.material_adjust_type as adjust_type, mad.material_adjust_amount as adjsut_amount, mad.material_adjust_balance as adjust_balance, ps.person_firstname_TH as adjust_create_dy, mad.material_adjust_note as adjust_note \n"
    sql += "FROM mds_material_adjust mad \n";
    sql += "LEFT JOIN mds_purchase_order_material pom on mad.purchase_order_material_id = pom.purchase_order_material_id \n"
    sql += "LEFT JOIN mds_material mt on mt.material_id = pom.material_id \n"
    sql += "LEFT JOIN pms_person ps on ps.person_id = mad.material_adjust_create_by \n"
    sql += "WHERE mt.material_code = ? and mad.purchase_order_material_id = ? \n";
    try {
        dbConnect.query(sql, [value.material_code, value.purchase_order_material_id], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                callback(results)
            }
        })
    } catch (error) {
        callback(error)
    }
}

const insertAdjust = (value, callback) => {
    let sql = '';
    sql += `INSERT INTO mds_material_adjust (purchase_order_material_id, material_adjust_type, material_adjust_amount, material_adjust_balance, material_adjust_note, material_adjust_create_by, material_adjust_create_date, material_adjust_update_by, material_adjust_update_date) \n`
    sql += `VALUES (?, 2, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP());`

    try {
        dbConnect.query(sql, [value.purchase_order_id, value.material_adjust_amount, value.material_adjust_balance, value.note, value.material_adjust_create_by, value.material_adjust_create_by], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                let data = {
                    purchase_order_id: value.purchase_order_id,
                    material_adjust_amount: value.material_adjust_amount,
                    material_adjust_update_by: value.material_adjust_create_by
                }
                updateMaterial(data, function(result) {
                    callback(results);
                })

            }
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteAdjust = (value, callback) => {
    console.log(value.material_adjust_id);
    let sql = '';
    sql = `DELETE FROM mds_material_adjust WHERE material_adjust_id = ?`;
    try {
        dbConnect.query(sql, [value.material_adjust_id], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                let data = {
                    purchase_order_id: value.purchase_order_id,
                    material_adjust_amount: value.material_adjust_amount * -1,
                    material_adjust_update_by: value.material_adjust_create_by
                }
                updateMaterial(data, function(resuls) {
                    callback(resuls)
                });
            }
        })
    } catch (error) {

    }
}

const updateMaterial = (value, callback) => {
    let sql = '';
    sql += `update mds_material \n`;
    sql += `set material_adjust = material_adjust+(?),material_balance=material_balance+(?),material_update_by=?,material_update_date=CURRENT_TIMESTAMP() \n`;
    sql += `where material_id = (select material_id from mds_purchase_order_material where purchase_order_material_id = ?) \n`
    try {
        dbConnect.query(sql, [parseInt(value.material_adjust_amount), parseInt(value.material_adjust_amount) * -1, value.material_adjust_update_by, value.purchase_order_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                updatePurchaseOrderMaterial(value, function(result) {
                    callback(result);
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const updatePurchaseOrderMaterial = (value, callback) => {
    let sql = '';
    sql += 'update mds_purchase_order_material \n';
    sql += 'set purchase_order_material_export_amount = purchase_order_material_export_amount+(?), purchase_order_material_balance_amount = purchase_order_material_balance_amount+(?), purchase_order_material_update_by = ?, purchase_order_material_update_date = CURRENT_TIMESTAMP() \n';
    sql += 'where purchase_order_material_id  = ? \n'

    try {
        dbConnect.query(sql, [parseInt(value.material_adjust_amount), parseInt(value.material_adjust_amount) * -1, value.material_adjust_update_by, value.purchase_order_id], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                callback(true)
            }
        })
    } catch (error) {
        callback(error)
    }
}