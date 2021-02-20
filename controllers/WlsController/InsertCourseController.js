const dbConnect = require("../../connectDB");
exports.InsertCourseCSV = (req, res) => {

    let sql = "";
    sql += `INSERT INTO wls_course(course_code,course_year,course_name,course_unitt,course_lactrue_unit,
            course_lab_unit,course_learning_unit,course_syllabus_id,course_create_by,
            course_create_date,course_update_by,course_update_date)`;
    sql += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    const xlsxFile = require('read-excel-file/node');
    var header = [];
    var course = [];
    var section = [];
    var section_detail = [];
    var section_person = [];


    try {
        xlsxFile('C:\\Users\\HIGH\\Desktop\\FormatInput.xlsx').then((rows) => {
            // console.log(rows);
            // console.table(rows);
            for (i in rows) {
                for (j in rows[i]) {
                    if (i == 0) {
                        header.push(rows[i][j])
                    } else if (rows[i][j] != null) {
                        if (j <= 7) {
                            course.push(rows[i][j])
                        } else if (j > 7 && j <= 9) {
                            section.push(rows[i][j])
                        } else if (j > 9 && j <= 14) {
                            section_detail.push(rows[i][j])
                        } else {
                            section_person.push(rows[i][j])
                        }
                    }
                }
            }
            dbConnect.query(sql, [
                course[0],
                course[1],
                course[2],
                course[3],
                course[4],
                course[5],
                course[6],
                course[7],
                1,
                new Date(),
                1,
                new Date()
            ], (err, results) => {
                if (err) {
                    res.json({
                        status: false,
                        message: "Insert Fail",
                        results: err,
                    });
                } else {
                    res.json({
                        status: true,
                        message: "Insert Success",
                        results: results
                    });

                }

            });
            console.log(section);
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            status: false,
            message: "Insert Fail",
            results: err,
        });
    }

}

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