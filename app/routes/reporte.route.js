const PedidoService = require("../services/reporte.service");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");

function init(router) {
    router.route("/pedidoreporte/:id").get(getPedidoSede);
    router.route("/pedidousuariosreporte/:id").get(getPedidoUsuarioSede);
    router.route("/pedidodiareporte/:id").get(getPedidoDiaSede);
    router.route("/pedidousuariosdiareporte/:id").get(getPedidoUsuarioDiaSede);
    router.route("/cierredecaja/:id/:fini").get(getCierredeCajaSede);
    router.route("/ganancia/:id/:fini/:ffin").get(gananciasSede);
}

function getPedidoSede(req, res) {
    let CompraId = req.params;
    PedidoService.getPedidoSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getPedidoUsuarioSede(req, res) {
    let CompraId = req.params;
    PedidoService.getPedidoUsuarioSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getPedidoDiaSede(req, res) {
    let CompraId = req.params;
    PedidoService.getPedidoDiaSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getPedidoUsuarioDiaSede(req, res) {
    let CompraId = req.params;
    PedidoService.getPedidoUsuarioDiaSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getCierredeCajaSede(req, res) {
    let CompraId = req.params;
    PedidoService.getCierredeCajaSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function gananciasSede(req, res) {
    let CompraId = req.params;
    PedidoService.gananciasSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}
module.exports.init = init;