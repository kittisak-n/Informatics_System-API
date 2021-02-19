const dbConnect = require("../../connectDB");
exports.InsertCourseCSV = (req, res) => {

    try {
        const fs = require('fs');
        const raw = fs.readFileSync('C:\\Users\\HIGH\\Desktop\\Book1.csv', 'utf8');
        const data = raw.split(/\r?\n/);
        console.log('result', data);

        res.json({
            data
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: "Fail Add_criteria",
            results: err,
        });
    }
}