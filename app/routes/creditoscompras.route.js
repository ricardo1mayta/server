const PedidoService = require("../services/creditoscompras.service");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");

function init(router) {
    router.route("/creditoscompras/:id").get(getCreditosComprassede);
    router.route("/creditoscomprassede/:doc/:id").get(getAllComprasCreditoSede);
    router.route("/pagotodocredito").post(pagotodoCredito);
    router.route("/pagofraccioncredito").post(pagofraccionCredito);
    router.route("/pagoscomprasabonos/:id").get(getpagofaccionCredito);
}

function getCreditosComprassede(req, res) {
    let CompraId = req.params;
    PedidoService.getCreditosComprassede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getAllComprasCreditoSede(req, res) {
    let CompraId = req.params;
    PedidoService.getAllComprasCreditoSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function pagotodoCredito(req, res) {
    var PedidoData = req.body;
    PedidoService.pagotodoCredito(PedidoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function pagofraccionCredito(req, res) {
    var PedidoData = req.body;
    PedidoService.pagofraccionCredito(PedidoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getpagofaccionCredito(req, res) {
    let CompraId = req.params;
    PedidoService.getpagofaccionCredito(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}
module.exports.init = init;