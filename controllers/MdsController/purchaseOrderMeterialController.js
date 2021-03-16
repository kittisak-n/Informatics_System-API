const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getPurchaseOrdermaterialById = (req, res) => {
    try {
        PurchaseOrdermaterialByMaterialId(req.body, function(result) {
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

// exports.getByIdPurchaseOrdermaterial = (req, res) => {
//     let sql_getAll_purchaseordermaterial = '';
//     sql_getAll_purchaseordermaterial = 'select pcom.purchase_order_material_id, pco.purchase_order_code, mt.material_code, mt.material_name, mt.material_image, pcom.purchase_order_material_import_amount, pcom.purchase_order_material_export_amount, pcom.purchase_order_material_balance_amount \n';
//     sql_getAll_purchaseordermaterial = 'from mds_purchase_order_material pcom \n';
//     sql_getAll_purchaseordermaterial = 'left join mds_purchase_order pco on pcom.purchase_order_id = pco.purchase_order_id \n';
//     sql_getAll_purchaseordermaterial = 'left join mds_material mt on pcom.material_id = mt.material_id \n';
//     sql_getAll_purchaseordermaterial = 'where pcom.purchase_order_id = ? and pcom.material_id = ? \n'

// }

// exports.insertPurchaseOrdermaterial = (req, res) => {
//     let insert_purchaseordermaterial = '';
//     insert_purchaseordermaterial = 'insert into mds_purchase_order_material(purchase_order_id, material_id, purchase_order_material_import_amount, purchase_order_material_export_amount, purchase_order_material_balance_amount, purchase_order_material_create_by, purchase_order_material_create_date, purchase_order_material_update_by, purchase_order_material_update_date) \n';
//     insert_purchaseordermaterial = 'values(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) \n'

// }

// exports.updatePurchaseOrdermaterial = (req, res) => {
//     let update_purchaseordermaterial = '';
//     update_purchaseordermaterial = 'update mds_purchase_order_material \n';
//     update_purchaseordermaterial = 'set purchase_order_material_import_amount = ?, purchase_order_material_export_amount = ?, purchase_order_material_balance_amount = ? \n';
//     update_purchaseordermaterial = 'where purchase_order_material_id = ? \n';

// }

// exports.deletePurchaseOrdermaterial = (req, res) => {
//     let delete_purchaseordermaterial = '';
//     delete_purchaseordermaterial = 'delete from mds_purchase_order_material where purchase_order_material_id = ? \n';
// }

const PurchaseOrdermaterialByMaterialId = (value, callback) => {
    let sql = '';
    sql += 'select * \n';
    sql += 'from ( \n'
    sql += 'select (@row_number:=@row_number + 1) AS num,pcom.purchase_order_material_id, pco.purchase_order_code, pcom.purchase_order_material_import_amount, pcom.purchase_order_material_balance_amount, pcom.purchase_order_material_create_date\n';
    sql += 'from mds_purchase_order_material pcom \n';
    sql += 'left join mds_purchase_order pco on pcom.purchase_order_id = pco.purchase_order_id \n';
    sql += 'left join mds_material mt on mt.material_id = pcom.material_id,'
    sql += '(SELECT @row_number:=0) AS t \n';
    sql += 'where mt.material_code = ? \n'
    sql += ') as qurey_table \n';
    sql += 'WHERE qurey_table.num BETWEEN ? AND ?'
    try {
        dbConnect.query(sql, [value.material_code, value.start, value.end], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log(results)
                callback(results)
            }
        })
    } catch (error) {
        callback(error)
    }
}

exports.getByID = (req, res) => {
    let sql = ""
    sql += 'SELECT pcom.purchase_order_material_id,mt.material_code, mt.material_name, pcom.purchase_order_material_import_amount, unit.unit_name, pcom.purchase_order_material_price_total\n';
    sql += 'FROM mds_purchase_order_material pcom\n';
    sql += 'left join mds_material mt on mt.material_id = pcom.material_id \n'
    sql += 'left join mds_unit unit on unit.unit_id = mt.material_unit \n'
    sql += 'WHERE pcom.purchase_order_id = ? \n';
    try {
        dbConnect.query(sql, [req.body.purchase_order_id], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.json({
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