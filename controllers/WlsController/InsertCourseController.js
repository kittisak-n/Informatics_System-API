const dbConnect = require("../../connectDB");
exports.InsertCourseCSV = (req, res) => {

    let sql = "";
    sql += `INSERT INTO wls_course(course_code,course_name,course_time,course_lactrue_unit,
            course_lab_unit,course_learning_unit,course_syllabus_id,course_exam,course_create_by,
            course_create_date,course_update_by,course_update_date)`;
    sql += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    const xlsxFile = require('read-excel-file/node');

    xlsxFile('C:\\Users\\HIGH\\Desktop\\FormatInput.xlsx').then((rows) => {
        // console.log(rows);
        // console.table(rows);
        for (i in rows) {
            for (j in rows[i]) {
                // console.dir(rows[i][j]);
            }
        }
    })

    try {




        // dbConnect.query(sql, [
        //     data[0],
        //     data[0],
        //     1,
        //     1,
        //     1,
        //     1,
        //     1,
        //     1,
        //     1,
        //     new Date(),
        //     1,
        //     new Date()
        // ], (err, results) => {
        //     if (err) {
        //         res.json({
        //             status: false,
        //             message: "sql_add_criteria fail",
        //             results: err,
        //         });
        //     } else {

        //         res.json({
        //             status: true,
        //             message: "sql_add_criteria sucesses",
        //             results: results
        //         });

        //     }

        // });
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: "Fail Add_criteria",
            results: err,
        });
    }
}
// const fs = require('fs');
// const csv = require('csv-parser');
// let results = []
// fs.createReadStream('C:\\Users\\HIGH\\Desktop\\Book1.csv')
//     .pipe(csv({
//         headers: false
//     }))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         console.log(results);
//     });

    // const fs = require('fs');
    // const csv = require('neat-csv');
    // const raw = fs.readFileSync('C:\\Users\\HIGH\\Desktop\\Book1.csv', 'utf8');
    // const readCSV = async () => {
    //     const result = await csv(raw, { headers: false });
    //     console.log(result);
    // }
    // readCSV();

    // const fs = require('fs');
    // const raw = fs.readFileSync('C:\\Users\\HIGH\\Desktop\\Book1.csv', 'utf8');
    // const data = raw.split(/\r?\n/);
    // console.log('result', data);