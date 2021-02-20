const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllRequisitionOrder = (req, res) => {
    let sql_getAll_requisitionorder = '';
    sql_getAll_requisitionorder = 'select ';
    sql_getAll_requisitionorder = 'from mds_requisition_order rqto \n';
    sql_getAll_requisitionorder = 'left join pms_person ps on rqto.requisition_create_by = ps.person_id \n';

}

exports.getByIdRequisitionOrder = (req, res) => {
    let sql_getById_requisitionorder = '';
}

exports.insertRequisitionOrder = (req, res) => {
    let sql_insert_requisitionorder = '';
    let sql_get_last_insert_requisitionorder = '';
}

exports.updateRequisitionOrder = (req, res) => {
    let sql_update_requisitionorder = '';
}

exports.deleteRequisitionOrder = (req, res) => {
    let sql_delete_requisitionorder = '';
}