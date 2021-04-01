var DocumentModel = require('../models/document.model');
var formidable = require("formidable");
var axios = require('axios');
var fs = require('fs');

exports.upload = (req, res) => {
    let form_fields = {};
    let documents = [];
    let CRMdocs = {};
    let upload_dir = __dirname + "/../../uploads/";
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files){
        form_fields = fields;
        if(files) {
            if (!fs.existsSync(upload_dir)){
                fs.mkdirSync(upload_dir);
            }
        }
    })
    form.on("fileBegin", function (name, file) {
        const currentTime = new Date().getTime();
        documents.push({
            name,
            fileName: file.name,
            path: currentTime + "." + file.name.split(".")[1],
            old_path: file.path
        });
    });

    form.on("file", function (name, file) {});
    
    form.on("end", async function () {
        documents.map((doc) => {
            var rawData = fs.readFileSync(doc.old_path)
            const contents = fs.readFileSync(doc.old_path, {encoding: 'base64'})
            fs.writeFile(upload_dir + doc.path, rawData, function(err) {
                if (err) console.log(err)
            })

            newDoc = new DocumentModel({
                type: doc.name,
                path: doc.path,
                date: new Date(),
                user_id: form_fields['userId'] ? form_fields['userId'] : ''
            });
            newDoc.save((err) => {
                if (err)
                    console.log(err)
            });

            CRMdocs[doc.name] = [{
                "file": contents,
                "name": doc.fileName
            }];

        });
        console.log("user_id: " + form_fields['userId'])
        let identify_api_data = {
                            "config": 1,
                            // "user": 10163,
                            "user": form_fields['userId'],
                            "status": "pending",
                            "idNumber": "123456",
                            "uploadedByClient": true,
                            "data": {
                                "date_of_expiry": "2020-02-01",
                                "document_number": "123456",
                                "type": form_fields['identify'],
                                "country_of_issue": form_fields['country'],
                                "file": CRMdocs["identify_front"],
                                "file_2": CRMdocs["identify_back"],
                            }
                        }

        let address_api_data = {
                                    "config": 2,
                                    "user": form_fields['userId'],
                                    // "user": 10163,
                                    "status": "pending",
                                    "idNumber": "123456",
                                    "uploadedByClient": true,
                                    "data": {
                                        "date_of_expiry": "2020-02-01",
                                        "document_number": "123456",
                                        "type": form_fields['address'],
                                        "country_of_issue": form_fields['country'],
                                        "file": CRMdocs["address_front"],
                                    }
                                }
        console.log(form_fields['address']);
        axios.post('https://my.everestcm.com/rest/documents/new?version=1.0.0',
            identify_api_data,
            { headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer MTUwNzlkNmQ5MTJmNGI2MWU2ZWRkOGJjMmQ1M2QwOGViZWY1NGRiYTg5YjNjODhiMTY4Nzc3OWVkNjBjOGEyMw',
            }})
        .then((response) => {
            axios.post('https://my.everestcm.com/rest/documents/new?version=1.0.0',
                address_api_data,
                { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer MTUwNzlkNmQ5MTJmNGI2MWU2ZWRkOGJjMmQ1M2QwOGViZWY1NGRiYTg5YjNjODhiMTY4Nzc3OWVkNjBjOGEyMw',
                    }})
                .then((address_response) => {
                    console.log("success to upload documents");
                    res.send({ success: true, message: "Documents are uploaded successfully!" })
                })
                .catch(
                    error => {
                        res.send({ success: false, message: "Failed to upload documents" })
                        console.log("Failed to upload address documents");
                    }
                );
        })
        .catch(
            error => {
                res.send({ success: false, message: "Failed to upload documents" })
                console.log("Failed to upload identify documents");
            }
        );
    });
}