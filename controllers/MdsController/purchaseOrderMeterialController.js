const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllPurchaseOrderMeterial = (req, res) => {
    let sql_getAll_purchaseordermeterial = '';
    sql_getAll_purchaseordermeterial = 'select pcom.purchase_order_meterial_id, pco.purchase_order_code, mt.material_code, mt.material_name, mt.material_image, pcom.purchase_order_meterial_import_amount, pcom.purchase_order_meterial_export_amount, pcom.purchase_order_meterial_balance_amount \n';
    sql_getAll_purchaseordermeterial = 'from mds_purchase_order_meterial pcom \n';
    sql_getAll_purchaseordermeterial = 'left join mds_purchase_order pco on pcom.purchase_order_id = pco.purchase_order_id \n';
    sql_getAll_purchaseordermeterial = 'left join mds_material mt on pcom.material_id = mt.material_id \n';
}

exports.getByIdPurchaseOrderMeterial = (req, res) => {
    let sql_getAll_purchaseordermeterial = '';
    sql_getAll_purchaseordermeterial = 'select pcom.purchase_order_meterial_id, pco.purchase_order_code, mt.material_code, mt.material_name, mt.material_image, pcom.purchase_order_meterial_import_amount, pcom.purchase_order_meterial_export_amount, pcom.purchase_order_meterial_balance_amount \n';
    sql_getAll_purchaseordermeterial = 'from mds_purchase_order_meterial pcom \n';
    sql_getAll_purchaseordermeterial = 'left join mds_purchase_order pco on pcom.purchase_order_id = pco.purchase_order_id \n';
    sql_getAll_purchaseordermeterial = 'left join mds_material mt on pcom.material_id = mt.material_id \n';
    sql_getAll_purchaseordermeterial = 'where pcom.purchase_order_id = ? and pcom.meterial_id = ? \n'

}

exports.insertPurchaseOrderMeterial = (req, res) => {
    let insert_purchaseordermeterial = '';
    insert_purchaseordermeterial = 'insert into mds_purchase_order_meterial(purchase_order_id, meterial_id, purchase_order_meterial_import_amount, purchase_order_meterial_export_amount, purchase_order_meterial_balance_amount, purchase_order_meterial_create_by, purchase_order_meterial_create_date, purchase_order_meterial_update_by, purchase_order_meterial_update_date) \n';
    insert_purchaseordermeterial = 'values(?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) \n'

}

exports.updatePurchaseOrderMeterial = (req, res) => {
    let update_purchaseordermeterial = '';
    update_purchaseordermeterial = 'update mds_purchase_order_meterial \n';
    update_purchaseordermeterial = 'set purchase_order_meterial_import_amount = ?, purchase_order_meterial_export_amount = ?, purchase_order_meterial_balance_amount = ? \n';
    update_purchaseordermeterial = 'where purchase_order_meterial_id = ? \n';

}

exports.deletePurchaseOrderMeterial = (req, res) => {
    let delete_purchaseordermeterial = '';
    delete_purchaseordermeterial = 'delete from mds_purchase_order_meterial where purchase_order_meterial_id = ? \n';
}