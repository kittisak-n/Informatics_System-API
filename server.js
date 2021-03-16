const express = require('express');
const bodyParser = require('body-parser');

const personRouters = require('./routes/PmsRouters/person');
const materialRouters = require('./routes/MdsRouters/meterialRouters');
const purchaseOrderRouters = require('./routes/MdsRouters/purchaseOrderRouters');
const unitRouters = require('./routes/MdsRouters/unitRouters');
const typeRouters = require('./routes/MdsRouters/typeRouters')
const adjustRouters = require('./routes/MdsRouters/adjustRouters');
const RequisitionOrderRouters = require('./routes/MdsRouters/RequisitionOrderRouters');
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

app.use('/personRouters', personRouters);
app.use('/materialRouters', materialRouters);
app.use('/purchaseOrderRouters', purchaseOrderRouters)
app.use('/unitRouters', unitRouters);
app.use('/typeRouters', typeRouters);
app.use('/adjustRouters', adjustRouters);
app.use('/RequisitionOrderRouters', RequisitionOrderRouters);

app.listen(8080, console.log("API RUNNING PORT 8080"));