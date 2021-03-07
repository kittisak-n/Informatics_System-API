const express = require('express');
const bodyParser = require('body-parser');

const MpsRouters = require('./routes/MpsRouters/user');
const WlsRouters = require('./routes/WlsRouters/criteria');
const Wlscalculate = require('./routes/WlsRouters/Calculation');
const Wlssummary = require('./routes/WlsRouters/Summary');

var app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-access-token");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

app.use('/MpsRouters', MpsRouters);
app.use('/WlsTouters', WlsRouters);
app.use('/Wlscalculate', Wlscalculate);
app.use('/Wlssummary', Wlssummary);

app.listen(8080, console.log("API RUNNING PORT 8080"));