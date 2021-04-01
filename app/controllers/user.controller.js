const crypto = require('crypto');
var axios = require('axios');
var UserModel = require('../models/user.model');

// Your Merchant Account ID
const LIVE_MERCHANT_ID = 'API-everestcapitalmarkets.com';
const TEST_MERCHANT_ID = 'API-everestcapitalmarkets.com TEST';
// Your Merchant Secret
const LIVE_MERCHANT_SECRET = 'yHVTUhmuv6qAjHZtBFlQHXB7SJBO4EuT';
const TEST_MERCHANT_SECRET = '8bmp5F5SjR4WVMJKsNG0GcnPP4aU8vXR';
// Your Application Key
const APPLICATION_KEY = "everestcapitalmarkets.com";
// Your API Version
const API_VERSION = "1.2";
const NOTIFICATION_URL = 'https://my.everestcm.com/payment/process/praxis_cashier_1.2?id=40&t=notification';
const RETURN_URL = 'https://my.everestcm.com/payment/processing';
const VALIDATION_URL = 'https://doc.praxiscashier.com/integration_docs/3.4/cashier_api/validation';
const REQUEST_IP = '188.43.136.32';

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.getUserData = (req, res) => {
    user = new UserModel();
    user.find('first', { where: "user_id = '" + req.body.userId + "'" }, function (err, row) {
        if (err) {
            return res.status(200).send({ status: "no user!" });
        }
        return res.status(200).send({ status: "success", data: row.data });
    });
};

exports.setUserData = (req, res) => {
    user = new UserModel({
        user_id: req.body.userId,
        data: req.body.data,
        created_at: new Date()
    });
    user.save(function (err){
        console.log(err)
    });
    return res.status(200).send({ status: "success" });
};

exports.getPraxisUrl = (req, res) => {
    user = new UserModel();
    user.find('first', { where: "user_id = '" + req.body.userId + "'" }, function (err, row) {
        if (err) {
            return res.status(200).send({ status: "no user!" });
        }
        console.log(JSON.parse(row.data).requestBody)
        let receive = GET_NOTIFICATION_DATA(req.body, JSON.parse(row.data).requestBody);
        axios.post('https://gateway.cashier-test.com/api/init-pay-in',
            receive, 
            { headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer MTUwNzlkNmQ5MTJmNGI2MWU2ZWRkOGJjMmQ1M2QwOGViZWY1NGRiYTg5YjNjODhiMTY4Nzc3OWVkNjBjOGEyMw',
                'Accept': 'application/json',
            }})
        .then(response => {
            console.log(response.data)
            if (response.data.status === 0)
                return res.status(200).send({ status: "success", url: response.data.redirect_url });
            else 
                return res.status(200).send({ status: "error" });
        })
        .catch(
            error => {
                res.status(400).json({message: "something went wrong"});
            }
        )
    });
};

function GET_NOTIFICATION_DATA(data, requestBody) {
    let request = {
        'address': requestBody.address,
        'city': requestBody.city,
        'country': requestBody.country,
        'currency': requestBody.currency,
        'dob': requestBody.birthDate.substr(0, 10),
        'email': requestBody.email,
        'first_name': requestBody.firstName,
        'last_name': requestBody.lastName,
        'locale': "en-GB",
        'notification_url': NOTIFICATION_URL,
        'payment_method': "PraxisCC1",
        'phone': requestBody.mobile,
        'pin': "" + Math.floor(Math.random() * Math.floor(10000)),
        'requester_ip': REQUEST_IP,
        'return_url': RETURN_URL,
        'validation_url': VALIDATION_URL,
        'zip': requestBody.zipCode,
        'merchant_id': data.method === 'Praxis TEST' ? TEST_MERCHANT_ID : LIVE_MERCHANT_ID,
        'version': API_VERSION,
        'application_key': APPLICATION_KEY,
        'timestamp': getCurrentTimestamp() - 10
    };

    request_string = getConcatenatedString(request);
    let secret = '';
    if (data.method === 'Praxis TEST')
        secret = TEST_MERCHANT_SECRET;
    else 
        secret = LIVE_MERCHANT_SECRET;
    request_string += secret;
    request['signature'] = generateSignature(request_string);
    request_json = exportArrayToJSON(request);

    return request_json;
}

function generateSignature(input) {
    let signature = crypto.createHash('sha384').update(input, 'utf-8').digest('hex');
    return signature;
}

function getConcatenatedString(data) {
    let keys = [],
        concatenated_string = '';

    for (let key in data) {
        keys.push(key);
    }
    keys.sort();

    for (let index=0; index<keys.length; index++) {
        if (data[keys[index]] === null || data[keys[index]] === false) {
            continue;
        } else if (data[keys[index]] === true) {
            concatenated_string = concatenated_string + '1';
        } else {
            concatenated_string = concatenated_string + data[keys[index]].toString();
        }
    }

    return concatenated_string;
}

function getConcatenatedString(data) {
    let keys = [],
        concatenated_string = '';

    for (let key in data) {
        keys.push(key);
    }
    keys.sort();

    for (let index=0; index<keys.length; index++) {
        if (data[keys[index]] === null || data[keys[index]] === false) {
            continue;
        } else if (data[keys[index]] === true) {
            concatenated_string = concatenated_string + '1';
        } else {
            concatenated_string = concatenated_string + data[keys[index]].toString();
        }
    }

    return concatenated_string;
}

function exportArrayToJSON(input) {
    let json_string = JSON.stringify(input);

    return json_string;
}

function getCurrentTimestamp() {
    let timestamp = Math.round( (new Date()).getTime() / 1000);
    return timestamp;
}