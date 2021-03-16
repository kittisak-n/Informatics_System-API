const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.getMaterialOption = (req, res) => {
    let sql_getMaterial_option = '';
    sql_getMaterial_option += 'SELECT mt.material_id, mt.material_name, mt_u.unit_name, mt.material_balance \n';
    sql_getMaterial_option += 'FROM mds_material mt \n';
    sql_getMaterial_option += 'left join mds_unit mt_u on mt_u.unit_id = mt.material_unit \n';
    try {
        dbConnect.query(sql_getMaterial_option, [], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: true,
                    massage: 'get option success',
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getMt = (err, res) => {
    let sql = '';
    sql += 'SELECT mt.material_code, mt.material_name, type.type_name, mt.material_import, mt.material_export, mt.material_adjust, mt.material_balance \n';
    sql += 'FROM mds_material mt \n';
    sql += 'left join mds_type type on type.type_id  = mt.material_type  \n';
    try {
        dbConnect.query(sql, [], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: true,
                    massage: 'get getMaterialTotal succes',
                    results: results
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getMaterialTotal = (req, res) => {
    let sql_getMaterial_Total = '';
    sql_getMaterial_Total += 'SELECT COUNT(material_id) AS total, SUM(IF(material_status = 1, 1, 0)) AS reveal, SUM(IF(material_status = 2 ,1 , 0)) AS unreveal, SUM(IF(material_balance = 0 ,1 , 0)) AS undepleted, SUM(IF(material_balance < material_minimun and material_balance != 0 ,1 , 0)) AS depleted \n';
    sql_getMaterial_Total += 'FROM mds_material';
    try {
        dbConnect.query(sql_getMaterial_Total, [], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: true,
                    massage: 'get getMaterialTotal succes',
                    results: results
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getRecordMaterial = (req, res) => {
    let sql_getRecord_material = '';
    sql_getRecord_material += 'select count((@row_number:=@row_number + 1)) as total_Row \n';
    sql_getRecord_material += 'from mds_material mt,(SELECT @row_number:=0) AS t \n';
    sql_getRecord_material += req.body.condition;
    try {
        dbConnect.query(sql_getRecord_material, [], (err, results) => {
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

exports.getMaterialByCondition = (req, res) => {
    let sql_ByCondition_material = '';
    sql_ByCondition_material += 'select * \n';
    sql_ByCondition_material += 'from ( \n'
    sql_ByCondition_material += 'select (@row_number:=@row_number + 1) AS num, mt.material_id, mt.material_code, mt.material_name, mt.material_image, mt_t.type_name, mt_u.unit_name, mt.material_minimun, mt.material_import, mt.material_export, mt.material_adjust, mt.material_balance, mt.material_status , IF(mt.material_status = 1, "เบิกได้","งดเบิก") as material_status_tag \n';
    sql_ByCondition_material += 'from mds_material mt\n';
    sql_ByCondition_material += 'left join mds_type mt_t on mt_t.type_id = mt.material_type \n';
    sql_ByCondition_material += 'left join mds_unit mt_u on mt_u.unit_id = mt.material_unit, \n';
    sql_ByCondition_material += '(SELECT @row_number:=0) AS t \n';
    sql_ByCondition_material += req.body.condition;
    sql_ByCondition_material += ') as qurey_table \n';
    sql_ByCondition_material += 'WHERE qurey_table.num BETWEEN ? AND ?'
    console.log(sql_ByCondition_material);
    try {
        dbConnect.query(sql_ByCondition_material, [req.body.start, req.body.end], (err, results) => {
            if (err) {
                console.log(err)
                res.json({
                    status: false,
                    massage: 'get by condition material fail',
                    results: err,
                })
            } else {
                res.json({
                    status: true,
                    massage: 'get by condition material succes',
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getByMaterialCode = (req, res) => {
    let sql_getByMaterialCode = ''
    sql_getByMaterialCode += 'select mt.material_id, mt.material_code, mt.material_name, mt.material_image, mt_t.type_name, mt_u.unit_name, mt.material_minimun, mt.material_balance, mt.material_status , IF(mt.material_status = 1, "เบิกได้","งดเบิก") as material_status_tag \n';
    sql_getByMaterialCode += 'from mds_material mt\n';
    sql_getByMaterialCode += 'left join mds_type mt_t on mt_t.type_id = mt.material_type \n';
    sql_getByMaterialCode += 'left join mds_unit mt_u on mt_u.unit_id = mt.material_unit \n';
    sql_getByMaterialCode += 'where mt.material_code = ? \n';
    try {
        dbConnect.query(sql_getByMaterialCode, [req.body.material_code], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: true,
                    massage: 'get by condition material succes',
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(err)
    }
}
exports.insertmaterial = (req, res) => {
    let sql_insert_material = '';
    sql_insert_material += 'insert into mds_material(material_code, material_name, material_image, material_type, material_unit, material_minimun, material_import, material_export, material_adjust, material_balance, material_status, material_create_by, material_create_date, material_update_by, material_update_date) \n';
    sql_insert_material += 'values( (select concat(type_code,LPAD(type_number,3,"0"),YEAR(CURDATE())) as code from mds_type where type_id = ' + req.body.material_type + '),?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP(),?,CURRENT_TIMESTAMP()) \n'

    let update_type_code = '';
    update_type_code += 'update mds_type \n';
    update_type_code += 'set type_number = type_number+1 \n';
    update_type_code += 'where type_id = ? \n'

    try {
        dbConnect.query(sql_insert_material, [req.body.material_name, req.body.material_image, req.body.material_type, req.body.material_unit, req.body.material_minimum, 0, 0, 0, 0, req.body.material_status, 1, 1], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                dbConnect.query(update_type_code, [req.body.material_type], (err, results) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({
                            status: true,
                            massage: 'insert success',
                            results: results
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
    }

}

exports.updatematerial = (req, res) => {
    let sql_update_metertial = '';
    sql_update_metertial += 'update mds_material \n';
    sql_update_metertial += 'set material_name = ?, material_image = ?, material_unit = ?, material_minimun = ?, material_status = ?, material_update_by = ?, material_update_date = CURRENT_TIMESTAMP() \n';
    sql_update_metertial += 'where material_id = ? \n';
    try {
        dbConnect.query(sql_update_metertial, [req.body.material_name, req.body.material_image, req.body.material_unit, req.body.material_minimum, req.body.material_status, 1, req.body.material_id], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: true,
                    massage: 'insert success',
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deletematerial = (req, res) => {
    let sql_delete_metertial = '';
    sql_delete_metertial = 'delete from material where material_id = ? \n';
}

exports.updateAmountmaterial = (req, res) => {
    let sql_updateAmount_metertial = '';
    sql_updateAmount_metertial = 'update metartial \n';
    sql_updateAmount_metertial = 'update material_import = ?, material_export = ?, material_adjust = ?, material_balance = ? ,material_update_by = ?, material_update_date = CURRENT_TIMESTAMP() \n'
}

exports.getMaterialgenChart = (req, res) => {
    console.log(req.body)
    let sql = '';
    sql = ` SELECT mt.material_name, SUM(rqom.requisition_material_amount) as amount,  SUM(rqom.requisition_material_export_amount) as export_amount
            FROM mds_material mt
            LEFT JOIN mds_requisition_order_material rqom on rqom.material_id = mt.material_id
            LEFT JOIN mds_requisition_order rq on rq.requisition_id = rqom.requisition_id
            WHERE rq.requisition_create_date BETWEEN ? AND ? 
            GROUP BY rqom.material_id
            LIMIT 10 `;
    try {
        dbConnect.query(sql, [req.body.dateStart, req.body.dateEnd], (err, results) => {
            if (err) {
                throw err;
            } else {
                res.json({
                    status: true,
                    massage: 'insert success',
                    results: results
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            massage: 'insert success',
            results: []
        })
    }
}