const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllMeterial = (req, res) => {
    let sql_getAll_meterial = '';
    sql_getAll_meterial = 'select mt.material_id, mt.material_code, mt.material_name, mt.meterail_image, mt_t.type_name, mt_u.unit_name, mt.material_minimun, mt.meterail_import, mt.meterail_export, mt.meterail_adjust, mt.meterail_balance, mt.meterail_status \n';
    sql_getAll_meterial = 'from meterial mt \n';
    sql_getAll_meterial = 'left join mds_type mt_t on mt_t.type_id = mt.material_type \n';
    sql_getAll_meterial = 'left join mds_unit mt_u on mt_u_unit_id = mt.meterail_unit \n';

}

exports.getByIdMeterial = (req, res) => {
    let sql_getById_meterial = '';
    sql_getById_meterial = 'select mt.material_id, mt.material_code, mt.material_name, mt.meterail_image, mt_t.type_name, mt_u.unit_name, mt.material_minimun, mt.meterail_import, mt.meterail_export, mt.meterail_adjust, mt.meterail_balance, mt.meterail_status \n';
    sql_getById_meterial = 'from meterial mt \n';
    sql_getById_meterial = 'left join mds_type mt_t on mt_t.type_id = mt.material_type \n';
    sql_getById_meterial = 'left join mds_unit mt_u on mt_u_unit_id = mt.meterail_unit \n';
    sql_getById_meterial = 'where mt.material_id = ? \n'

}

exports.insertMeterial = (req, res) => {
    let sql_insert_meterial = '';
    sql_insert_meterial = 'insert into meterial(material_code, material_name, meterail_image, material_type, meterail_unit, material_minimun, meterail_import, meterail_export, meterail_adjust, meterail_balance, meterail_status, material_create_by, material_create_date, material_update_by, material_update_date) \n';
    sql_insert_meterial = 'values(?,?,?,?,?,?,?,?,?,?,?,?,CUREENT_TIMESTAMP(),?,CUREENT_TIMESTAMP()) \n'

}

exports.updateMeterial = (req, res) => {
    let sql_update_metertial = '';
    sql_update_metertial = 'update meterial \n';
    sql_update_metertial = 'set material_name = ?, meterail_image = ?, material_type = ?, meterail_unit = ?, material_minimun = ?, meterail_status = ?, material_update_by = ?, material_update_date = CURRENT_TIMESTAMP() \n';
    sql_update_metertial = 'where material_id = ? \n';
}

exports.deleteMeterial = (req, res) => {
    let sql_delete_metertial = '';
    sql_delete_metertial = 'delete from meterial where meterial_id = ? \n';
}

exports.updateAmountMeterial = (req, res) => {
    let sql_updateAmount_metertial = '';
    sql_updateAmount_metertial = 'update metartial \n';
    sql_updateAmount_metertial = 'update meterail_import = ?, meterail_export = ?, meterail_adjust = ?, meterail_balance = ? ,material_update_by = ?, material_update_date = CURRENT_TIMESTAMP() \n'
}