const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllPurchaseOrder = (req, res) => {
    let sql_getAll_purchaseorder = '';
    sql_getAll_purchaseorder = 'select pco.purchase_order_id, pco.purchase_order_code, cp.company_name ,pco.purchase_order_amount, pco.purchase_order_payment_amount, pco.purchase_order_vat_amount, pco.purchase_order_net_payment_amount, pco.purchase_order_status, pco.purchase_order_by, pco.purchase_order_date, pco.purchase_order_create_by, pco.purchase_order_create_date, pco.purchase_order_update_by, pco.purchase_order_update_date \n';
    sql_getAll_purchaseorder = 'from mds_purchase_order pco \n';
    sql_getAll_purchaseorder = 'left join mds_company cp on pco.company_id = cp.company_id \n';

}

exports.getByIdPurchaseOrder = (req, res) => {
    let sql_getById_purchaseorder = '';
    sql_getById_purchaseorder = 'select pco.purchase_order_id, pco.purchase_order_code, cp.company_name ,pco.purchase_order_amount, pco.purchase_order_payment_amount, pco.purchase_order_vat_amount, pco.purchase_order_net_payment_amount, pco.purchase_order_status, pco.purchase_order_by, pco.purchase_order_date, pco.purchase_order_create_by, pco.purchase_order_create_date, pco.purchase_order_update_by, pco.purchase_order_update_date \n';
    sql_getById_purchaseorder = 'from mds_purchase_order pco \n';
    sql_getById_purchaseorder = 'left join mds_company cp on pco.company_id = cp.company_id \n';
}

exports.insertPurchaseOrder = (req, res) => {
    let sql_insert_purchaseorder = '';
    sql_insert_purchaseorder = 'insert into mds_purchase_order(purchase_order_code, company_id, purchase_order_amount, purchase_order_payment_amount, purchase_order_vat_amount, purchase_order_net_payment_amount, purchase_order_status, purchase_order_by, purchase_order_date, purchase_order_create_by, purchase_order_create_date, purchase_order_update_by, purchase_order_update_date) \n';
    sql_insert_purchaseorder = 'values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMPSTAMP(), ?, CURRENT_TIMPSTAMP())'

    let sql_get_last_insert_purchaseorder = '';
    sql_get_last_insert_purchaseorder = 'select purchase_order_id \n';
    sql_get_last_insert_purchaseorder = 'from into mds_purchase_order \n';
    sql_get_last_insert_purchaseorder = 'order by purchase_order_id desc \n';
    sql_get_last_insert_purchaseorder = 'limit 1 \n';

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