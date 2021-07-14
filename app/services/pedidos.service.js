var PedidoModel = require("../models/pedidos.model.js");
var PedidoService = {
    getAllPedido: getAllPedido,
    getPedidoById: getPedidoById,
    addPedido: addPedido,
    deletePedido: deletePedido,
    getDetallePedidoById: getDetallePedidoById,
    getClientessede: getClientessede,
    getPedidosProductoSede: getPedidosProductoSede
};

function addPedido(PedidoData) {
    return new Promise((resolve, reject) => {
        PedidoModel.addPedido(PedidoData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deletePedido(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.deletePedido(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getAllPedido(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getAllPedidosSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getPedidoById(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getPedidoById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getClientessede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getClientessede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getDetallePedidoById(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getDetallePedidoById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getPedidosProductoSede(id) {
    return new Promise((resolve, reject) => {
        PedidoModel.getPedidosProductoSede(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports = PedidoService;