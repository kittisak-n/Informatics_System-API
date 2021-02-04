const dbConnect = require('../../connectDB');

// เพิ่มกำหนดการณ์
exports.Add_criteria = (req, res) => {


    let query = "";


    try {
        console.log("criteria_name:" + req.body.criteria_name+"\n",
        "criteria_start_date:" + req.body.criteria_start_date+"\n",
        "criteria_creat_by:" +req.body.criteria_creat_by+"\n",
        "criteria_rate_per_credit:" + req.body.criteria_rate_per_credit+"\n",
        "nmp_minimum: " +req.body.nmp_minimum+"\n",
        "nmp_maximum: "+req.body.nmp_maximum+"\n",
        )
// วิชาใน

        console.log("========================== วิชาใน ========================== \n")
        console.log(req.body.criteria_Internal)
        console.log(" Lab \n")
        req.body.criteria_Internal.lab.condition.forEach(data => {
            console.log(data)

        });
        console.log(" lecture \n")
        req.body.criteria_Internal.lecture.condition.forEach(data => {
            console.log(data)

        });



// วิชานอก

console.log("========================== วิชานอก ========================== \n")
        console.log(req.body.criteria_external)
        console.log("Lab \n")
        req.body.criteria_external.lab.condition.forEach(data => {
            console.log(data)

        });
        console.log("lecture \n")
        req.body.criteria_external.lecture.condition.forEach(data => {
            console.log(data)

        });
      

        res.json({
            status: true,
            message: 'Add_criteria suscesses !!',
        
        });

    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: 'Fail Add_criteria',
            results: err
        });
    }

},


// 
exports.Get_criteria = (req, res) => {

let query = "";


    try{

        console.log("Get_criteria")

        res.json({
            status: true,
            message: 'Get_criteria suscesses !!',
        
        });

    }
    catch(err){
        console.log(err);
        res.json({
            status: false,
            message: 'Fail Get_criteria',
            results: err
        });
    }
    
}