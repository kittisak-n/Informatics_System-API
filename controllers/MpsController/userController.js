const dbConnect = require('../../connectDB');
const AD = require('activedirectory2').promiseWrapper;

exports.LoginUser = (req, res) => {
    console.log('username :' + req.body.username)
    var username = req.body.username + "@buu.ac.th";
    var password = req.body.password;

    const config = {
        url: 'ldap://10.4.1.82',
        baseDN: 'ou=People,DC=BUU,DC=AC,DC=TH',
        username: username,
        password: password
    }
    var ad = new AD(config);
    try {
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
                var sAMAccountName = req.body.username;

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
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: 'user registered fail',
            results: err
        });
    }
}