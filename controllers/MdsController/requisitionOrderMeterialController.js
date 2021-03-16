const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllRequisitionOrdermaterial = (req, res) => {

}

exports.getByIdRequisitionOrdermaterial = (req, res) => {
    try {
        getRequisitionOrdermaterialById(req.body, function(result) {
            if (result) {
                res.json({
                    status: true,
                    results: result
                })
            } else {
                throw new error();
            }
        })
    } catch (error) {
        res.json()
    }
}

const getRequisitionOrdermaterialById = (value, callback) => {
    let sql = '';
    sql += `SELECT rqto.requisition_material_id, mt.material_id, mt.material_code, mt.material_name, mu.unit_name, mt.material_balance, rqto.requisition_material_amount, rqto.requisition_material_export_amount, rqto.requisition_material_note
            FROM mds_requisition_order_material rqto
            LEFT JOIN mds_material mt on mt.material_id = rqto.material_id
            LEFT JOIN mds_unit mu on mu.unit_id = mt.material_unit
            WHERE rqto.requisition_id = ?`;
    try {
        dbConnect.query(sql, [value.requisition_id], (err, results) => {
            if (err) {
                throw err;
            } else {
                callback(results)
            }
        })
    } catch (error) {
        console.log(error);
        callback(false);
    }
}