const CompraService = require("../services/compras.service");
var schema = require("../schema/compraValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
    router.route("/compra").post(addCompra);
    router.route("/compra/:id").get(getCompraById).delete(deleteCompra);
    router.route("/compras/:id/:page/:items").get(getAllCompras);
    router.route("/detallecompra/:id").get(getDetalleCompraById);
    router.route("/provedoressede/:id").get(getProvedoresSede);
    router.route("/comprasproductosede/:id/:fini/:ffin").get(getComprasProductoSede);
}

function getAllCompras(req, res) {
    let CompraId = req.params;
    CompraService.getAllCompra(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getCompraById(req, res) {
    let CompraId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, CompraId, "Compra");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    CompraService.getCompraById(CompraId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getProvedoresSede(req, res) {
    let CompraId = req.params;
    CompraService.getProvedoresSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getCompraById(req, res) {
    let CompraId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, CompraId, "Compra");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    CompraService.getCompraById(CompraId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getDetalleCompraById(req, res) {
    let CompraId = req.params;
    CompraService.getDetalleCompraById(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addCompra(req, res) {
    var CompraData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, CompraData, "Compra");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    CompraService.addCompra(CompraData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function deleteCompra(req, res) {
    var delId = req.params.id;
    CompraService.deleteCompra(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getComprasProductoSede(req, res) {
    let CompraId = req.params;
    CompraService.getComprasProductoSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}
module.exports.init = init;