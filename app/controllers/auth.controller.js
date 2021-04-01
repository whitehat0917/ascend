var axios = require('axios');

exports.checkEmail = (req, res) => {
    const email  = req.body.email;
    axios.post('https://my.everestcm.com/rest/users?version=1.0.0',
        {"email" : email}, 
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MTUwNzlkNmQ5MTJmNGI2MWU2ZWRkOGJjMmQ1M2QwOGViZWY1NGRiYTg5YjNjODhiMTY4Nzc3OWVkNjBjOGEyMw',
        }})
    .then(response => {
        if (response.data.length == 0) {
            res.json({message: "valid"});
        }
        else {
            res.json({message: "invalid"});
        }
    })
    .catch(
        error => {
            console.log(error)
        }
    )
}

exports.register = (req, res) => {
    const body  = req.body;
    axios.post('https://my.everestcm.com/rest/users/new?version=1.0.0',
        body, 
        { headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MTUwNzlkNmQ5MTJmNGI2MWU2ZWRkOGJjMmQ1M2QwOGViZWY1NGRiYTg5YjNjODhiMTY4Nzc3OWVkNjBjOGEyMw',
            'Accept': 'application/json',
        }})
    .then(response => {
        res.json({message: "success", id: response.data.id});
    })
    .catch(
        error => {
            res.json({message: "Failed in register!"});
        }
    )
}
