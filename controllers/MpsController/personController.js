const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.checkUser = (req, res) => {

    let username = req.body.username + "@buu.ac.th";
    let password = req.body.password;

    let ProfileUser;
    let System = [];

    let sql_CheckUser_admin = '';
    sql_CheckUser_admin += 'select PmsPS.person_id, PmsPS.person_firstname_TH as Person_name ';
    sql_CheckUser_admin += 'from pms_person PmsPS ';
    sql_CheckUser_admin += 'left join ifs_category_detail IfsCD on IfsCD.category_detail = PmsPS.prefix ';
    sql_CheckUser_admin += 'where PmsPS.person_username = ? and PmsPS.person_password = ? and PmsPS.person_status = 1';

    let sql_CheckUser_user = '';
    sql_CheckUser_user += 'select PmsPS.person_id, CONCAT(IfsCD.category_detail_name_TH,PmsPS.person_firstname_TH," ",PmsPS.person_lastname_TH) as Person_name ';
    sql_CheckUser_user += 'from pms_person PmsPS ';
    sql_CheckUser_user += 'left join ifs_category_detail IfsCD on IfsCD.category_detail = PmsPS.prefix ';
    sql_CheckUser_user += 'where PmsPS.person_username = ? and PmsPS.person_password = ? and PmsPS.person_status = 1';

    let sql_CheckPermission_System = '';
    sql_CheckPermission_System += 'select PmsST.system_id as id, PmsST.icon as icon, PmsST.system_name_TH as Name, PmsST.system_path as Path ';
    sql_CheckPermission_System += 'from pms_person PmsPS ';
    sql_CheckPermission_System += 'left join pms_prepair PmsPP on PmsPP.person_id = PmsPS.person_id ';
    sql_CheckPermission_System += 'left join pms_access PmsAC on PmsAC.position_access_id = PmsPP.position_access_id ';
    sql_CheckPermission_System += 'left join pms_system PmsST on PmsST.system_id = PmsAC.system_id ';
    sql_CheckPermission_System += 'where PmsPS.person_username = ? and PmsST.system_status = 1 ';
    sql_CheckPermission_System += 'group by PmsAC.system_id';

    let sql_CheckPermission_SubSystem = '';
    sql_CheckPermission_SubSystem += 'select PmsSST.icon as icon, PmsSST.sub_system_name_TH as Name, PmsSST.sub_system_path as Path ';
    sql_CheckPermission_SubSystem += 'from pms_person PmsPS ';
    sql_CheckPermission_SubSystem += 'left join pms_prepair PmsPP on PmsPP.person_id = PmsPS.person_id ';
    sql_CheckPermission_SubSystem += 'left join pms_access PmsAC on PmsAC.position_access_id = PmsPP.position_access_id ';
    sql_CheckPermission_SubSystem += 'left join pms_sub_system PmsSST on PmsSST.sub_system_id = PmsAC.sub_system_id ';
    sql_CheckPermission_SubSystem += 'where PmsPS.person_username = ? and PmsSST.sub_system_status = 1 ';
    sql_CheckPermission_SubSystem += 'group by PmsAC.sub_system_id ';


    try {

        console.log('start login')
        if (username == "adminIFs@buu.ac.th") {
            dbConnect.query(sql_CheckUser_admin, [username, req.body.password], (err, results) => {
                if (err) {
                    console.log(err)
                    res.json({
                        status: false,
                        message: 'user Admin login fail',
                        results: err
                    });
                } else {
                    ProfileUser = results[0];
                    dbConnect.query(sql_CheckPermission_System, [username], (err, results) => {
                        if (err) {
                            console.log(err)
                            res.json({
                                status: false,
                                message: 'user Admin login fail',
                                results: err
                            });
                        } else {
                            System = results;
                            System.forEach(function(system, index) {
                                console.log(index != System.length - 1)
                                if (index != System.length - 1) {
                                    dbConnect.query(sql_CheckPermission_SubSystem, [username], (err, results) => {
                                        if (err) {
                                            res.json({
                                                status: false,
                                                message: 'user Admin login fail',
                                                results: err
                                            });
                                        } else {
                                            System[index].subSystem = results;
                                            console.log(System[index])
                                        }
                                    })
                                } else {
                                    dbConnect.query(sql_CheckPermission_SubSystem, [username], (err, results) => {
                                        if (err) {
                                            res.json({
                                                status: false,
                                                message: 'user Admin login fail',
                                                results: err
                                            });
                                        } else {
                                            System[index].subSystem = results;
                                            res.json({
                                                status: true,
                                                message: 'user login success',
                                                ProfileUser: ProfileUser,
                                                System: System,
                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });
        } else {
            const config = {
                url: 'ldap://10.4.1.82',
                baseDN: 'ou=People,DC=BUU,DC=AC,DC=TH',
                username: username,
                password: password
            }
            let ad = new AD(config);
            ad.authenticate(username, password, function(err, auth) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err));
                    res.json({
                        status: false,
                        message: 'user registered fail',
                        results: err
                    });
                }
                if (auth) {
                    console.log('Authenticated!');

                    console.log("=== Search User By sAMAccountName ========");
                    // setup usernane to search 
                    let sAMAccountName = req.body.username;

                    // Find user by a sAMAccountName
                    ad.findUser(sAMAccountName, function(err, user) {
                        if (err) {
                            console.log('ERROR: ' + JSON.stringify(err));
                            return;
                        }
                        if (!user) {
                            console.log('User: ' + sAMAccountName + ' not found.');
                        } else {
                            console.log('User: ' + user)
                            console.log("displayName: ", user.displayName);
                            console.log("Firstname: ", user.givenName);
                            console.log("Lastname: ", user.sn);
                            console.log("Username: ", user.sAMAccountName);
                            console.log("Email: ", user.mail);
                            res.json({
                                status: false,
                                message: 'Login Success',
                                results: user
                            });
                        }
                    });
                } else {
                    console.log('Authentication failed!');
                }
            });
        }

    } catch (err) {
        console.log(123)
        console.log(err);
        res.json({
            status: false,
            message: 'user registered fail',
            results: err
        });
    }
}

exports.getAllPerosn = (req, res) => {
    let sql_getAll_person = '';
    sql_getAll_person = 'select person_id,person_username,person_password,prefix,person_firstname_TH,person_lastname_TH,person_firstname_EN,person_lastname_EN,person_address,person_province,person_amphur,person_district,person_position,person_status';
    sql_getAll_person = 'from pms_person';


    try {
        dbConnect.query(sql_getAll_person, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll person fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll person success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll person fail',
            results: err
        });
    }
}

exports.getByIdPerson = (req, res) => {
    let sql_getById_person = '';
    sql_getById_person = 'select person_id,person_username,person_password,prefix,person_firstname_TH,person_lastname_TH,person_firstname_EN,person_lastname_EN,person_address,person_province,person_amphur,person_district,person_position,person_status';
    sql_getById_person = 'from pms_person ';
    sql_getById_person = 'where person_id = ?'

    try {
        dbConnect.query(sql_getById_person, [req.body.person_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getById person fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getById person success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getById person fail',
            results: err
        });
    }
}

exports.insertPerson = (req, res) => {
    let sql_insert_person = '';
    sql_insert_person = 'insert into pms_person(person_username,person_password,prefix,person_firstname_TH,person_lastname_TH,person_firstname_EN,person_lastname_EN,person_address,person_province,person_amphur,person_district,person_position,person_status,person_create_by,person_create_date,person_update_by,person_update_date)';
    sql_insert_person = 'values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())'
    try {
        dbConnect.query(sql_insert_person, [req.body.person_username, req.body.person_password, req.body.prefix, req.body.prefix, req.body.person_firstname_TH, req.body.person_lastname_TH, req.body.person_firstname_EN, req.body.person_lastname_EN, req.body.person_address, req.body.person_province, req.body.person_amphur, req.body.person_district, req.body.person_position, req.body.person_status, req.body.person_create_by, req.body.person_update_by], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'insert PositionAccess fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get all PositionAccess success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'user PositionAccess fail',
            results: err
        });
    }
}

exports.updatePerson = (req, res) => {
    let sql_update_person = '';
    sql_update_person = 'update pms_person '
    sql_update_person = 'set prefix = ?, person_firstname_TH = ?, person_lastname_TH = ?, person_firstname_EN = ?, person_lastname_EN = ?, person_address = ?, person_province = ?, person_amphur = ?, person_district = ?, person_position = ?, person_status = ?, person_update_by = ? , person_update_date = CURRENT_TIMESTAMP() '
    sql_update_person = 'where person_id = ? ';

    try {
        dbConnect.query(sql_update_person, [req.body.prefix, req.body.prefix, req.body.person_firstname_TH, req.body.person_lastname_TH, req.body.person_firstname_EN, req.body.person_lastname_EN, req.body.person_address, req.body.person_province, req.body.person_amphur, req.body.person_district, req.body.person_position, req.body.person_status, req.body.person_update_by, req.body.person_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'update Person fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'update Person success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'update Person fail',
            results: err
        });
    }


}

exports.deletePerson = (req, res) => {
    let sql_delete_person = '';
    sql_delete_person = 'delete from pms_person where person_id = ?';

    try {
        dbConnect.query(sql_delete_person, [req.body.person_id], (err, result) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'delete Person fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'delete Person success',
                    results: result
                });
            }
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'delete Person fail',
            results: err
        });
    }
}