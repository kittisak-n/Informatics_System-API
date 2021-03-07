const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.checkUser = (req, res) => {

    console.log(req.body);
    let username = req.body.params.username + "@buu.ac.th";
    let password = req.body.params.password;

    let ProfileUser;
    let System = [];

    let sql_CheckUser_admin = '';
    sql_CheckUser_admin += 'select PmsPS.person_id, PmsPS.person_firstname_TH as person_name' + "\n";
    sql_CheckUser_admin += 'from pms_person PmsPS' + "\n";
    sql_CheckUser_admin += 'left join pms_prefix pf on pf.pf_id = PmsPS.prefix_id \n';
    sql_CheckUser_admin += 'where PmsPS.person_username = ? and PmsPS.person_password = ? and PmsPS.person_status = 1 ' + "\n";

    let sql_CheckUser_user = '';
    sql_CheckUser_user += 'select PmsPS.person_id, CONCAT(pf.pf_name," ",PmsPS.person_firstname_TH," ",PmsPS.person_lastname_TH) as person_name \n';
    sql_CheckUser_user += 'from pms_person PmsPS \n';
    sql_CheckUser_user += 'left join pms_prefix pf on pf.pf_id = PmsPS.prefix_id \n';
    sql_CheckUser_user += 'where PmsPS.person_username = ? and PmsPS.person_status = 1';

    let sql_CheckPermission_System = '';
    sql_CheckPermission_System += 'select PmsST.system_key, PmsST.system_id as id, PmsST.icon as icon, PmsST.system_name_TH as Name, PmsST.system_path as Path ';
    sql_CheckPermission_System += 'from pms_person PmsPS ';
    sql_CheckPermission_System += 'left join pms_prepair PmsPP on PmsPP.person_id = PmsPS.person_id ';
    sql_CheckPermission_System += 'left join pms_access PmsAC on PmsAC.position_access_id = PmsPP.position_access_id ';
    sql_CheckPermission_System += 'left join pms_system PmsST on PmsST.system_id = PmsAC.system_id ';
    sql_CheckPermission_System += 'where PmsPS.person_username = ? and PmsST.system_status = 1 ';
    sql_CheckPermission_System += 'group by PmsAC.system_id';

    let sql_CheckPermission_SubSystem = '';
    sql_CheckPermission_SubSystem += 'select pmsSSt.sub_system_key, PmsSST.icon as icon, PmsSST.sub_system_name_TH as Name, PmsSST.sub_system_path as Path ';
    sql_CheckPermission_SubSystem += 'from pms_person PmsPS ';
    sql_CheckPermission_SubSystem += 'left join pms_prepair PmsPP on PmsPP.person_id = PmsPS.person_id ';
    sql_CheckPermission_SubSystem += 'left join pms_access PmsAC on PmsAC.position_access_id = PmsPP.position_access_id ';
    sql_CheckPermission_SubSystem += 'left join pms_sub_system PmsSST on PmsSST.sub_system_id = PmsAC.sub_system_id ';
    sql_CheckPermission_SubSystem += 'where PmsPS.person_username = ? and PmsSST.system_id = ? and PmsSST.sub_system_status = 1 ';
    sql_CheckPermission_SubSystem += 'group by PmsAC.sub_system_id ';


    try {
        console.log(username)
        console.log('start login')
        if (username == "adminIFs@buu.ac.th") {
            dbConnect.query(sql_CheckUser_admin, [username, password], (err, results) => {
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
                            System.forEach(function (system, index) {
                                console.log(index != System.length - 1)
                                if (index != System.length - 1) {
                                    dbConnect.query(sql_CheckPermission_SubSystem, [username, system.id], (err, results) => {
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
                                    dbConnect.query(sql_CheckPermission_SubSystem, [username, system.id], (err, results) => {
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
            ad.authenticate(username, password, function (err, auth) {
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
                    let sAMAccountName = req.body.params.username;
                    console.log(username);
                    console.log(sAMAccountName)
                    // Find user by a sAMAccountName
                    ad.findUser(sAMAccountName, function (err, user) {
                        if (err) {
                            console.log('ERROR: ' + JSON.stringify(err));
                            return;
                        }
                        if (!user) {
                            console.log('User: ' + sAMAccountName + ' not found.');
                        } else {
                            dbConnect.query(sql_CheckUser_user, [username], (err, results) => {
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
                                            console.log(11)
                                            console.log(System)
                                            System.forEach(function (system, index) {
                                                console.log(index != System.length - 1)
                                                if (index != System.length - 1) {
                                                    dbConnect.query(sql_CheckPermission_SubSystem, [username, system.id], (err, results) => {
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
                                                    dbConnect.query(sql_CheckPermission_SubSystem, [username, system.id], (err, results) => {
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
                        }
                    });
                } else {
                    console.log('Authentication failed!');
                }
            });
        }

    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: 'user registered fail',
            results: err
        });
    }
}

exports.searcLdaphPerson = (req, res) => {

    let username = req.body.username + "@buu.ac.th";
    let password = req.body.password;

    const config = {
        url: 'ldap://10.4.1.82',
        baseDN: 'ou=People,DC=BUU,DC=AC,DC=TH',
        username: username,
        password: password
    }
    let ad = new AD(config);
    ad.authenticate(username, password, function (err, auth) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
        }
        if (auth) {

            console.log('Authenticated!');

            console.log("=== Search User By sAMAccountName ========");
            // setup usernane to search 
            let sAMAccountName = req.body.username_search;

            // Find user by a sAMAccountName
            ad.findUser(sAMAccountName, function (err, results) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err));

                } else {
                    if (!results) {
                        console.log('User: ' + sAMAccountName + ' not found.');
                        res.json({
                            status: false,
                            results: results,
                            authen: true
                        })
                    } else {
                        console.log(results)
                        res.json({
                            status: true,
                            results: results,
                            authen: true
                        })
                    }
                }

            });
        } else {
            console.log('Authentication failed!');
            return res.json({
                status: false,
                authen: false
            })
        }
    });
}

exports.getAllPerson = (req, res) => {
    let sql_getAll_person = '';
    sql_getAll_person += 'select person_id,person_username,pf_name_abbr,person_firstname_TH,person_lastname_TH,person_firstname_EN,person_lastname_EN,person_address,person_province,person_amphur,person_district,postition_name,person_status \n';
    sql_getAll_person += 'from pms_person \n';
    sql_getAll_person += 'left join pms_postion on pms_postion.postion_id = pms_person.person_position\n';
    sql_getAll_person += 'left join pms_prefix on pms_prefix.pf_id = pms_person.prefix_id \n';
    // sql_getAll_person += 'where person_status = 1 \n';
    // sql_getAll_person += 'where person_id != 1';


    // let sql_getPosition_person = '';
    // sql_getPosition_person += 'select postition_name \n';
    // sql_getPosition_person += 'from pms_person \n';
    // sql_getPosition_person += 'where person_id != 1';

    //     SELECT postition_name FROM `pms_postion` 
    // LEFT JOIN pms_person ON pms_person.person_position = pms_postion.postion_id
    // WHERE pms_person.person_id = 2



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
    sql_getById_person += 'select person_id,person_username,pf_name_abbr,person_firstname_TH,person_lastname_TH,person_firstname_EN,person_lastname_EN,person_address,ifs_provinces.name_th as province,ifs_amphures.name_th as amphures,ifs_districts.name_th as districts,ifs_districts.zip_code as zipcode,postition_name,person_status \n';
    sql_getById_person += 'from pms_person \n';
    sql_getById_person += 'left join pms_postion on pms_postion.postion_id = pms_person.person_position\n';
    sql_getById_person += 'left join pms_prefix on pms_prefix.pf_id = pms_person.prefix_id \n';
    sql_getById_person += 'left join ifs_districts on ifs_districts.id = pms_person.person_district \n';
    sql_getById_person += 'left join ifs_amphures on ifs_amphures.id = pms_person.person_amphur \n';
    sql_getById_person += 'left join ifs_provinces on ifs_provinces.id = pms_person.person_province \n';
    sql_getById_person += 'where person_id = ? \n';

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

exports.getSystemByIdPerson = (req, res) => {
    let sql_getSystemById_person = '';
    sql_getSystemById_person += 'select pms_system.system_name_TH \n';
    sql_getSystemById_person += 'from pms_person \n';
    sql_getSystemById_person += 'left join pms_prepair on pms_prepair.person_id = pms_person.person_id\n';
    sql_getSystemById_person += 'left join pms_access on pms_access.position_access_id = pms_prepair.position_access_id\n';
    sql_getSystemById_person += 'left join pms_system on pms_system.system_id = pms_access.system_id\n';
    sql_getSystemById_person += 'where pms_person.person_id = ? \n';
    sql_getSystemById_person += 'group by pms_access.system_id \n';

    try {
        dbConnect.query(sql_getSystemById_person, [req.body.person_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getSystemById person fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getSystemById person success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getSystemById person fail',
            results: err
        });
    }
}

exports.insertPerson = (req, res) => {
    console.log(req.body)
    let sql_insert_person = '';
    sql_insert_person += 'insert into pms_person(person_username,prefix_id,person_firstname_TH,person_lastname_TH,person_firstname_EN,person_lastname_EN,person_address,person_province,person_amphur,person_district,person_position,person_status,person_create_by,person_create_date,person_update_by,person_update_date)';
    sql_insert_person += 'values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())'
    try {
        dbConnect.query(sql_insert_person, [req.body.username_search + '@buu.ac.th', req.body.prefix, req.body.nameThai, req.body.lastnameThai, req.body.nameEng, req.body.lastnameEng, req.body.address, req.body.province_id, req.body.amphure_id, req.body.district_id, req.body.position_id, 1, req.body.create_by, req.body.create_by], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                console.log(results)
                let person_id = results.insertId;
                req.body.position_access.forEach(function (ele, index) {
                    if (index == req.body.position_access.length - 1) {
                        let data = {
                            position_access_id: ele.position_access_id,
                            person_id: person_id,
                            create_by: req.body.create_by
                        }
                        insertPrepair(data, function (result) {
                            if (result) {
                                console.log(result)
                                res.json({
                                    status: result
                                })
                            }
                        })
                    } else {
                        let data = {
                            position_access_id: ele.position_access_id,
                            person_id: person_id,
                            create_by: req.body.create_by
                        }
                        insertPrepair(data, function (result) {
                            if (result) {
                                console.log(result)
                            }
                        })
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const insertPrepair = (value, callback) => {
    let sql_insert_prepair = '';
    sql_insert_prepair += 'INSERT INTO `pms_prepair` (`position_access_id`, `person_id`, `prepair_status`, `prepair_create_by`, `prepair_create_date`, `prepair_update_by`, `prepair_update_date`) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP());'
    try {
        dbConnect.query(sql_insert_prepair, [value.position_access_id, value.person_id, 1, value.create_by, value.create_by], (err, results) => {
            if (err) {
                console.log(err)
            } else {
                callback(true)
            }
        })
    } catch (error) {
        console.log(error)
    }


}

exports.updatePerson = (req, res) => {
    let sql_update_person = '';
    sql_update_person += 'update pms_person '
    sql_update_person += 'set prefix = ?, person_firstname_TH = ?, person_lastname_TH = ?, person_address = ?, person_province = ?, person_amphur = ?, person_district = ?, person_position = ?, person_status = ?, person_update_by = ? , person_update_date = CURRENT_TIMESTAMP() '
    sql_update_person += 'where person_id = ? ';

    try {
        dbConnect.query(sql_update_person, [req.body.prefix, req.body.prefix, req.body.person_firstname_EN, req.body.person_lastname_EN, req.body.person_address, req.body.person_province, req.body.person_amphur, req.body.person_district, req.body.person_position, req.body.person_status, req.body.person_update_by, req.body.person_id], (err, results) => {
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

exports.deletePrepair = (req, res) => {
    let sql_delete_Prepair = '';
    sql_delete_Prepair += 'delete from pms_prepair where person_id = ?';

    try {
        dbConnect.query(sql_delete_Prepair, [req.body.person_id], (err, results) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'delete Prepair fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'delete Prepair success',
                    results: results
                });
            }
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'delete Prepair fail',
            results: err
        });
    }
}

exports.deletePerson = (req, res) => {
    let sql_delete_person = '';
    sql_delete_person += 'delete from pms_person where person_id = ?';

    try {
        dbConnect.query(sql_delete_person, [req.body.person_id], (err, results) => {
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
                    results: results
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

exports.getPrefixTh = (req, res) => {
    let sql_getPrefix_person = '';
    sql_getPrefix_person += 'select pf_id, pf_name_abbr \n';
    sql_getPrefix_person += 'from pms_prefix \n';

    try {
        dbConnect.query(sql_getPrefix_person, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll prefix fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll prefix success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll refix fail',
            results: err
        });
    }
}

exports.getPrefixTh = (req, res) => {
    let sql_getPrefix_person = '';
    sql_getPrefix_person += 'select pf_id, pf_name_abbr \n';
    sql_getPrefix_person += 'from pms_prefix \n';

    try {
        dbConnect.query(sql_getPrefix_person, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll prefix fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll prefix success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll refix fail',
            results: err
        });
    }
}

exports.getAmphures = (req, res) => {
    console.log(req.body.amphures)
    let sql_getAmphures_person = '';
    sql_getAmphures_person += 'select id, name_th, province_id\n';
    sql_getAmphures_person += 'from ifs_amphures \n';
    sql_getAmphures_person += 'where province_id = ? \n';
    try {
        dbConnect.query(sql_getAmphures_person, [req.body.province_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll Amphures fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll Amphures success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll Amphures fail',
            results: err
        });
    }
}

exports.getDistricts = (req, res) => {
    let sql_getDistricts_person = '';
    sql_getDistricts_person += 'select id, zip_code, name_th,amphure_id\n';
    sql_getDistricts_person += 'from ifs_districts \n';
    sql_getDistricts_person += 'where amphure_id = ? \n ';

    try {
        dbConnect.query(sql_getDistricts_person, [req.body.amphure_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll Districts fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll Districts success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll Districts fail',
            results: err
        });
    }
}

exports.getProvinces = (req, res) => {
    let sql_getProvinces_person = '';
    sql_getProvinces_person += 'select id, name_th\n';
    sql_getProvinces_person += 'from ifs_provinces \n';

    try {
        dbConnect.query(sql_getProvinces_person, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll Provinces fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll Provinces success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll Provinces fail',
            results: err
        });
    }
}

exports.getPosition = (req, res) => {
    let sql_getPosition_person = '';
    sql_getPosition_person += 'select postion_id, postition_name\n';
    sql_getPosition_person += 'from pms_postion \n';

    try {
        dbConnect.query(sql_getPosition_person, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll Position fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll Position success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll Position fail',
            results: err
        });
    }
}

exports.getPostionAccess = (req, res) => {
    let sql_getPostionAccess = '';
    sql_getPostionAccess += 'select postion_access_id, postion_access_name_TH\n';
    sql_getPostionAccess += 'from pms_postion_access \n';

    try {
        dbConnect.query(sql_getPostionAccess, (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'getAll Postion access fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'getAll Postion access success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'getAll Postion_access fail',
            results: err
        });
    }
}

exports.getPervinceId = (req, res) => {
    let sql_getPervince_Id = '';
    sql_getPervince_Id += 'select id,name_th \n';
    sql_getPervince_Id += 'from ifs_provinces \n';
    sql_getPervince_Id += 'where id = ? \n ';

    // let sql_getPervince_person = '';
    // sql_getPervince_person += 'select ifs_provinces.id ,ifs_provinces.name_th \n';
    // sql_getPervince_person += 'from pms_person \n';
    // sql_getPervince_person += 'left join ifs_provinces on ifs_provinces.id = pms_person.person_province\n';
    // sql_getPervince_person += 'where pms_person.person_id = ? \n ';

    try {
        dbConnect.query(sql_getPervince_Id, [req.body.id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'get PervinceId fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get PervinceId success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'get PervinceId fail',
            results: err
        });
    }
}

exports.getAmphureId = (req, res) => {
    let sql_getAmphure_Id = '';
    sql_getAmphure_Id += 'select id,name_th \n';
    sql_getAmphure_Id += 'from ifs_amphures \n';
    sql_getAmphure_Id += 'where id = ? \n ';

    try {
        dbConnect.query(sql_getAmphure_Id, [req.body.id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'get AmphureId fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get AmphureId success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'get AmphureId fail',
            results: err
        });
    }
}

exports.getDistrictId = (req, res) => {
    let sql_getDistrict_Id = '';
    sql_getDistrict_Id += 'select id, zip_code, name_th \n';
    sql_getDistrict_Id += 'from ifs_districts \n';
    sql_getDistrict_Id += 'where id = ? \n ';

    try {
        dbConnect.query(sql_getDistrict_Id, [req.body.id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'get DistrictId fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get DistrictId success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'get DistrictId fail',
            results: err
        });
    }
}

exports.getPrefixId = (req, res) => {
    let sql_getPrefix_Id = '';
    sql_getPrefix_Id += 'select pf_id,pf_name, pf_name_abbr \n';
    sql_getPrefix_Id += 'from pms_prefix \n';
    sql_getPrefix_Id += 'where pf_id = ? \n ';

    try {
        dbConnect.query(sql_getPrefix_Id, [req.body.pf_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'get PrefixId fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get PrefixId success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'get PrefixId fail',
            results: err
        });
    }
}

exports.getPositionId = (req, res) => {
    let sql_getPosition_Id = '';
    sql_getPosition_Id += 'select postion_id, postition_name \n';
    sql_getPosition_Id += 'from pms_postion \n';
    sql_getPosition_Id += 'where postion_id = ? \n ';

    try {
        dbConnect.query(sql_getPosition_Id, [req.body.postion_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'get PositionId fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'get PositionId success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'get PositionId fail',
            results: err
        });
    }
}

exports.closePersonId = (req, res) => {
    let sql_closePerson_Id = '';
    sql_closePerson_Id += 'update pms_person \n';
    sql_closePerson_Id += 'set person_status = if(person_status = 1,0,1) \n';
    sql_closePerson_Id += 'where person_id = ? \n ';

    try {
        dbConnect.query(sql_closePerson_Id, [req.body.person_id], (err, results) => {
            if (err) {
                console.log(err);
                res.json({
                    status: false,
                    message: 'closePersonId fail',
                    results: err
                });
            } else {
                res.json({
                    status: true,
                    message: 'closePersonId success',
                    results: results
                });
            }
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'closePersonId fail',
            results: err
        });
    }
}