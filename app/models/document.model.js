var mysqlModel = require('custom-mysql-model');
var db = require('../config/db.config');

const connection = mysqlModel.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

var documents = connection.extend({
    tableName: "tbl_documents",
});
module.exports = documents;