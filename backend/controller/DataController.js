const db = require('../config/db2');
const fs = require("fs");
const csvParser = require('csv-parser');

const uploadFile = async (req, res) => {
    try {
        if (req.file == undefined || req.file.mimetype !== 'text/csv') {
            return res.status(400).send("Please upload a CSV file!");
        }

        const results = [];
        let path = req.file.path;

        fs.createReadStream(path)
            .pipe(csvParser())
            .on('error', (error) => {
                res.status(500).send({
                    message: "Failed to read the file!",
                    error: error.message,
                });
            })
            .on('data', (data) => results.push(data))
            .on('end', () => {
                let query = 'INSERT INTO upload_data (state, pincode) VALUES ?';
                const values = results.map(result => [result.State, result.Pincode]);

                db.query(query, [values], (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: "Failed to import data into database!",
                            error: err.message,
                        });
                    } else {
                        return res.status(200).send({
                            message: "Uploaded the file successfully: " + req.file.originalname,
                        });
                    }
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

const getDataByDate = async (req, res) => {
    const { date } = req.params;
    console.log(date);
    try {
        const query = 'SELECT * FROM upload_data WHERE DATE(created_at) = ?';
        db.query(query, [date], (err, results) => {
            if (err) {
                return res.status(500).send({
                    message: "Failed to retrieve data from the database!",
                    error: err.message,
                });
            } else {
                return res.status(200).send({
                    message: "Retrieved data successfully!",
                    data: results,
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Could not retrieve data from the database!",
        });
    }
};


module.exports = {
    uploadFile,
    getDataByDate
};
