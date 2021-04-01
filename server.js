const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/document.routes')(app);
require('./app/routes/user.routes')(app);

// app.use(express.static(path.join(__dirname, './build')));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, './build/index.html'));
// });

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});