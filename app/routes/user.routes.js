const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/user/getPraxisUrl", controller.getPraxisUrl
    );
    app.get(
        "/api/user/getUserData", controller.getUserData
    );
    app.post(
        "/api/user/setUserData", controller.setUserData
    );
};