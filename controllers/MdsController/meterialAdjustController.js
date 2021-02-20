const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;



exports.getByIdMeterialAdjust = (req, res) => {
    let sql_getById_meterialadjust = '';
    sql_getById_meterialadjust = 'select mta.meterial_adjust_id, mta.purchase_order_meterial_id, mta.meterial_adjust_type, mta.meterial_balance, mta.meterial_adjust_amount, mta.meterial_adjust_balance, ps.person_firstname_TH  \n';
    sql_getById_meterialadjust = 'from mds_meterial_adjust mta \n';
    sql_getById_meterialadjust = 'left join pms_person ps on mta.meterial_adjust_create_by = ps.person_id \n'
    sql_getById_meterialadjust = 'where mta.meterial_id = ? and mta.purchase_order_meterial_id = ?'
}

exports.insertMeterialAdjust = (req, res) => {
    let sql_insert_meterialadjust = '';
    sql_insert_meterialadjust = 'insert into mds_meterial_adjust(meterial_id, purchase_order_meterial_id, meterial_adjust_type, meterial_balance, meterial_adjust_amount, meterial_adjust_balance, meterial_adjust_create_by, meterial_adjust_create_date, meterial_adjust_update_by, meterial_adjust_update_date) \n'
    sql_insert_meterialadjust = 'values(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) \n';
}

exports.deleteMeterialAdjust = (req, res) => {
    let sql_delete_meterialadjust = '';
    sql_delete_meterialadjust = 'delete from mds_meterial_adjust where meterial_id = ? and purchase_order_meterial_id = ?'
}