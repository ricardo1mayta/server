const userService = require("../services/user.service");
var schema = require("../schema/userValidationSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
    router.route("/user").post(addUser);
    router.route("/userparent/:id/").get(getUserByIdparent);
    router.route("/userparent2/:id/:page/:items").get(getUserByIdparent2);
    router.route("/user/:id").get(getUserById).delete(deleteUser).put(updateUser);
    router.route("/check").get(getCheck);
    router.route("/users/:id/:page/:items").get(getAllUsers);
    router.route("/menu/:id").get(getAllMenu);
    router.route("/subsedes/:id").get(getSubsedes);
}

function getCheck(req, res) {
    res.send({
        ok: "ok"
    });
}

function getAllUsers(req, res) {
    let userId = req.params;
    userService.getAllUser(userId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllMenu(req, res) {
    let userId = req.params;
    userService.getAllMenu(userId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getUserById(req, res) {
    let userId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, userId, "user");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    userService.getUserById(userId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getUserByIdparent(req, res) {
    let userId = req.params;
    userService.getUserByIdparent(userId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getUserByIdparent2(req, res) {
    let userId = req.params;
    userService.getUserByIdparent2(userId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addUser(req, res) {
    var userData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, userData, "user");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    userService.addUser(userData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function updateUser(req, res) {
    var userData = req.body;
    var id = req.params.id;
    userService.updateUser(id, userData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function deleteUser(req, res) {
    var delId = req.params.id;
    userService.deleteUser(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getSubsedes(req, res) {
    var delId = req.params.id;
    userService.getSubsedes(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}
module.exports.init = init;