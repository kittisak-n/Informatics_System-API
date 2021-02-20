const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;


exports.getAllCompany = (req, res) => {
    let sql_getAll_company = '';
    sql_getAll_company = 'select company_id, company_name, company_phone, company_fax, concat(company_address," ",pv.name_th," ",ap.name_th," ",dt.name_th," ",dt.zip_code) as address \n';
    sql_getAll_company = 'from mds_company cpn \n';
    sql_getAll_company = 'left join ifs_provice pv on pv.id = cpn.company_province \n';
    sql_getAll_company = 'left join ifs_amphures ap on ap.id = cpn.company_amphur \n';
    sql_getAll_company = 'left join ifs_districts dt on dt.id = cpn.company_district \n';
}

exports.getByIdCompany = (req, res) => {
    let sql_getById_company = '';
    sql_getById_company = 'select cpn.company_id, cpn.company_name, cpn.company_phone, cpn.company_fax, concat(company_address," ",pv.name_th," ",ap.name_th," ",dt.name_th," ",dt.zip_code) as address \n';
    sql_getById_company = 'from mds_company cpn \n';
    sql_getById_company = 'left join ifs_provice pv on pv.id = cpn.company_province \n';
    sql_getById_company = 'left join ifs_amphures ap on ap.id = cpn.company_amphur \n';
    sql_getById_company = 'left join ifs_districts dt on dt.id = cpn.company_district \n';
    sql_getById_company = 'where cpn.company_id = ? \n'
}

exports.insertCompany = (req, res) => {
    let sql_insert_company = '';
    sql_insert_company = 'insert into mds_company(company_name, company_phone, company_fax, company_address, company_province, company_amphur, company_district, company_create_by, company_create_date, company_update_by, company_update_date) \n';
    sql_insert_company = 'values(?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP()) \n'
}

exports.updateCompany = (req, res) => {
    let sql_update_company = '';
    sql_update_company = 'update mds_company \n';
    sql_update_company = 'set company_name = ?, company_phone = ?, company_fax = ?, company_address = ?, company_province = ?, company_amphur = ?, company_district = ?, company_update_by = ?, company_update_date = CURRENT_TIMESTAMP() \n';
    sql_update_company = 'where company_id = ? \n'
}

exports.deleteCompany = (req, res) => {
    let sql_delete_company = '';
    sql_delete_company = 'delete from mds_company where company_id = ?';
}