const CotizacionesService = require("../services/cotizaciones.service");
var schema = require("../schema/cotizacionesValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
    router.route("/cotizacion").post(addCotizaciones);
    router.route("/cotizacion/:id").get(getCotizacionesById).delete(deleteCotizaciones);
    router.route("/cotizaciones/:id/:page/:items").get(getAllCotizacioness);
    router.route("/detallecotizaciones/:id").get(getDetalleCotizacionesById);
}

function getAllCotizacioness(req, res) {
    let CotizacionesId = req.params;
    CotizacionesService.getAllCotizaciones(CotizacionesId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getCotizacionesById(req, res) {
    let CotizacionesId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, CotizacionesId, "Cotizaciones");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    CotizacionesService.getCotizacionesById(CotizacionesId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getCotizacionesById(req, res) {
    let CotizacionesId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, CotizacionesId, "Cotizaciones");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    CotizacionesService.getCotizacionesById(CotizacionesId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getDetalleCotizacionesById(req, res) {
    let CotizacionesId = req.params;
    CotizacionesService.getDetalleCotizacionesById(CotizacionesId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addCotizaciones(req, res) {
    var CotizacionesData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, CotizacionesData, "Cotizaciones");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    CotizacionesService.addCotizaciones(CotizacionesData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function deleteCotizaciones(req, res) {
    var delId = req.params.id;
    CotizacionesService.deleteCotizaciones(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}
module.exports.init = init;