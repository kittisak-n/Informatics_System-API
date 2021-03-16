const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getPurchaseOrderTotal = (req, res) => {
    let sql_getPurchaseOrderTotal = '';
    sql_getPurchaseOrderTotal += 'SELECT COUNT(purchase_order_id) as total, SUM(IF(purchase_order_status = 1,1,0)) as depleted, SUM(IF(purchase_order_status = 0,1,0)) as undepleted \n';
    sql_getPurchaseOrderTotal += 'FROM mds_purchase_order \n'
    sql_getPurchaseOrderTotal += 'WHERE purchase_order_create_date BETWEEN ? AND ? \n'
    try {
        dbConnect.query(sql_getPurchaseOrderTotal, [req.body.date_Start, req.body.date_End], (err, results) => {
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
        console.log(error);
        res.json({
            status: true,
            results: results
        })
    }

}

exports.getRecordPurchaseOrder = (req, res) => {
    let sql_getRecord_PurchaseOrder = '';
    sql_getRecord_PurchaseOrder += 'select count((@row_number:=@row_number + 1)) as total_Row \n';
    sql_getRecord_PurchaseOrder += 'from mds_purchase_order pco,(SELECT @row_number:=0) AS t \n';
    sql_getRecord_PurchaseOrder += req.body.condition;
    try {
        dbConnect.query(sql_getRecord_PurchaseOrder, [], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    status: true,
                    massage: 'get record success',
                    results: results,
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getPurchaseOrderByCondition = (req, res) => {
    let sql_getฺByCondition_purchaseorder = '';
    sql_getฺByCondition_purchaseorder += 'select * \n';
    sql_getฺByCondition_purchaseorder += 'from ( \n'
    sql_getฺByCondition_purchaseorder += 'select (@row_number:=@row_number + 1) AS num, pco.purchase_order_id, pco.purchase_order_code, pco.purchase_order_company, pco.purchase_order_amount, pco.purchase_order_payment_amount, pco.purchase_order_vat_amount, pco.purchase_order_net_payment_amount, pco.purchase_order_status, ps.person_firstname_TH as purchase_order_creator, pco.purchase_order_create_date as date\n';
    sql_getฺByCondition_purchaseorder += 'from mds_purchase_order pco \n';
    sql_getฺByCondition_purchaseorder += 'left join pms_person ps on ps.person_id = pco.purchase_order_create_by , \n';
    sql_getฺByCondition_purchaseorder += '(SELECT @row_number:=0) AS t \n';
    sql_getฺByCondition_purchaseorder += req.body.condition;
    sql_getฺByCondition_purchaseorder += ') as qurey_table \n';
    sql_getฺByCondition_purchaseorder += 'WHERE qurey_table.num BETWEEN ? AND ?'
    try {
        dbConnect.query(sql_getฺByCondition_purchaseorder, [req.body.start, req.body.end], (err, results) => {
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

exports.getByIdPurchaseOrder = (req, res) => {
    let sql_getById_purchaseorder = '';
    sql_getById_purchaseorder = 'select pco.purchase_order_id, pco.purchase_order_code, cp.purchase_order_company ,pco.purchase_order_amount, pco.purchase_order_payment_amount, pco.purchase_order_vat_amount, pco.purchase_order_net_payment_amount, pco.purchase_order_status, pco.purchase_order_by, pco.purchase_order_date, pco.purchase_order_create_by, pco.purchase_order_create_date, pco.purchase_order_update_by, pco.purchase_order_update_date \n';
    sql_getById_purchaseorder = 'from mds_purchase_order pco \n';
    sql_getById_purchaseorder = 'left join mds_company cp on pco.company_id = cp.company_id \n';
}

exports.insertPurchaseOrder = (req, res) => {
    console.log(req.body.purchase_order_code)
    let sql_insert_purchaseorder = '';
    sql_insert_purchaseorder += 'INSERT INTO mds_purchase_order(purchase_order_code, purchase_order_company, purchase_order_amount, purchase_order_payment_amount, purchase_order_vat_amount, purchase_order_net_payment_amount, purchase_order_status, purchase_order_create_by, purchase_order_create_date, purchase_order_update_by, purchase_order_update_date) \n';
    sql_insert_purchaseorder += 'VALUES(?, ?, ?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())'

    let sql_insert_purchaseorder_detail = '';
    sql_insert_purchaseorder_detail += 'INSERT INTO mds_purchase_order_material( purchase_order_id, material_id, purchase_order_material_price, purchase_order_material_price_total, purchase_order_material_import_amount, purchase_order_material_export_amount, purchase_order_material_balance_amount, purchase_order_material_create_by, purchase_order_material_create_date, purchase_order_material_update_by, purchase_order_material_update_date)  \n';
    sql_insert_purchaseorder_detail += 'VALUES (?, ?, ?, ?, ?, 0, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP());'
    try {
        dbConnect.query(sql_insert_purchaseorder, [req.body.purchase_order_code, req.body.purchase_order_company, req.body.purchase_order_amount, req.body.purchase_order_payment_amount, req.body.purchase_order_vat_amount, parseFloat(req.body.purchase_order_vat_amount) + parseFloat(req.body.purchase_order_payment_amount), req.body.purchase_order_by, req.body.purchase_order_by], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                let purchase_order_id = results.insertId
                console.log(req.body.purchase_suppiles);
                req.body.purchase_suppiles.forEach(function(ele, index) {
                    if (index == req.body.purchase_suppiles.length - 1) {
                        dbConnect.query(sql_insert_purchaseorder_detail, [purchase_order_id, ele.order_material_id, ele.order_material_price_per_unit, parseFloat(ele.order_material_price_per_unit) * parseFloat(ele.order_material_amount), ele.order_material_amount, ele.order_material_amount, req.body.purchase_order_by, req.body.purchase_order_by], (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let data = {
                                    material_id: ele.order_material_id,
                                    purchase_order_id: results.insertId,
                                    material_amount: ele.order_material_amount,
                                    adjust_by: req.body.purchase_order_by,
                                }
                                insertMaterialAdjust(data, function(result) {
                                    if (result) {
                                        res.json({
                                            status: true
                                        })
                                    }
                                })


                            }
                        })
                    } else {
                        dbConnect.query(sql_insert_purchaseorder_detail, [purchase_order_id, ele.order_material_id, ele.order_material_price_per_unit, parseFloat(ele.order_material_price_per_unit) * parseFloat(ele.order_material_amount), ele.order_material_amount, ele.order_material_amount, req.body.purchase_order_by, req.body.purchase_order_by], (err, results) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let data = {
                                    material_id: ele.order_material_id,
                                    purchase_order_id: results.insertId,
                                    material_amount: ele.order_material_amount,
                                    adjust_by: req.body.purchase_order_by,
                                }
                                insertMaterialAdjust(data, function(result) {
                                    if (result) {
                                        console.log(result)
                                    }
                                })
                            }
                        })
                    }

                });

            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updatePurchaseOrder = (req, res) => {
    let sql_update_purchaseorder = '';
    sql_update_purchaseorder = 'update mds_purchase_order \n';
    sql_update_purchaseorder = 'set company_id = ?, purchase_order_amount = ?, purchase_order_payment_amount = ?, purchase_order_vat_amount = ?, purchase_order_net_payment_amount = ?, purchase_order_status = ?, purchase_order_by = ?, purchase_order_date, = ?, purchase_order_update_by = ?, purchase_order_update_date = CURRENT_TIMPSTAMP() \n';
    sql_update_purchaseorder = 'where purchase_order_id = ?'
}

exports.deletePurchaseOrder = (req, res) => {
    let sql_delete_purchaseorder = '';
    sql_delete_purchaseorder = 'delete from mds_purchase_order where purchase_order_id = ?'
}

const insertMaterialAdjust = (value, callback) => {
    console.log(value)
    let sql_insert_adjust = '';
    sql_insert_adjust += `INSERT INTO mds_material_adjust (purchase_order_material_id, material_adjust_type, material_adjust_amount, material_adjust_balance, material_adjust_create_by, material_adjust_create_date, material_adjust_update_by, material_adjust_update_date) \n`
    sql_insert_adjust += `VALUES (?, 1, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP());`

    try {
        dbConnect.query(sql_insert_adjust, [value.purchase_order_id, value.material_amount, value.material_amount, value.adjust_by, value.adjust_by], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                updateAmountMaterial(value, function(result) {
                    if (result) callback(true);
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const updateAmountMaterial = (value, callback) => {
    let sql_update_amount_material = '';
    sql_update_amount_material += `update mds_material \n`;
    sql_update_amount_material += `set material_import = material_import+?,material_balance=material_balance+?,material_update_by=?,material_update_date=CURRENT_TIMESTAMP() \n`;
    sql_update_amount_material += `where material_id=? \n`
    try {
        dbConnect.query(sql_update_amount_material, [parseInt(value.material_amount), parseInt(value.material_amount), value.adjust_by, value.material_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                callback(true)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.genChartByMonth = (req, res) => {
    let sql = '';
    sql = `SELECT 
            MONTH(CURDATE()) as month_1,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(CURDATE()),1,0)) as m1,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 1 MONTH)) as month_2,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 1 MONTH)),1,0)) as m2,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 2 MONTH)) as month_3,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 2 MONTH)),1,0)) as m3,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 3 MONTH)) as month_4,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 3 MONTH)),1,0)) as m4,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 4 MONTH)) as month_5,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 4 MONTH)),1,0)) as m5,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 5 MONTH)) as month_6,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 5 MONTH)),1,0)) as m6,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 6 MONTH)) as month_7,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 6 MONTH)),1,0)) as m7,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 7 MONTH)) as month_8,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 7 MONTH)),1,0)) as m8,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 8 MONTH)) as month_9,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 8 MONTH)),1,0)) as m9,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 9 MONTH)) as month_10,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 9 MONTH)),1,0)) as m10,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 10 MONTH)) as month_11,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 10 MONTH)),1,0)) as m11,
            MONTH(DATE_SUB(CURDATE(),INTERVAL 11 MONTH)) as month_12,
            SUM(IF(MONTH(purchase_order_create_date)=MONTH(DATE_SUB(CURDATE(),INTERVAL 11 MONTH)),1,0)) as m12
            FROM mds_purchase_order
            WHERE purchase_order_create_date BETWEEN DATE_ADD(DATE_SUB(CURDATE(), INTERVAL 1 YEAR),INTERVAL 1 MONTH) AND CURDATE()
            ORDER BY purchase_order_create_date DESC`;
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
            status: false
        })
    }
}