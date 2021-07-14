const PedidoService = require("../services/pedidos.service");
var schema = require("../schema/pedidoValidacionSchema.json");
var iValidator = require("../../common/iValidator");
var errorCode = require("../../common/error-code");
var errorMessage = require("../../common/error-methods");
var mail = require("./../../common/mailer.js");

function init(router) {
    router.route("/pedido").post(addPedido);
    router.route("/pedido/:id").get(getPedidoById).delete(deletePedido);
    router.route("/pedidos/:id/:page/:items").get(getAllPedidos);
    router.route("/detallePedido/:id").get(getDetallePedidoById);
    router.route("/clientessede/:id").get(getClientessede);
    router.route("/pedidosproductossede/:id/:fini/:ffin").get(getPedidosProductoSede);
}

function getAllPedidos(req, res) {
    let PedidoId = req.params;
    PedidoService.getAllPedido(PedidoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getPedidoById(req, res) {
    let PedidoId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, PedidoId, "Pedido");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    PedidoService.getPedidoById(PedidoId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getClientessede(req, res) {
    let PedidoId = req.params;
    PedidoService.getClientessede(PedidoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function getPedidoById(req, res) {
    let PedidoId = req.params;
    var json_format = iValidator.json_schema(schema.getSchema, PedidoId, "Pedido");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    PedidoService.getPedidoById(PedidoId).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        res.send(err);
    });
}

function getDetallePedidoById(req, res) {
    let PedidoId = req.params;
    PedidoService.getDetallePedidoById(PedidoId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}

function addPedido(req, res) {
    var PedidoData = req.body;
    //Validating the input entity
    var json_format = iValidator.json_schema(schema.postSchema, PedidoData, "Pedido");
    if (json_format.valid == false) {
        return res.status(422).send(json_format.errorMessage);
    }
    PedidoService.addPedido(PedidoData).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function deletePedido(req, res) {
    var delId = req.params.id;
    PedidoService.deletePedido(delId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
}

function getPedidosProductoSede(req, res) {
    let CompraId = req.params;
    PedidoService.getPedidosProductoSede(CompraId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
}
module.exports.init = init;