const VentaService = require("../services/venta.service");
var schema = require("../schema/ventaValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
    router.route("/venta").post(addVenta);
    router.route("/venta/:id").get(getVentaById).delete(deleteVenta).put(updateVenta);
    router.route("/notacredito/:sede/:us/:id").get(getNotaCreditoId);
    router.route("/guiaremision/:serie/:id").get(getGuiaRemision);
    router.route("/guiaremision/:id").put(updateGuia);
    router.route("/ventas/:id/:page/:items").get(getAllVentas);
    router.route("/detalleventa/:id").get(getDetalleVentaById);
    router.route("/detallenotacredito/:id").get(getDetalleNotaCreditoById);
    router.route("/respuestaSunat").post(addRespuestaSunat);
    router.route("/departamentos").get(getDepartamentos);
    router.route("/provincias/:id").get(getProvincias);
    router.route("/distritos/:id").get(getDistritos);
    router.route("/series").post(addSerie);
    router.route("/series/:id").get(getSeriesGuiaById);
    router.route("/resumenventas/:id/:ano/:mes").get(getAllVentSedeResumen);
}

function getAllVentas(req, res) {
    let VentaId = req.params;
    VentaService.getAllVenta(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllVentSedeResumen(req, res) {
    let VentaId = req.params;
    VentaService.getAllVentSedeResumen(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getVentaById(req, res) {
    let VentaId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, VentaId, "Venta");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    VentaService.getVentaById(VentaId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getNotaCreditoId(req, res) {
    let VentaId = req.params;
    VentaService.getNotaCreditoId(VentaId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getDepartamentos(req, res) {
    VentaService.getDepartamentos().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getProvincias(req, res) {
    let VentaId = req.params;
    VentaService.getProvincias(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getDistritos(req, res) {
    let VentaId = req.params;
    VentaService.getDistritos(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getDetalleVentaById(req, res) {
    let VentaId = req.params;
    VentaService.getDetalleVentaById(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getDetalleNotaCreditoById(req, res) {
    let VentaId = req.params;
    VentaService.getDetalleNotaCreditoById(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getSeriesGuiaById(req, res) {
    let VentaId = req.params;
    VentaService.getSeriesGuiaById(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addVenta(req, res) {
    var VentaData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, VentaData, "Venta");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    VentaService.addVenta(VentaData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function updateVenta(req, res) {
    var VentaData = req.body;
    var id = req.params.id;
    //Validating the input entity
    VentaService.updateVenta(id, VentaData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function addRespuestaSunat(req, res) {
    var VentaData = req.body;
    VentaService.addRespuestaSunat(VentaData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function updateGuia(req, res) {
    var VentaData = req.body;
    var id = req.params.id;
    VentaService.updateGuia(id, VentaData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getGuiaRemision(req, res) {
    let VentaId = req.params;
    VentaService.getGuiaRemision(VentaId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function deleteVenta(req, res) {
    var delId = req.params.id;
    VentaService.deleteVenta(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function addSerie(req, res) {
    var VentaData = req.body;
    VentaService.addSerie(VentaData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}
module.exports.init = init;