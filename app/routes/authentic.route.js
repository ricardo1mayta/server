const authenticService = require("../services/authentic.service");
var schema = require("../schema/loginValidationSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");
const jwt = require("jsonwebtoken");

function init(router) {
    router.route("/login").post(authentic);
    //router.route("/signup").post(signup);
    router.route("/register").post(sigin);
    router.route("/productos/:page/:items").get(getAllProductos);
    router.route("/ventas").get(getAllVenta);
    router.route("/sede/:id").get(getsede);
    router.route("/detalleventa/:id").get(getdetalleventa);
    router.route("/respuestaSunat").post(addRespuestaSunat);
}

function authentic(req, res) {
    var authenticData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, authenticData, "authentic");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    authenticService.authentic(authenticData).then((data) => {
        if (data) {
            var email = data.email;
            const token = jwt.sign({
                email
            }, "la_llamada_de_tiempo_es_el_destino_de_seguir", {
                expiresIn: 60 * 60 * 24,
            });
            res.json({
                success: true,
                data: data,
                token: token,
            });
        }
    }).catch((err) => {
        //mail.mail(err);
        res.status(422).json(err);
    });
}

function signup(req, res) {
    var signUpData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, signUpData, "signUpData");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    authenticService.signup(signUpData).then((data) => {
        if (data) {
            res.json({
                success: true,
                data: data,
            });
        }
    }).catch((err) => {
        mail.mail(err);
        res.json(err);
    });
}

function sigin(req, res) {
    var signUpData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, signUpData, "registesr");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    authenticService.sigin(signUpData).then((data) => {
        if (data) {
            res.json({
                success: true,
                data: data,
            });
        }
    }).catch((err) => {
        mail.mail(err);
        res.json(err);
    });
}

function getAllProductos(req, res) {
    let ProductoId = req.params;
    authenticService.getAllProductos(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllVenta(req, res) {
    authenticService.getAllVenta().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getdetalleventa(req, res) {
    let ProductoId = req.params;
    authenticService.getdetalleventa(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getsede(req, res) {
    let ProductoId = req.params;
    authenticService.getsede(ProductoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addRespuestaSunat(req, res) {
    var VentaData = req.body;
    authenticService.addRespuestaSunat(VentaData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}
module.exports.init = init;